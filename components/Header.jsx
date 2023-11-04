import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../lib/authContext';
import auth from '@react-native-firebase/auth';
import { Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const cute = require('../assets/cute.webp');

const Header = () => {
	const navigation = useNavigation();
	const { authState } = useContext(authContext);
	const photo = authState?.photoURL;

	return (
		<SafeAreaView className='p-6 pt-8 bg-slate-950 flex-row justify-between items-center'>
			<View>
				<Text className='text-2xl font-semibold text-slate-100'>Messages</Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={async () => {
						try {
							await auth().signOut();
							navigation.navigate('login');
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
					) : null}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Header;
