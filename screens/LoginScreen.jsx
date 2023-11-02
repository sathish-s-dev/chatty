import { Foundation, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/core';
import { useContext, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Button, FAB, IconButton } from 'react-native-paper';
import Input from '../components/Input';
import { authContext } from '../lib/authContext';

// android   519735730047-bduu795a5i05h2er85kkm6i22c30r02e.apps.googleusercontent.com

const LoginScreen = () => {
	GoogleSignin.configure({
		webClientId:
			'957399145425-htb7cekdnef9qqpq4h0pfs26438rseqc.apps.googleusercontent.com',
	});

	const [initializing, setInitializing] = useState(true);
	const { setAuthState } = useContext(authContext);

	const navigation = useNavigation();
	const [view, setView] = useState(true);
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	async function onAuthStateChanged(user) {
		try {
			if (user) {
				setAuthState(user);
				AsyncStorage.setItem('user', JSON.stringify(user));
				const dbUser = await firestore()
					.collection('users')
					.where('email', '==', user.email)
					.get();
				if (dbUser.empty) {
					const result = await firestore().collection('users').add({
						email: user.email,
						name: user.displayName,
						photoURL: user.photoURL,
						rooms: [],
						friends: [],
						favouriteFriends: [],
					});
					// alert(result.id, 'user added');
					AsyncStorage.setItem('userId', result.id);
				} else {
					let Id = dbUser.docs[0].id;
					// alert(Id);
					AsyncStorage.setItem('userId', Id);
				}
			} else {
				setAuthState(null);
				AsyncStorage.removeItem('user');
				AsyncStorage.removeItem('userId');
				navigation.navigate('login');
			}
			if (initializing) setInitializing(false);
		} catch (error) {
			console.log(error);
		}
	}

	useLayoutEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	const handlePasswordView = () => {
		setView(!view);
	};

	// const handleLogin = async () => {
	// 	if (!user.email || !user.password) return;
	// 	try {
	// 		const result = await signInWithEmailAndPassword(
	// 			auth,
	// 			user.email,
	// 			user.password
	// 		);
	// 		// console.log(result);
	// 		AsyncStorage.setItem('user', JSON.stringify({ email: user.email }));
	// 		navigation.navigate('home');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	async function onGoogleButtonPress() {
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});
			const { idToken, user } = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);
			return auth().signInWithCredential(googleCredential);
		} catch (error) {
			console.log(error);
		}
	}

	const hanldeGoogleLogin = () =>
		onGoogleButtonPress().then(() => {
			navigation.navigate('home');
		});

	return (
		<View className=' flex-1 bg-slate-900 h-full justify-center items-center px-4 space-y-5'>
			<Text className='text-2xl text-slate-100 font-bold tracking-widest pb-6'>
				Login
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
					placeholder='Enter your email'
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
					placeholder='********'
					className={'text-lg'}
					secure={view}
					handleChange={(text) =>
						setUser({
							...user,
							password: text,
						})
					}
				/>
				<TouchableOpacity onPress={handlePasswordView}>
					{view ? (
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

			<Button
				textColor='rgb(241 245 249)'
				className='w-full rounded-lg bg-blue-600 text-slate-100 p-1'>
				Login
			</Button>
			<Button
				mode='outlined'
				textColor='rgb(241 245 249)'
				style={{
					borderColor: 'rgb(71 85 105)',
				}}
				className='w-full rounded-lg border-blue-600 p-1'
				onPress={() => navigation.navigate('signup')}>
				Signup
			</Button>
			<Text
				mode='outlined'
				textStyle={{ color: 'rgb(241 245 249)' }}
				className='bg-transparent text-slate-100'>
				or
			</Text>
			<View className='flex-row space-x-5 justify-center items-center'>
				{/* <FAB
					icon='google'
					onPress={hanldeGoogleLogin}
					className='bg-transparent border border-slate-600'
					color='#fff'
					size='small'
				/>
				<FAB
					icon='facebook'
					onPress={hanldeGoogleLogin}
					className='bg-transparent border border-slate-600'
					color='#fff'
					size='small'
				/> */}
				<IconButton
					onPress={hanldeGoogleLogin}
					mode='outlined'
					icon={'google'}
					iconColor='white'
					className=''
					size={28}
				/>
				<IconButton
					mode='outlined'
					icon={'github'}
					iconColor='white'
					className=''
					size={28}
				/>
				<IconButton
					mode='outlined'
					icon={'facebook'}
					iconColor='white'
					className=''
					size={28}
				/>
				{/* <FAB
					icon='github'
					color='#fff'
					onPress={hanldeGoogleLogin}
					className='bg-transparent border border-slate-600'
					size='small'
				/> */}
			</View>
		</View>
	);
};

export default LoginScreen;
