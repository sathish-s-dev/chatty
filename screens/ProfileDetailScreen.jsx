import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Input from '../components/Input';
import { Foundation, Ionicons, AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { auth, db } from '../firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetailScreen = () => {
	const navigation = useNavigation();

	const [user, setUser] = useState({
		name: '',
		dob: '',
		email: auth.currentUser.email || null,
	});
	const [born, setBorn] = useState({
		date: new Date(),
		show: false,
	});

	const dateFormatter = (date) => {
		return date.toISOString().split('T')[0].split('-').reverse().join('-');
	};

	useEffect(() => {
		console.log(user);
	}, [user]);

	const handleSignup = async () => {
		const { name } = user;
		if (!name || !born.date) {
			alert('please enter all details');
		} else {
			try {
				const usersRef = collection(db, 'users');
				console.log(usersRef.path);
				// const mesdata = await getDoc(users);
				const newUser = await addDoc(usersRef, {
					...user,
					createdAt: serverTimestamp(),
				});

				AsyncStorage.setItem('user', JSON.stringify(user));
				navigation.navigate('home');
			} catch (error) {
				console.log(error);
			}
		}
	};
	const setDate = (event, date) => {
		setBorn({ date, show: false });
		setUser({
			...user,
			dob: dateFormatter(born.date),
		});
	};

	return (
		<View className='flex-1 bg-slate-900 h-full justify-center items-center px-4 space-y-6'>
			<Text className='text-2xl text-slate-100 font-semibold tracking-widest pb-6'>
				tell us about you
			</Text>
			<View className='border-b border-slate-600 w-full flex-row items-center pr-3'>
				<Input
					value={user.name}
					handleChange={(text) =>
						setUser({
							...user,
							name: text,
						})
					}
					placeholder='Name'
				/>
				<TouchableOpacity>
					<AntDesign
						name='user'
						size={28}
						color='rgb(71 85 105)'
					/>
				</TouchableOpacity>
			</View>
			<View className='w-full border-b border-slate-600 flex-row items-center space-x-6'>
				<Text className='text-slate-600 text-lg'>Date of birth : </Text>
				<TouchableOpacity
					onPress={() => {
						setBorn({
							...born,
							show: true,
						});
					}}>
					<Text className='text-slate-50 py-4'>
						{user.dob ? user.dob : 'select'}
					</Text>
				</TouchableOpacity>

				{born.show && (
					<DateTimePicker
						value={born.date}
						onChange={setDate}
					/>
				)}
			</View>
			<TouchableOpacity
				onPress={handleSignup}
				className='bg-blue-400 justify-center items-center p-3 w-full rounded-lg overflow-hidden'>
				<Text className='text-slate-200 font-extrabold text-lg'>Confirm</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProfileDetailScreen;
