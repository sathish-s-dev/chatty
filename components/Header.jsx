import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../lib/authContext';
import auth from '@react-native-firebase/auth';
import { Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/useUserStore';

const cute = require('../assets/cute.webp');

const Header = () => {
	const navigation = useNavigation();
	let user = useUserStore((state) => state.user);
	const photo = user?.photoURL;

	return (
		<SafeAreaView className='p-6 pt-8 bg-slate-950 flex-row justify-between items-center'>
			<View>
				<Text className='text-2xl font-bold text-slate-100'>Chatty</Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={async () => {
						try {
							navigation.navigate('profile');
						} catch (e) {
							console.log(e);
						}
					}}>
					{photo ? (
						<View className='border-[3px] p-1 border-blue-600 rounded-full hover:animate-spin'>
							<Avatar.Image
								size={48}
								source={{ uri: photo }}
							/>
						</View>
					) : (
						<View className='border-[3px] justify-center items-center x p-1 border-blue-600 rounded-full hover:animate-spin'>
							<Avatar.Text
								size={48}
								label={user?.email?.charAt(0)}
								labelStyle={{
									color: 'rgb(203 213 225)',
									fontWeight: 900,
									textTransform: 'uppercase',
								}}
								className='uppercase text-slate-100'
							/>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Header;
