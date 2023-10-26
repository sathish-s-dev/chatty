import React, { useContext, useState } from 'react';
import {
	KeyboardAvoidingView,
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

const ChatScreen = ({ route }) => {
	const room = useLiveMessage();
	console.log(room);
	let chats = room?.chat?.messages;
	const authState = useContext(authContext);
	const user = authState?.authState;

	const [message, setMessage] = useState('');

	return (
		<>
			<ScrollView className='bg-slate-950  px-4 relative'>
				<View className='py-10'>
					{chats &&
						chats.map((item, i) =>
							item.name === user.displayName ? (
								<ChatBubble
									key={i}
									message={item.message}
									right
								/>
							) : (
								<ChatBubble
									key={i}
									message={item.message}
								/>
							)
						)}
				</View>
			</ScrollView>
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
						onPress={async () => {
							if (message) {
								try {
									firestore()
										.doc('room/GytkqxCdx8KMeh3VHoHK')
										.update({
											messages: firestore.FieldValue.arrayUnion({
												name: user.displayName,
												message,
											}),
										})
										.then(() => console.log('added message'));
								} catch (error) {
									console.log(error);
								}

								setMessage('');
							}
						}}
						className='bg-blue-400 absolute p-3 pl-4 rounded-full right-0 h-full justify-center items-center'>
						<Ionicons
							name='ios-send'
							size={24}
							color='#fafafa'
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</>
	);
};

export default ChatScreen;
