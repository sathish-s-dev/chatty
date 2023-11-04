import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

const useUser = (userId) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (userId) {
			firestore()
				.collection('users')
				.doc(userId)
				.onSnapshot((querySnapshot) => {
					if (querySnapshot.exists) {
						setUser(querySnapshot.data());
					}
				});
		}
	}, [userId]);
	return user;
};

export default useUser;
