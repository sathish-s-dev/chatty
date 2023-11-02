import React, { useContext, useState, useLayoutEffect } from 'react';
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
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ route }) => {
	const [fav, setFav] = useState(false);
	const param = route.params;
	// console.log(param);

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: `${(param?.name).toUpperCase()}`,
			headerRight: () => (
				<View className='flex-row items-center justify-center space-x-6'>
					<TouchableOpacity
						onPress={() => {
							setFav(!fav);
							console.log('hearted', fav);
						}}>
						{fav ? (
							<Ionicons
								name={'ios-star'}
								color='white'
								className=''
								size={24}
							/>
						) : (
							<Ionicons
								name={'ios-star-outline'}
								color='white'
								className=''
								size={24}
							/>
						)}
					</TouchableOpacity>
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
	}, []);

	const sendMessage = async () => {
		if (message) {
			try {
				firestore()
					.doc(`room/${param?.id}`)
					.update({
						messages: firestore.FieldValue.arrayUnion({
							name: user.displayName,
							photoUrl: `${user.photoURL}`,
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

	// console.log(room);
	let chats = room?.chat?.messages;
	const authState = useContext(authContext);
	const user = authState?.authState;

	const [message, setMessage] = useState('');

	return (
		<>
			<ScrollView className='bg-slate-950 px-4 relative'>
				<View className='py-10'>
					{chats &&
						chats.map((item, i) =>
							item.name === user.displayName ? (
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
