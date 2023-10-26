import React, { useContext, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ChatItem from '../components/ChatItem';
// import { auth } from '../firebase.config';
import { useNavigation } from '@react-navigation/core';
import { authContext } from '../lib/authContext';

import { Ionicons } from '@expo/vector-icons';
import AddRoomModal from '../components/AddRoomModal';
import FavouritePeoples from '../components/FavouritePeoples';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRooms } from '../hooks/useRoom';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
	const navigation = useNavigation();
	const { userId } = useContext(authContext);
	const [rooms, setRooms] = useState([]);

	useLayoutEffect(() => {
		const subscribe = firestore()
			.collection('users')
			.doc(userId)
			.get()
			.then((querysnapshot) => {
				if (querysnapshot.exists) {
					console.log(querysnapshot);
					setRooms(querysnapshot.data().rooms);
				}
			});
	}, [userId]);
	console.log(rooms);

	useLayoutEffect(() => {
		if (!auth().currentUser) {
			AsyncStorage.removeItem('user');
			AsyncStorage.removeItem('userId');
			navigation.navigate('login');
		}
	}, []);

	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<ScrollView className='bg-slate-950 flex-1'>
				<Header />
				<View className='h-52 bg-blue-700 rounded-[34px] mt-6'>
					<Text className='text-slate-100 text-lg font-semibold p-4 pt-5'>
						Favourite People
					</Text>
					<FavouritePeoples />
				</View>
				<View className='flex-1 bg-slate-950 rounded-[34px] p-6 -mt-10'>
					<Text className='text-slate-100 text-lg font-semibold p-4 pt-5'>
						Chats
					</Text>
					<ScrollView>
						{/* {Array(20)
							.fill(0)
							.map((_, i) => (
								<ChatItem key={i} />
							))} */}
						{rooms &&
							rooms.map((item, index) => (
								<ChatItem
									key={index}
									name={item.name}
									id={item.id}
								/>
							))}
					</ScrollView>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => setModalVisible(!modalVisible)}
				className='absolute justify-center items-center rounded-full bottom-6 right-6'>
				<Ionicons
					name='add-circle'
					size={60}
					color='white'
				/>
			</TouchableOpacity>
			<AddRoomModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				setRooms={setRooms}
			/>
		</>
	);
};

export default HomeScreen;
