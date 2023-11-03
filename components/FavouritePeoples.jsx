import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from 'react-native-paper';
import useUser from '../hooks/useUser';
import { authContext } from '../lib/authContext';

const cute = require('../assets/cute.webp');
const FavouritePeoples = () => {
	const { userId } = useContext(authContext);
	const user = useUser(userId);

	return (
		<ScrollView
			horizontal
			className='gap-4 px-4'>
			{user?.favouriteRooms?.map((room, i) => (
				<TouchableOpacity
					key={i}
					className='items-center space-y-1'>
					<Avatar.Text
						label={room?.name.charAt(0).toUpperCase()}
						className='bg-green-200'
						size={48}
					/>
					<Text className='text-slate-200 capitalize'>{room?.name}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};
export default FavouritePeoples;
