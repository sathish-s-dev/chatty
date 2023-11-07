import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'expo-dev-client';
import { PaperProvider } from 'react-native-paper';

import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import { Provider } from './lib/authContext';
import RoomDetailScreen from './screens/RoomDetailScreen';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import { BackHandler } from 'react-native';
import { TopTabNavigator } from './components/TopTabNavigator';
import Header from './components/Header';

export default function App() {
	const [authState, setAuthState] = useState(null);
	const [userId, setUserId] = useState(null);
	const [auth, setAuth] = useState(null);
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);

	const getUser = async () => {
		const result = await AsyncStorage.getItem('user');
		const Id = await AsyncStorage.getItem('userId');

		let user = JSON.parse(result);
		// alert(Id);
		setAuthState(user);
		setUserId(Id);
	};

	useEffect(() => {
		(async () => {
			const compatible = await LocalAuthentication.hasHardwareAsync();
			setIsBiometricSupported(compatible);
			// LocalAuthentication.supportedAuthenticationTypesAsync();

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

	const Stack = createNativeStackNavigator();

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
					<Stack.Navigator initialRouteName={'splash'}>
						<Stack.Screen
							name='home'
							component={TopTabNavigator}
							options={{
								header: () => <Header />,
							}}
						/>
						<Stack.Screen
							name='chat'
							component={ChatScreen}
							options={{
								headerStyle: {
									backgroundColor: 'rgb(2 6 23)',
								},
								headerTintColor: 'rgb(255,255,255)',
							}}
						/>

						<Stack.Screen
							name='splash'
							component={SplashScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='signup'
							component={SignupScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='login'
							component={LoginScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='profile-detail'
							component={ProfileDetailScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='room'
							component={RoomDetailScreen}
							options={{
								headerStyle: {
									backgroundColor: 'rgb(2 6 23)',
								},
								headerTintColor: 'rgb(255,255,255)',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar
					style='auto'
					// className='bg-transperant'
				/>
			</Provider>
		</PaperProvider>
	);
}
