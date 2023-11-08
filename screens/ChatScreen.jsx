import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import ChatBubble from '../components/ChatBubble';

import firestore from '@react-native-firebase/firestore';

import { Ionicons } from '@expo/vector-icons';
import { useLiveMessage } from '../hooks/useLiveMessage';
import { authContext } from '../lib/authContext';
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton } from 'react-native-paper';
import { addFavouriteRoom, removeFavouriteRoom } from '../lib/roomHelper';
import useUser from '../hooks/useUser';
import { useUserStore } from '../store/useUserStore';

const ChatScreen = ({ route }) => {
	const { userId } = useContext(authContext);
	console.log(userId);
	const userData = useUser(userId);
	const [fav, setFav] = useState(null);
	const param = route.params;

	const navigation = useNavigation();

	useEffect(() => {
		if (userData) {
			userData.favouriteRooms?.forEach((room) => {
				if (room.id === param?.id) {
					setFav(true);
				}
			});
		}
	}, [userData]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: `${(param?.name).toUpperCase()}`,
			headerRight: () => (
				<View className='flex-row items-center justify-center space-x-6'>
					{fav ? (
						<TouchableOpacity
							className=''
							onPress={() => {
								setFav(false);
								removeFavouriteRoom(userId, param);
								// console.log('hearted', fav);
							}}>
							<Ionicons
								name={'ios-star'}
								color='white'
								className=''
								size={24}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							className=''
							onPress={() => {
								setFav(true);
								addFavouriteRoom(userId, param);
								// console.log('hearted', fav);
							}}>
							<Ionicons
								name={'ios-star-outline'}
								color='white'
								className=''
								size={24}
							/>
						</TouchableOpacity>
					)}

					<Pressable onPress={() => navigation.navigate('room', param)}>
						<Avatar.Text
							size={42}
							label={param?.name.charAt(0).toUpperCase()}
							color='#fff'
							style={{ backgroundColor: 'green' }}
						/>
					</Pressable>
				</View>
			),
		});
	}, [fav]);

	const sendMessage = async () => {
		if (message) {
			try {
				firestore()
					.doc(`room/${param?.id}`)
					.update({
						messages: firestore.FieldValue.arrayUnion({
							name: user?.name,
							photoUrl: `${user?.photoURL}`,
							message,
							email: user?.email,
						}),
						lastMessage: message,
					})
					.then((val) => console.log('added message', val));
			} catch (error) {
				console.log(error);
			}

			setMessage('');
		}
	};

	const room = useLiveMessage(param?.id);
	console.log(room);

	// console.log(room);
	let chats = room?.chat?.messages;
	console.log(chats?.length);

	let user = useUserStore((state) => state.user);

	const [message, setMessage] = useState('');

	return (
		<>
			<ScrollView className='bg-slate-950 px-4 relative'>
				<View className='py-10'>
					{chats &&
						chats.map((item, i) =>
							item.name === user.name ? (
								<ChatBubble
									key={i}
									message={item.message}
									right
									email={item?.email}
								/>
							) : (
								<ChatBubble
									key={i}
									message={item?.message}
									photoURL={item?.photoUrl}
									displayName={item?.name}
									email={item?.email}
								/>
							)
						)}
				</View>
			</ScrollView>
			<NewMessage
				sendMessage={sendMessage}
				setMessage={setMessage}
				message={message}
			/>
		</>
	);
};

export default ChatScreen;

function NewMessage({ setMessage, message, sendMessage }) {
	return (
		<KeyboardAvoidingView className='relative bg-slate-900'>
			<View className='relative bottom-1 border flex-row justify-between items-center overflow-hidden rounded-full bg-slate-100 mx-3'>
				<TextInput
					className='flex-1 p-3 px-6'
					placeholder='Type your message...'
					placeholderTextColor={'gray'}
					value={message}
					onChangeText={(text) => setMessage(text)}
				/>
				<TouchableOpacity
					onPress={sendMessage}
					className='bg-blue-400 absolute rounded-full right-0 h-full justify-center items-center'>
					<IconButton
						icon={'send'}
						iconColor={'#fafafa'}
					/>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
