import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ChatItem = ({}) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('chat', { user: 'vasanth' })}>
			<View className='flex-row space-x-2 items-center my-2'>
				<Image
					source={{
						uri: 'https://tse3.mm.bing.net/th?id=OIP.b2TPzA0JDYVEhfD7d1dUnwHaFj&pid=Api&P=0&h=220',
					}}
					className='w-10 bg-blue-200 aspect-square rounded-full ring-2 ring-green-400 ring-offset-2'
				/>
				<View className=' p-3 px-4 rounded-full rounded-bl-none'>
					<Text className='text-slate-50 text-md '>User Name</Text>
					<Text className='text-slate-50 text-xs'>hi how are you</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
