import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Card, Avatar } from 'react-native-paper';

const ChatItem = ({ name, id, lastMessage }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			className='w-full'
			onPress={() => navigation.navigate('chat', { name, id })}>
			<Card
				mode='elevated'
				style={{ borderColor: 'rgba(248, 250, 252,0.3)', borderWidth: 1 }}
				className='my-2 bg-transparent'>
				<View className='flex-row my-1 space-x-1 items-center px-4'>
					<View className='w-10 bg-green-600 aspect-square items-center justify-center rounded-full ring-2 ring-green-400 ring-offset-2'>
						<Avatar.Text
							size={48}
							label={name.charAt(0).toUpperCase()}
						/>
					</View>
					<View className=' p-3 px-4 rounded-full rounded-bl-none'>
						<Text className='text-slate-50 text-lg capitalize text-md '>
							{name}
						</Text>
						<Text className='text-slate-50 text-xs'>{lastMessage}</Text>
					</View>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

export default ChatItem;
