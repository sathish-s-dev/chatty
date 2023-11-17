import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import 'expo-dev-client';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import {
	hasHardwareAsync,
	isEnrolledAsync,
	authenticateAsync,
} from 'expo-local-authentication';
import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler } from 'react-native';
import StackNavigator from './navigators/StackNavigator';
import { useUserStore } from './store/useUserStore';
import useNotification, {
	schedulePushNotification,
} from './hooks/useNotification';

export default function App() {
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);
	const setUser = useUserStore((state) => state.setUser);
	const setId = useUserStore((state) => state.setUserId);
	const userId = useUserStore((state) => state.userId);

	const getUser = async () => {
		try {
			const Id = await AsyncStorage.getItem('userId');
			const result = await firestore().collection('users').doc(Id).get();
			if (result.exists) {
				setUser(result.data());
			}
			setId(Id);
			console.log(Id, result.exists);
		} catch (error) {
			console.log(error.message);
		}
	};

	useNotification();

	useEffect(() => {
		(async () => {
			const compatible = await hasHardwareAsync();
			setIsBiometricSupported(compatible);
			if (!compatible) {
				Alert.alert('no biometric supported');
				return;
			}
			const enrolled = await isEnrolledAsync();
			if (!enrolled) {
				Alert.alert(
					`This device doesn't have biometric authentication enabled`
				);
				return;
			}
			let result = await authenticateAsync({
				promptMessage: 'Login with biometric',
				requireConfirmation: true,
			});
			console.log(result);
			if (result?.warning) {
				BackHandler.exitApp();
				// setAuth(false);
			}
			await schedulePushNotification('chatty', 'welcome back');
		})();
		getUser();
	}, [userId]);

	return (
		<PaperProvider>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
			<StatusBar style='auto' />
		</PaperProvider>
	);
}
