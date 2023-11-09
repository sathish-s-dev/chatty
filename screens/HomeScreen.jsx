import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import ChatItem from '../components/ChatItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FAB } from 'react-native-paper';
import AddRoomModal from '../components/AddRoomModal';
import FavouritePeoples from '../components/FavouritePeoples';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import NotificationComp from '../utils/notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../store/useUserStore';

const HomeScreen = () => {
	const navigation = useNavigation();

	const userId = useUserStore((state) => state.userId);
	// console.log(userId, 'new user');

	const userData = useUser(userId);
	const [rooms, setRooms] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getRooms(userId);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const getRooms = (userId) => {
		console.log('userId from getRooms', userId);
		firestore()
			.collection('users')
			.doc(userId)
			.get()
			.then((querysnapshot) => {
				if (querysnapshot.exists) {
					setRooms(querysnapshot.data()?.rooms);
				}
			})
			.catch((e) => console.log('error from get rooms', e));
	};

	useEffect(() => {
		getRooms(userId);
	}, [userId]);

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
			<ScrollView
				className='bg-slate-950 flex-1'
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}>
				{/* <Header /> */}
				<View className='h-52 bg-blue-700 rounded-[34px] mt-5'>
					<Text className='text-slate-100 text-lg font-semibold p-4 pt-5'>
						Favourite Rooms
					</Text>
					<FavouritePeoples userData={userData} />
				</View>
				<View className='flex-1 bg-slate-950 rounded-[34px] p-6 -mt-10'>
					<Text className='text-slate-100 text-lg font-semibold p-4 pt-5'>
						Chats
					</Text>
					<ScrollView>
						{rooms &&
							rooms.map((item, index) => (
								<ChatItem
									key={index}
									name={item?.name}
									id={item?.id}
								/>
							))}
					</ScrollView>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => setModalVisible(!modalVisible)}
				className='absolute justify-center items-center rounded-full bottom-6 right-6'>
				<FAB
					icon={'plus'}
					animated
					mode='elevated'
				/>
			</TouchableOpacity>
			<AddRoomModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				setRooms={setRooms}
			/>
			{/* <NotificationComp /> */}
		</>
	);
};

export default HomeScreen;
