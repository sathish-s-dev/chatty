import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import ChatItem from '../components/ChatItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FavouritePeoples from '../components/FavouritePeoples';
import useUser from '../hooks/useUser';
import { useUserStore } from '../store/useUserStore';
import FloatingButtonSection from './FloatingButtonSection';

const HomeScreen = () => {
	const navigation = useNavigation();

	const userId = useUserStore((state) => state.userId);

	const userData = useUser(userId);
	const [rooms, setRooms] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	// useEffect(() => {
	// 	setRefreshing(true);
	// 	setTimeout(() => {
	// 		setRefreshing(false);
	// 	}, 1000);
	// }, []);

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
					<ScrollView className='pb-24'>
						{!!rooms.length &&
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
			<FloatingButtonSection setRooms={setRooms} />
			{/* <NotificationComp /> */}
		</>
	);
};

export default HomeScreen;
