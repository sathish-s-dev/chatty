import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import AddRoomModal from '../components/AddRoomModal';
import { FAB } from 'react-native-paper';

const FloatingButtonSection = ({ setRooms }) => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<TouchableOpacity
				onPress={() => setModalVisible(!modalVisible)}
				className='absolute justify-center items-center rounded-full bottom-6 right-6'>
				<FAB
					icon={'plus'}
					animated
					mode='elevated'
				/>
			</TouchableOpacity>
			<AddRoomModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				setRooms={setRooms}
			/>
		</>
	);
};

export default FloatingButtonSection;
