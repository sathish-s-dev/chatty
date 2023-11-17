import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useState, useEffect, useRef } from 'react';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export async function schedulePushNotification(title, body) {
	try {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: title || "You've got mail! 📬",
				body: body || 'Here is the notification body',
				data: { data: 'goes here' },
			},
			trigger: { seconds: 2 },
		});
	} catch (error) {
		console.error(error);
	}
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: '3d6a268d-595b-4d3f-a303-7527c56b7281',
			})
		).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	return token;
}

import React from 'react';

export const useNotification = () => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);
	console.log(expoPushToken, notification);
};

export default useNotification;
