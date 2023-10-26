import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../lib/authContext';
import auth from '@react-native-firebase/auth';

const Header = () => {
	const { authState } = useContext(authContext);
	const photo = authState?.photoURL;
	// console.log(photo);

	return (
		<SafeAreaView className='p-6 pt-1 bg-slate-950 flex-row justify-between items-center'>
			<View>
				<Text className='text-2xl font-semibold text-slate-100'>Messages</Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={async () => {
						try {
							await auth().signOut();
						} catch (e) {
							console.log(e);
						}
					}}>
					{photo ? (
						<Image
							className='w-14 bg-white aspect-square rounded-full ring-2 ring-green-400 ring-offset-2'
							source={{
								uri: photo,
							}}
						/>
					) : null}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Header;
