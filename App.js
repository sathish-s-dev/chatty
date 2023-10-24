import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default function App() {
	GoogleSignin.configure({
		webClientId:
			'957399145425-htb7cekdnef9qqpq4h0pfs26438rseqc.apps.googleusercontent.com',
	});

	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	if (!user) {
		return (
			<View>
				<GoogleSignIn />
			</View>
		);
	}

	async function onGoogleLinkButtonPress() {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the user ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Link the user with the credential
		const firebaseUserCredential = await auth().currentUser.linkWithCredential(
			googleCredential
		);
		// You can store in your app that the account was linked.
		return;
	}

	console.log(user.photoURL);

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
			<Text>{user.displayName}</Text>
			<Image
				source={{
					uri: user.photoURL,
				}}
				style={{ width: 50, height: 50, borderRadius: 50 }}
			/>
			<GoogleSignIn />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

import { Button } from 'react-native';
import { useEffect, useState } from 'react';

function GoogleSignIn() {
	async function onGoogleButtonPress() {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}
	return (
		<Button
			title='Google Sign-In'
			onPress={() =>
				onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
			}
		/>
	);
}
