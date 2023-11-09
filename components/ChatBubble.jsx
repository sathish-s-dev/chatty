import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

const ChatBubble = ({ right, message, photoURL, displayName, email }) => {
	// if (email) {
	// 	console.log(email);
	// }

	const navigation = useNavigation();

	return (
		<View>
			{right ? (
				<View className='flex-row space-x-2 items-center justify-end my-3'>
					<View className='bg-blue-700 max-w-[300px] p-3 px-6 rounded-full rounded-br-none'>
						<Text className='text-slate-50 text-[14px]'>{message}</Text>
					</View>
				</View>
			) : (
				<View className='flex-row space-x-2 items-end my-3'>
					{photoURL ? (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('friend', {
									email,
									displayName,
									photoURL,
								});
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
					<View className='bg-slate-50/20 max-w-[300px] p-3 px-6 rounded-full rounded-bl-none'>
						<Text className='text-slate-50 text-[14px]'>{message}</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default ChatBubble;
