import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../lib/authContext';
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { Button, Chip } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
	const { userId } = useContext(authContext);
	const navigation = useNavigation();
	const [user, setUser] = useState(null);
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	console.log(image);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			// uploadImage(result.assets[0].uri, 'image');
		}
	};
	async function uploadImage(uri, fileType) {
		const response = await fetch(uri);
		const blob = await response.blob();
		const storageRef = ref(storage, 'Stuff/' + new Date().getTime());

		const uploadTask = uploadBytesResumable(storageRef, blob);

		// listen for events
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				setProgress(parseInt(progress.toFixed()));
			},
			(error) => {
				// handle error
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					console.log('File available at', downloadURL);
					// save record
					// await saveRecord(fileType, downloadURL, new Date().toISOString());
					setImage('');
					// setVideo('');
				});
			}
		);
	}
	console.log(user);
	useEffect(() => {
		try {
			const unsubscribe = firestore()
				.collection('users')
				.doc(userId)
				.get()
				.then((querysnapshot) => {
					if (querysnapshot.exists) {
						// console.log(querysnapshot.data());
						setUser(querysnapshot.data());
					}
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<ScrollView className='flex-1 bg-slate-950 p-4'>
			{user && (
				<View className='w-full border border-slate-600/20 space-y-5 rounded-2xl p-6 flex-1'>
					<View>
						<TouchableOpacity
							className='self-center'
							onPress={pickImage}>
							{user?.photoURL ? (
								<Image
									source={{ uri: user?.photoURL }}
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
						{/* <Button
							onPress={() => console.log('called')}
							className='self-center'
							labelStyle={{
								color: 'red',
							}}>
							change profile pic
						</Button> */}
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
								{user?.rooms.length > 0 ? (
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
