import firestore from '@react-native-firebase/firestore';

export const addFavouriteRoom = async (userId, param) => {
	try {
		let user = await firestore().collection('users').doc(userId).get();
		console.log(user);
		if (user.exists) {
			let userRoom = await firestore()
				.collection('users')
				.doc(userId)
				.update({
					favouriteRooms: firestore.FieldValue.arrayUnion({
						id: param?.id,
						name: param?.name,
					}),
				});
			console.log('room added successfully');
		}
	} catch (error) {
		console.error(error);
	}
};

export const removeFavouriteRoom = async (userId, param) => {
	try {
		let user = await firestore().collection('users').doc(userId).get();
		if (user.exists) {
			let userRoom = await firestore()
				.collection('users')
				.doc(userId)
				.update({
					favouriteRooms: firestore.FieldValue.arrayRemove({
						id: param?.id,
						name: param?.name,
					}),
				});
			console.log('room removed successfully');
		}
	} catch (error) {
		console.error(error);
	}
};

export const leaveRoom = async (userId, roomId, name) => {
	if (roomId) {
		try {
			console.log({
				userId,
				roomId,
				name,
			});
			let user = await firestore().collection('users').doc(userId).get();
			console.log(user);
			if (user.exists) {
				let userRoom = await firestore()
					.collection('users')
					.doc(userId)
					.update({
						rooms: firestore.FieldValue.arrayRemove({
							id: roomId,
							name,
						}),
					});
				console.log('success');
			}
		} catch (error) {
			console.error(error);
		}
	}
};
