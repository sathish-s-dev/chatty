import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import useUser from '../hooks/useUser';
import { authContext } from '../lib/authContext';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
	const { authState, setAuthState } = useContext(authContext);
	// console.log('email', authState);
	useLayoutEffect(() => {
		if (auth().currentUser) {
			navigation.navigate('home');
		}
	}, []);
	return (
		<View className='flex-1 bg-slate-900 justify-center items-center px-4 space-y-5'>
			<View className='items-center'>
				<View className='bg-blue-400 justify-center items-center p-4 rounded-full mb-6'>
					<Ionicons
						name='ios-chatbox-ellipses-outline'
						size={50}
						color='rgb(203 213 225)'
					/>
				</View>
				<Text className='text-4xl text-slate-300'> Chatty</Text>
				<Text className='text-lg text-slate-300'>
					enjoy chatting with friends
				</Text>
			</View>
			<View className='w-full flex-row gap-10'>
				<View className='flex-grow'>
					<TouchableOpacity
						className='bg-blue-400 justify-center items-center p-3 rounded-lg overflow-hidden'
						onPress={() => navigation.navigate('signup')}>
						<Text className='text-slate-200 font-extrabold text-lg'>
							Signup
						</Text>
					</TouchableOpacity>
				</View>
				<View className='flex-grow'>
					<TouchableOpacity
						onPress={() => navigation.navigate('login')}
						className='bg-blue-400  justify-center items-center p-3 rounded-lg overflow-hidden'>
						<Text className='text-slate-200 font-extrabold text-lg'>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SplashScreen;
