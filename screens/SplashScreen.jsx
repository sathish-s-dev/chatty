import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
// import useUser from '../hooks/useUser';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const SplashScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		if (auth()?.currentUser) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'home' }],
			});
		}
	}, []);
	return (
		<View className='flex-1 bg-slate-900 justify-center items-center px-4 space-y-5'>
			<View className='items-center flex-1 justify-end'>
				<View className='bg-blue-600 justify-center items-center p-4 rounded-full mb-6'>
					<Feather
						name='message-square'
						size={50}
						color='rgb(203 213 225)'
					/>
					{/* <Splash /> */}
				</View>
				<Text className='text-4xl text-slate-300'> Chatty</Text>
				<Text className='text-lg text-slate-300'>
					Enjoy chatting with friends
				</Text>
			</View>
			<View className='w-full flex-row space-x-6 justify-center items-center  flex-1'>
				<Button
					mode='contained-tonal'
					className='bg-blue-600 rounded-md p-1'
					textColor='white'
					onPress={() => navigation.navigate('signup')}>
					Signup
				</Button>
				<Button
					mode={'contained-tonal'}
					className='bg-blue-600 rounded-md p-1'
					textColor='white'
					onPress={() => {
						if (auth().currentUser) {
							navigation.navigate('home');
						}
						navigation.navigate('login');
					}}>
					Login
				</Button>
			</View>
		</View>
	);
};

export default SplashScreen;
