import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { authContext } from '../lib/authContext';

const AddRoomModal = ({ modalVisible, setModalVisible }) => {
	const [roomName, setRoomName] = useState('');
	const [roomId, setRoomId] = useState('');

	const userData = useContext(authContext);
	let userId = userData?.userId;

	const addRoom = async () => {
		if (roomName) {
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
				let userRoom = await firestore()
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
			} catch (error) {
				console.error(error);
			}
		}
	};

	const joinRoom = async () => {
		if (roomId) {
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
			}
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
					<Text className='text-[18px] font-semibold uppercase '>
						create room
					</Text>
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
						<Button
							text={'create'}
							buttonStyles={'bg-blue-600 py-3 px-4 self-start rounded-lg'}
							textStyles={'text-white font-bold tracking-wider'}
							onPress={addRoom}
						/>
						<Button
							text={'cancel'}
							buttonStyles={
								'border-blue-600 border text- py-3 px-4 self-start rounded-lg'
							}
							textStyles={'text-blue-600 font-bold tracking-wider'}
							onPress={() => setModalVisible(false)}
						/>
					</View>
					<View className='border-b border-blue-200' />
					<Text className='text-[18px] font-semibold uppercase '>
						join room
					</Text>
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
						<Button
							text={'join'}
							buttonStyles={'bg-blue-600 py-3 px-4 self-start rounded-lg'}
							textStyles={'text-white font-bold tracking-wider'}
							onPress={joinRoom}
						/>
						<Button
							text={'cancel'}
							buttonStyles={
								'border-blue-600 border text- py-3 px-4 self-start rounded-lg'
							}
							textStyles={'text-blue-600 font-bold tracking-wider'}
							onPress={() => setModalVisible(false)}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddRoomModal;
