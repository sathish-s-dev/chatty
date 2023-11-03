import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { authContext } from '../lib/authContext';
import { Avatar } from 'react-native-paper';

const ChatBubble = ({ right, message, photoURL, displayName, email }) => {
	// if (email) {
	// 	console.log(email);
	// }

	const authData = useContext(authContext);
	return (
		<View>
			{right ? (
				<View className='flex-row space-x-2 items-center justify-end my-2'>
					<View className='bg-blue-700 max-w-[200px] p-3 px-6 rounded-full rounded-br-none'>
						<Text className='text-slate-50 text-[14px]'>{message}</Text>
					</View>
				</View>
			) : (
				<View className='flex-row space-x-2 items-end my-2'>
					{photoURL ? (
						<TouchableOpacity
							onPress={() => {
								console.log(email);
							}}>
							<Avatar.Image
								source={{ uri: photoURL }}
								size={38}
							/>
						</TouchableOpacity>
					) : (
						<View className='w-10 bg-green-600 aspect-square items-center justify-center rounded-full ring-2 ring-green-400 ring-offset-2'>
							<Text className='text-2xl capitalize text-white font-extrabold'>
								{displayName[0]}
							</Text>
						</View>
					)}
					<View className='bg-slate-50/20 max-w-[200px] p-3 px-6 rounded-full rounded-bl-none'>
						<Text className='text-slate-50 text-[14px]'>{message}</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default ChatBubble;
