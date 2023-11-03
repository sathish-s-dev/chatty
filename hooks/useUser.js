import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const useUser = (userId) => {
	if (userId) {
		const [user, setUser] = useState(null);

		useEffect(() => {
			firestore()
				.collection('users')
				.doc(userId)
				.onSnapshot((querySnapshot) => {
					if (querySnapshot.exists) {
						setUser(querySnapshot.data());
					}
				});
		}, [userId]);

		return user;
	}
};

export default useUser;
