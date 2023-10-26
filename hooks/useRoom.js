import firestore from '@react-native-firebase/firestore';

import { useEffect, useLayoutEffect, useState } from 'react';

export const useRooms = (userId) => {
	const [rooms, setRooms] = useState('');
	console.log(userId);
	function onResult(QuerySnapshot) {
		// console.log('Got Users collection result.', QuerySnapshot.data().rooms);
		setRooms(QuerySnapshot.data()?.rooms);
	}

	function onError(error) {
		console.error(error);
	}

	useLayoutEffect(() => {
		const subscribe = firestore()
			.collection('users')
			.doc(userId)
			.get()
			.then((querysnapshot) => {
				if (querysnapshot.exists) {
					onResult(querysnapshot);
				}
			});
		// console.log(subscribe);
	}, []);
	// useEffect(() => {
	// 	const subscribe = firestore()
	// 		.collection('users')
	// 		.doc(userId)
	// 		.onSnapshot(onResult, onError);
	// 	return () => subscribe();
	// }, []);

	if (!rooms) {
		return;
	}
	return {
		rooms,
	};
};
