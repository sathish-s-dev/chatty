import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const cute = require('../assets/cute.webp');
const FavouritePeoples = ({ userData: user }) => {
	const navigation = useNavigation();
	// const user = useUser(userData?.userId);
	return (
		<ScrollView
			horizontal
			className='gap-4 px-4'>
			{user?.favouriteRooms?.map((room, i) => (
				<TouchableOpacity
					key={i}
					onPress={() => {
						console.log(room);
						navigation.navigate('chat', room);
					}}
					className='items-center space-y-1'>
					<Avatar.Text
						label={room?.name.charAt(0).toUpperCase()}
						labelStyle={{
							color: 'white',
						}}
						className='bg-green-800'
						size={48}
					/>
					<Text className='text-slate-200 font-semibold capitalize'>
						{room?.name}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};
export default FavouritePeoples;
