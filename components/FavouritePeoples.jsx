import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';

const cute = require('../assets/cute.webp');
const FavouritePeoples = () => {
	return (
		<ScrollView
			horizontal
			className='gap-4 px-4'>
			{Array(20)
				.fill(0)
				.map((_, i) => (
					<TouchableOpacity
						key={i}
						className='items-center space-y-1'>
						<Avatar.Image
							source={cute}
							size={48}
						/>
						<Text className='text-slate-200'>user {i}</Text>
					</TouchableOpacity>
				))}
		</ScrollView>
	);
};

export default FavouritePeoples;
