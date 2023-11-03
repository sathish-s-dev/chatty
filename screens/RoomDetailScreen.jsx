import { Alert, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Chip, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useContext } from 'react';
import { authContext } from '../lib/authContext';
import firestore from '@react-native-firebase/firestore';
import { leaveRoom } from '../lib/roomHelper';

const cute = require('../assets/cute.webp');

const RoomDetailScreen = ({ route, navigation }) => {
	const param = route.params;
	console.log(param);

	const { userId } = useContext(authContext);

	const copyToClipboard = async (id) => {
		await Clipboard.setStringAsync(id);
	};

	return (
		<View className='items-center p-6 flex-1'>
			<Avatar.Text
				textColor='white'
				size={150}
				className='items-center justify-center rounded-lg text-slate-50 bg-green-400'
				label={param?.name.charAt(0).toUpperCase()}
			/>
			<Text
				variant='displaySmall'
				className='font-semibold text-slate-800 pt-6 capitalize'>
				{param?.name}
			</Text>
			<View className='mt-6'>
				<Text className='text-xl font-bold pb-3 uppercase'>Room id:</Text>
				<View className='flex-row space-x-3 p-2 items-center justify-center border border-slate-300 rounded-lg'>
					<Chip
						variant='outlined'
						mode='flat'
						className='bg-transparent tracking-widest'>
						{param?.id}
					</Chip>
					<TouchableOpacity
						onPress={() => {
							copyToClipboard(param?.id);
							Alert.alert('copied', param?.id);
						}}
						className='border p-2 rounded-md border-slate-500'>
						<Feather
							name='clipboard'
							size={18}
							color='rgb(100 116 139)'
						/>
					</TouchableOpacity>
				</View>
			</View>
			<Button
				mode='elevated'
				textColor='white'
				buttonColor='red'
				className='rounded-lg font-bold tracking-wider absolute bottom-6'
				onPress={() => {
					leaveRoom(userId, param?.id, param?.name);
					console.log('left room');
					navigation.navigate('home');
				}}>
				Leave Room
			</Button>
		</View>
	);
};

export default RoomDetailScreen;
