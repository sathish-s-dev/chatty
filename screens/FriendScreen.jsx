import { View, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';

const FriendScreen = ({ route }) => {
	const param = route.params;
	console.log(param);
	const [friend, setFriend] = useState(null);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: param?.displayName,
		});
		firestore()
			.collection('users')
			.where('email', '==', param?.email)
			.get()
			.then((querySnapshot) => {
				setFriend(querySnapshot.docs[0].data());
				console.log(querySnapshot.docs[0].data());
			});
	}, []);

	return (
		<View className='flex-1 bg-slate-950 p-6'>
			<Text className='text-slate-100 text-xl font-semibold py-6'>
				Friend Details
			</Text>
			<View className='w-full bg-slate-50/5 justify-center rounded-xl p-10 space-y-6'>
				<View className='w-40 h-40 bg-slate-50/10 justify-center items-center rounded-xl self-center'>
					<Image
						source={{
							uri: friend?.photoURL,
						}}
						className='w-36 h-36 rounded-xl'
					/>
				</View>
				<View className='justify-center'>
					<Text className='text-xl font-semibold text-slate-200'>
						{friend?.name}
					</Text>
					<Text className='text-slate-200'>{friend?.email}</Text>
				</View>

				<View className='max-h-16'>
					<Text className='text-slate-50/80'>Rooms:</Text>
					<ScrollView
						horizontal
						className='gap-4 py-2'>
						{friend?.rooms?.length > 0 ? (
							friend?.rooms?.map((item, i) => (
								<Chip
									mode='outlined'
									textStyle={{
										color: 'white',
									}}
									className='text-slate-50 text-lg self-start bg-transparent'
									key={i}>
									{item.name}
								</Chip>
							))
						) : (
							<Text className='text-slate-600'>you have no rooms</Text>
						)}
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default FriendScreen;
