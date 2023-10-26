import { Foundation, Ionicons, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Input from '../components/Input';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase.config';
import { useNavigation } from '@react-navigation/core';


import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
	const navigation = useNavigation();

	const [user, setUser] = useState({
		email: '',
		password: '',
		cPassword: '',
	});

	const handleSignup = async () => {
		const { password, email, cPassword } = user;
		if (!email || !password || !cPassword) {
			alert('please enter all details');
		} else if (password !== cPassword) {
			alert('passwords must match');
		} else {
			try {
				const result = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				// console.log(result);
				navigation.navigate('profile-detail');
			} catch (error) {
				console.log(error);
			}
		}
	};

	const [secure, setSecure] = useState(true);
	const handlePasswordView = () => {
		setSecure(!secure);
	};

	return (
		<View className=' flex-1 bg-slate-900 h-full justify-center items-center px-4 space-y-5'>
			<Text className='text-2xl text-slate-100 font-bold tracking-widest pb-6'>
				Create a account
			</Text>

			<View className='border border-slate-600 rounded-lg w-full flex-row items-center pr-3'>
				<Input
					value={user.email}
					handleChange={(text) =>
						setUser({
							...user,
							email: text,
						})
					}
					placeholder='Email'
				/>
				<TouchableOpacity>
					<Foundation
						name='at-sign'
						size={28}
						color='rgb(71 85 105)'
					/>
				</TouchableOpacity>
			</View>
			<View className='border border-slate-600 rounded-lg w-full flex-row items-center pr-3'>
				<Input
					value={user.password}
					placeholder='Password'
					className={'text-lg'}
					secure={secure}
					handleChange={(text) =>
						setUser({
							...user,
							password: text,
						})
					}
				/>
				<TouchableOpacity onPress={handlePasswordView}>
					{secure ? (
						<Ionicons
							name='ios-eye'
							size={24}
							color='rgb(71 85 105)'
						/>
					) : (
						<Ionicons
							name='ios-eye-off'
							size={24}
							color='rgb(71 85 105)'
						/>
					)}
				</TouchableOpacity>
			</View>
			<View className='border border-slate-600 rounded-lg w-full flex-row items-center pr-3'>
				<Input
					value={user.cPassword}
					placeholder='Confirm Password'
					className={'text-lg'}
					secure={secure}
					handleChange={(text) =>
						setUser({
							...user,
							cPassword: text,
						})
					}
				/>
				<TouchableOpacity onPress={handlePasswordView}>
					{secure ? (
						<Ionicons
							name='ios-eye'
							size={24}
							color='rgb(71 85 105)'
						/>
					) : (
						<Ionicons
							name='ios-eye-off'
							size={24}
							color='rgb(71 85 105)'
						/>
					)}
				</TouchableOpacity>
			</View>
			<View className='w-full'>
				<TouchableOpacity
					onPress={handleSignup}
					className='bg-blue-400 mt-6 justify-center items-center p-3 w-full rounded-lg overflow-hidden'>
					<Text className='text-slate-200 font-extrabold text-lg'>Signup</Text>
				</TouchableOpacity>
				<View className='w-full border-b border-slate-600 my-5' />
				<TouchableOpacity
					onPress={() => navigation.navigate('login')}
					className='bg-blue-400  justify-center items-center p-3 w-full rounded-lg overflow-hidden'>
					<Text className='text-slate-200 font-extrabold text-lg'>Login</Text>
				</TouchableOpacity>
			</View>
			{/* <View className='border-b w-full border-slate-600' />
			<Text className='text-slate-100'>or</Text>
			<View className='flex-row space-x-3'>
				<TouchableOpacity className='flex-row items-center space-x-2 border border-slate-600 rounded-lg p-2'>
					<Ionicons
						name='logo-google'
						size={30}
						color='rgb(226 232 240)'
					/>
					
				</TouchableOpacity>
				<TouchableOpacity className='flex-row items-center space-x-2 border border-slate-600 rounded-lg p-2'>
					<Ionicons
						name='logo-github'
						size={30}
						color='rgb(226 232 240)'
					/>
					
				</TouchableOpacity>
				<TouchableOpacity className='flex-row items-center space-x-2 border border-slate-600 rounded-lg p-2'>
					<Ionicons
						name='logo-facebook'
						size={30}
						color='rgb(226 232 240)'
					/>
					
				</TouchableOpacity>
			</View> */}
		</View>
	);
};

export default SignupScreen;
