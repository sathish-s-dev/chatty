import { useLayoutEffect, useState } from 'react';
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

export default function App() {
	const [authState, setAuthState] = useState(null);
	const [userId, setUserId] = useState(null);

	const getUser = async () => {
		const result = await AsyncStorage.getItem('user');
		const Id = await AsyncStorage.getItem('userId');

		let user = JSON.parse(result);
		alert(Id);
		setAuthState(user);
		setUserId(Id);
	};

	useLayoutEffect(() => {
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
							component={HomeScreen}
							options={{
								// header: () => <Header />,
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='chat'
							component={ChatScreen}
							options={{
								headerStyle: {
									backgroundColor: 'rgb(2,6,3)',
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
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</PaperProvider>
	);
}
