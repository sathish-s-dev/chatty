import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';

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
						<Image
							className='w-16 bg-blue-200 aspect-square rounded-full ring-2 ring-green-400 ring-offset-2'
							source={{
								uri: 'https://tse3.mm.bing.net/th?id=OIP.b2TPzA0JDYVEhfD7d1dUnwHaFj&pid=Api&P=0&h=220',
							}}
						/>
						<Text className='text-slate-200'>user {i}</Text>
					</TouchableOpacity>
				))}
		</ScrollView>
	);
};

export default FavouritePeoples;
