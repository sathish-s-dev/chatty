import * as ImagePicker from 'expo-image-picker';

export const pickImage = async (setImage) => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [3, 3],
		quality: 0.5,
	});

	if (!result.canceled) {
		setImage(result.assets[0]);
	}
};
