import firestore from '@react-native-firebase/firestore';

export const createRoom = (data) => {
	const subscribe = firestore().collection('room').add(data);

	// return () => subscribe();
};
