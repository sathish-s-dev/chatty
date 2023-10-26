import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUser = () => {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const userdata = await AsyncStorage.getItem('user');
			console.log(userdata);
			setUser(JSON.parse(userdata));
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getUser();
	}, [user?.email]);

	if (user?.email) {
		return user;
	} else {
		return null;
	}
};

export default useUser;
