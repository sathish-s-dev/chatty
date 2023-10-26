import { View, Text, Image } from 'react-native';
import React, { useContext } from 'react';
import { authContext } from '../lib/authContext';

const ChatBubble = ({ right, message, photoURL, displayName }) => {
	const authData = useContext(authContext);
	return (
		<>
			{right ? (
				<View className='flex-row space-x-2 items-center justify-end my-2'>
					<View className='bg-slate-50/10 max-w-[200px] p-3 px-4 rounded-full rounded-br-none'>
						<Text className='text-slate-50 '>{message}</Text>
					</View>
				</View>
			) : (
				<View className='flex-row space-x-2 items-center my-2'>
					{photoURL ? (
						<Image
							className='w-10 bg-blue-200 aspect-square rounded-full ring-2 ring-green-400 ring-offset-2'
							source={{
								uri: photoURL,
							}}
						/>
					) : (
						<View className='w-10 bg-green-600 aspect-square items-center justify-center rounded-full ring-2 ring-green-400 ring-offset-2'>
							<Text className='text-2xl capitalize text-white font-extrabold'>
								{displayName[0]}
							</Text>
						</View>
					)}
					<View className='bg-slate-50/10 max-w-[200px] p-3 px-4 rounded-full rounded-bl-none'>
						<Text className='text-slate-50 '>{message}</Text>
					</View>
				</View>
			)}
		</>
	);
};

export default ChatBubble;
