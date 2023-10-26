import { View, Text, Image } from 'react-native';
import React from 'react';

const ChatBubble = ({ right, message }) => {
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
					<Image
						className='w-10 bg-blue-200 aspect-square rounded-full ring-2 ring-green-400 ring-offset-2'
						source={{
							uri: 'https://images.unsplash.com/photo-1696416748833-0407ebea6047?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
						}}
					/>
					<View className='bg-slate-50/10 max-w-[200px] p-3 px-4 rounded-full rounded-bl-none'>
						<Text className='text-slate-50 '>{message}</Text>
					</View>
				</View>
			)}
		</>
	);
};

export default ChatBubble;
