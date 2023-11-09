import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { Button, Chip } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import { pickImage } from '../utils/pickImage';
import { useUserStore } from '../store/useUserStore';

const ProfileScreen = () => {
	const userId = useUserStore((state) => state.userId);
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const navigation = useNavigation();
	// const [user, setUser] = useState(null);
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [transferred, setTransferred] = useState(0);
	console.log(image);

	// console.log(image);

	const uploadImage = async () => {
		const { uri } = image;
		const filename = uri.substring(uri.lastIndexOf('/') + 1);
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
		setUploading(true);
		setTransferred(0);
		const task = storage().ref(filename).putFile(uploadUri);
		// set progress state
		task.on('state_changed', (snapshot) => {
			setTransferred(
				Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
			);
		});
		task.then(async (value) => {
			try {
				const uri = await storage()
					.ref(value?.metadata.fullPath)
					.getDownloadURL();
				console.log(uri);
				setUser({ ...user, photoURL: uri });
				firestore()
					.collection('users')
					.doc(userId)
					.get()
					.then(async (querysnapshot) => {
						if (querysnapshot.exists) {
							let userRoom = await firestore()
								.collection('users')
								.doc(userId)
								.update({
									photoURL: uri,
								});
						}
					});
			} catch (error) {
				console.log(error);
			}
		});

		try {
			await task;
		} catch (e) {
			console.error(e);
		}
		setUploading(false);
		Alert.alert(
			'Photo uploaded!',
			'Your photo has been uploaded to Firebase Cloud Storage!'
		);
		setImage(null);
	};

	return (
		<ScrollView className='flex-1 bg-slate-950 p-4'>
			{user && (
				<View className='w-full border border-slate-600/20 space-y-5 rounded-2xl p-6 flex-1'>
					<View>
						<TouchableOpacity
							className='self-center pb-4'
							onPress={() => pickImage(setImage)}>
							{user?.photoURL ? (
								<Image
									source={{ uri: image?.uri || user?.photoURL }}
									className='w-28 aspect-square rounded-xl'
								/>
							) : (
								<View className=' w-28 aspect-square rounded-xl bg-slate-600 justify-center items-center'>
									<Feather
										name='user'
										size={75}
										color='black'
									/>
								</View>
							)}
						</TouchableOpacity>
						{image && (
							<Button
								onPress={uploadImage}
								className='self-center space-x-4'
								labelStyle={{
									color: 'green',
									fontSize: 18,
									flexDirection: 'column',
								}}>
								<Feather
									name='upload'
									style={{ marginRight: 5 }}
									size={18}
								/>
								upload
							</Button>
						)}
					</View>
					<View className='space-y-3'>
						<View>
							<Text className='text-slate-50/80'>Name:</Text>
							<Text className='pl-2 text-slate-50 text-lg'>
								{user.name ? (
									<Text className='pl-2 text-slate-50 text-lg'>
										{user?.name}
									</Text>
								) : (
									<Text className='text-slate-600'>not available</Text>
								)}
							</Text>
						</View>
						<View>
							<Text className='text-slate-50/80'>Email: </Text>
							<Text className='pl-2 text-slate-50 text-lg'>{user?.email}</Text>
						</View>
						<View className='space-y-1 h-36'>
							<Text className='text-slate-50/80'>Bio: </Text>

							{user?.bio ? (
								<Text className='pl-2 text-slate-50 text-lg'>{user?.bio}</Text>
							) : (
								<Text className='pl-2 text-slate-600'>not available</Text>
							)}
						</View>
						<View className=''>
							<Text className='text-slate-50/80'>Rooms:</Text>
							<ScrollView
								horizontal
								className='gap-4 py-2'>
								{user?.rooms?.length > 0 ? (
									user?.rooms?.map((item, i) => (
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
						<TouchableOpacity
							onPress={() =>
								Alert.alert('Logout', 'Are you sure you want to logout', [
									{
										text: 'cancel',
									},
									{
										text: 'ok',
										onPress: async () => {
											try {
												await auth().signOut();
												navigation.navigate('login');
											} catch (e) {
												console.log(e);
											}
										},
									},
								])
							}>
							<Button
								className='my-2'
								textColor='red'>
								Logout
							</Button>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default ProfileScreen;
