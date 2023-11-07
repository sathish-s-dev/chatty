import { Foundation, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Input from '../components/Input';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';

import { Button } from 'react-native-paper';

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
				const result = await auth().createUserWithEmailAndPassword(
					email,
					password
				);
				console.log(result);
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
			<View className='w-full space-y-5'>
				<Button
					textColor='rgb(241 245 249)'
					className='w-full rounded-lg bg-blue-600 text-slate-100 p-1'>
					Signup
				</Button>
				<Button
					mode='outlined'
					textColor='rgb(241 245 249)'
					style={{
						borderColor: 'rgb(71 85 105)',
					}}
					className='w-full rounded-lg border-blue-600 p-1'
					onPress={() => navigation.navigate('login')}>
					Login
				</Button>
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
