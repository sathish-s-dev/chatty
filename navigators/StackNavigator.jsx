import { View, Text } from 'react-native';
import React from 'react';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import ChatScreen from '../screens/ChatScreen';
import { TopTabNavigator } from './TopTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import FriendScreen from '../screens/FriendScreen';

const StackNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
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
			<Stack.Screen
				name='friend'
				component={FriendScreen}
				options={{
					headerStyle: {backgroundColor: 'rgb(2 6 23)'},
					headerTintColor: 'rgb(255,255,255)',
				}}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigator;
