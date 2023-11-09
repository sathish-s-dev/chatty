import { Alert, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Chip, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useContext } from 'react';
import { authContext } from '../lib/authContext';
import { leaveRoom } from '../lib/roomHelper';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store/useUserStore';

const RoomDetailScreen = ({ route, navigation }) => {
	const param = route.params;
	console.log(param);

	const userId = useUserStore((state) => state.userId);

	const copyToClipboard = async (id) => {
		await Clipboard.setStringAsync(id);
	};

	return (
		<View className='items-center p-6 flex-1 bg-slate-950'>
			<Avatar.Text
				textColor='white'
				size={150}
				labelStyle={{ color: 'rgb(203 213 225)', fontWeight: 900 }}
				className='items-center justify-center rounded-lg bg-blue-400'
				label={param?.name.charAt(0).toUpperCase()}
			/>
			<Text
				variant='displaySmall'
				className='font-semibold text-slate-100 pt-6 capitalize'>
				{param?.name}
			</Text>
			<View className='mt-6'>
				<Text className='text-xl font-bold pb-3 text-slate-100 uppercase'>
					Room id:
				</Text>
				<View className='flex-row space-x-3 p-2 items-center justify-center border border-slate-300 rounded-lg'>
					<Chip
						variant='outlined'
						textStyle={{
							color: 'rgb(203 213 225)',
						}}
						mode='flat'
						className='bg-transparent tracking-widest'>
						{param?.id}
					</Chip>
					<TouchableOpacity
						onPress={() => {
							copyToClipboard(param?.id);
							Alert.alert('copied', param?.id);
						}}
						className='border p-2 rounded-md border-slate-400'>
						<Feather
							name='clipboard'
							size={18}
							color='rgb(203 213 225)'
						/>
					</TouchableOpacity>
				</View>
			</View>
			<Button
				mode='elevated'
				textColor='white'
				icon={'logout'}
				contentStyle={{ flexDirection: 'row-reverse' }}
				className='rounded-lg font-bold bg-red-400 tracking-wider absolute bottom-12'
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
