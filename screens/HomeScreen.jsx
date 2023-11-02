import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
	Alert,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
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
import { ActivityIndicator, FAB } from 'react-native-paper';

const HomeScreen = () => {
	const navigation = useNavigation();
	const { userId } = useContext(authContext);
	const [rooms, setRooms] = useState([]);

	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		setRefreshing(true);
		// refreshing ? Alert.alert('reload called') : null;
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, [userId]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getRooms(userId);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const getRooms = (userId) => {
		firestore()
			.collection('users')
			.doc(userId)
			.get()
			.then((querysnapshot) => {
				if (querysnapshot.exists) {
					// console.log(querysnapshot);
					setRooms(querysnapshot.data()?.rooms);
				}
			})
			.catch((e) => Alert.alert(e.message));
	};

	useLayoutEffect(() => {
		getRooms(userId);
	}, [userId]);

	// Alert.alert(JSON.stringify(rooms));
	// console.log(rooms);

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
				<Header />
				{refreshing ? (
					<View className='flex-row justify-center space-x-2 items-center'>
						<ActivityIndicator
							color='white'
							size={'small'}
						/>
						<Text className='text-slate-100'>reloading</Text>
					</View>
				) : null}

				<View className='h-52 bg-blue-700 rounded-[34px] mt-6'>
					<Text className='text-slate-100 text-lg font-semibold p-4 pt-5'>
						Favourite People
					</Text>
					{/* <FavouritePeoples /> */}
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
		</>
	);
};

export default HomeScreen;
