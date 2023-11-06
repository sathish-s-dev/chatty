import { Ionicons, Feather } from '@expo/vector-icons';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Image, Text, TouchableOpacity, View, BackHandler } from 'react-native';
// import useUser from '../hooks/useUser';
import { authContext } from '../lib/authContext';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../components/Splash';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

const SplashScreen = () => {
	const navigation = useNavigation();
	const { authState, setAuthState } = useContext(authContext);
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);

	console.log(isBiometricSupported);
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
				BackHandler.exitApp();
			}
		})();
		if (auth()?.currentUser) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'home' }],
			});
			setAuthState(auth().currentUser);
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
