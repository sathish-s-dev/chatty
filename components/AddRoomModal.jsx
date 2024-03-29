import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { Button as Buttons } from 'react-native-paper';
import { useUserStore } from '../store/useUserStore';
import { Alert } from 'react-native';

const AddRoomModal = ({ modalVisible, setModalVisible, setRooms }) => {
	const [roomName, setRoomName] = useState('');
	const [roomId, setRoomId] = useState('');
	const [create, setCreate] = useState(true);
	const [loading, setLoading] = useState(false);

	const userId = useUserStore((state) => state.userId);

	useLayoutEffect(() => {
		function onResult(QuerySnapshot) {
			// console.log('Got Users collection result.', QuerySnapshot.data().rooms);
			setRooms(QuerySnapshot.data()?.rooms);
		}

		const subscribe = firestore()
			.collection('users')
			.doc(userId)
			.onSnapshot(onResult);
		return () => subscribe();
	}, [userId]);

	const addRoom = async () => {
		if (roomName) {
			setLoading(true);
			try {
				console.log({
					title: roomName,
					messages: [],
				});
				let room = await firestore().collection('room').add({
					name: roomName,
					messages: [],
				});

				console.log('created');
				let userRoom = await firestore().collection('users').doc(userId).get();
				if (userRoom.exists) {
					console.log(userRoom.data()?.rooms);
					let add = await firestore()
						.collection('users')
						.doc(userId)
						.update({
							rooms: firestore.FieldValue.arrayUnion({
								id: room.id,
								name: roomName,
							}),
						});

					console.log('success');
					setRoomName('');
					setModalVisible(false);
				}
			} catch (error) {
				console.error(error);
				Alert.alert(error.message);
			}
			setLoading(false);
		}
	};

	const joinRoom = async () => {
		if (roomId) {
			setLoading(true);
			try {
				console.log({
					title: roomName,
					messages: [],
				});
				let room = await firestore().collection('room').doc(roomId).get();
				console.log(room);

				if (room.exists) {
					let userRoom = await firestore()
						.collection('users')
						.doc(userId)
						.update({
							rooms: firestore.FieldValue.arrayUnion({
								id: roomId,
								name: room.data()?.name,
							}),
						});
					console.log('success');

					setRoomName('');
				}

				setModalVisible(false);
			} catch (error) {
				console.error(error);
				Alert.alert(error.message);
			}
			setLoading(false);
		}
	};

	return (
		<Modal
			animationType='slide'
			transparent={true}
			style={{ backfaceVisibility: 50 }}
			visible={modalVisible}
			onRequestClose={() => {
				alert('Modal has been closed.');
				setModalVisible(!modalVisible);
			}}>
			<View className='justify-center items-center mt-5 flex-1'>
				<View className='p-10 w-72 space-y-3 rounded-xl bg-slate-100'>
					<Pressable
						className='absolute right-5 top-5'
						onPress={() => setModalVisible(!modalVisible)}>
						<Ionicons
							name='ios-close'
							size={24}
							color='black'
						/>
					</Pressable>
					{create ? (
						<CreateRoom
							roomName={roomName}
							setRoomName={setRoomName}
							addRoom={addRoom}
							setModalVisible={setModalVisible}
							loading={loading}
						/>
					) : (
						<JoinRoom
							setModalVisible={setModalVisible}
							setRoomId={setRoomId}
							roomId={roomId}
							joinRoom={joinRoom}
							loading={loading}
						/>
					)}
					<View>
						<Buttons
							contentStyle={{ flexDirection: create ? 'row-reverse' : 'row' }}
							className={`${create ? 'self-end' : 'self-start'} items-center`}
							onPress={() => {
								setCreate(!create);
							}}
							mode='text'
							textColor='rgb(29 78 216)'
							icon={create ? 'arrow-right' : 'arrow-left'}>
							{create ? 'Join' : 'create'}
						</Buttons>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddRoomModal;

export function JoinRoom({
	setModalVisible,
	setRoomId,
	joinRoom,
	roomId,
	loading,
}) {
	return (
		<View className='space-y-3'>
			<Text className='text-[18px] font-semibold uppercase '>join room</Text>
			<View>
				<Text className='font-semibold capitalize pb-2'>Room id:</Text>
				{/* <Input className={'h-24 flex-grow-0'} /> */}
				<TextInput
					value={roomId}
					onChangeText={(text) => setRoomId(text)}
					className='border rounded text-lg border-blue-400 p-2 text-slate-800'
				/>
			</View>
			<View className='flex-row space-x-3'>
				<Buttons
					buttonColor='blue'
					textColor='white'
					mode='elevated'
					className='rounded-lg font-bold tracking-wider'
					onPress={joinRoom}
					disabled={loading}
					loading={loading}>
					Join
				</Buttons>
				<Buttons
					textColor='rgb(29 78 216)'
					mode='elevated'
					style={{
						borderColor: 'rgb(29 78 216)',
					}}
					className='rounded-lg font-bold tracking-wider'
					onPress={() => setModalVisible(false)}>
					cancel
				</Buttons>
			</View>
		</View>
	);
}

export function CreateRoom({
	roomName,
	setRoomName,
	addRoom,
	setModalVisible,
	loading,
}) {
	return (
		<View className='space-y-3'>
			<Text className='text-[18px] font-semibold uppercase '>create room</Text>
			<View>
				<Text className='font-semibold capitalize pb-2'>Name:</Text>
				{/* <Input className={'h-24 flex-grow-0'} /> */}
				<TextInput
					value={roomName}
					onChangeText={(text) => setRoomName(text)}
					className='border rounded text-lg border-blue-400 p-2 text-slate-800'
				/>
			</View>
			<View className='flex-row space-x-3'>
				<Buttons
					buttonColor='blue'
					textColor='white'
					mode='elevated'
					className='rounded-lg font-bold tracking-wider'
					disabled={loading}
					loading={loading}
					onPress={addRoom}>
					create
				</Buttons>
				<Buttons
					textColor='rgb(29 78 216)'
					mode='elevated'
					style={{
						borderColor: 'rgb(29 78 216)',
					}}
					className='rounded-lg font-bold tracking-wider'
					onPress={() => setModalVisible(false)}>
					cancel
				</Buttons>
			</View>
		</View>
	);
}
