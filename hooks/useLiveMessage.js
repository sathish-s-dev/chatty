import firestore from '@react-native-firebase/firestore';

import { useEffect, useState } from 'react';

export const useLiveMessage = (id) => {
	const [chat, setChat] = useState('');
	function onResult(QuerySnapshot) {
		console.log('Got Users collection result.', QuerySnapshot.id);
		setChat(QuerySnapshot.data());
	}

	function onError(error) {
		console.error(error);
	}

	useEffect(() => {
		const subscribe = firestore()
			.collection('room')
			.doc(id)
			.onSnapshot(onResult, onError);

		return () => subscribe();
	}, []);

	if (!chat) {
		return;
	}
	return {
		chat,
	};
};
