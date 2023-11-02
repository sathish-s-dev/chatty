import { Alert, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Chip, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const cute = require('../assets/cute.webp');

const RoomDetailScreen = ({ route }) => {
	const param = route.params;
	console.log(param);

	const copyToClipboard = async (id) => {
		await Clipboard.setStringAsync(id);
	};
	return (
		<View className='justify-center items-center p-6'>
			<Avatar.Text
				textColor='white'
				size={150}
				className='items-center justify-center rounded-lg text-slate-50 bg-green-400'
				label={param?.name.charAt(0).toUpperCase()}
			/>
			<Text
				variant='displayMedium'
				className='font-semibold text-slate-500 pt-6 capitalize'>
				{param?.name}
			</Text>

			<View className='flex-row space-x-3 p-2 mt-6 items-center justify-center'>
				<Chip
					variant='outlined'
					mode='flat'
					className='bg-transparent'>
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
			<Button>Leave</Button>
		</View>
	);
};

export default RoomDetailScreen;
