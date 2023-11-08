import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import 'expo-dev-client';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import * as LocalAuthentication from 'expo-local-authentication';
import { StatusBar } from 'expo-status-bar';
import { Provider } from './lib/authContext';
import { BackHandler } from 'react-native';
import StackNavigator from './navigators/StackNavigator';
import { useUserStore } from './store/useUserStore';

export default function App() {
	const [authState, setAuthState] = useState(null);
	const [userId, setUserId] = useState(null);
	const [auth, setAuth] = useState(null);
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);
	const setUser = useUserStore((state) => state.setUser);
	const setId = useUserStore((state) => state.setUserId);

	const getUser = async () => {
		const Id = await AsyncStorage.getItem('userId');
		const result = await firestore().collection('users').doc(Id).get();
		if (result.exists) {
			setUser(result.data());
			setAuthState(result.data());
		}
		setUserId(Id);
		setId(Id);
	};

	useEffect(() => {
		(async () => {
			const compatible = await LocalAuthentication.hasHardwareAsync();
			setIsBiometricSupported(compatible);
			let result = await LocalAuthentication.authenticateAsync({
				promptMessage: 'Login with biometric',
				fallbackLabel: 'close',
			});
			console.log(result);
			if (!result?.success) {
				// BackHandler.exitApp();
				// setAuth(false);
			}
			setAuth(true);
		})();
		getUser();
	}, []);

	return (
		<PaperProvider>
			<Provider
				value={{
					authState,
					setAuthState,
					userId,
					setUserId,
				}}>
				<NavigationContainer>
					<StackNavigator />
				</NavigationContainer>
				<StatusBar style='auto' />
			</Provider>
		</PaperProvider>
	);
}
