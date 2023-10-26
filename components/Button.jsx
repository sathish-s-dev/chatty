import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { cn } from '../utils/cn';

const Button = ({ text, buttonStyles, textStyles, ...restProps }) => {
	return (
		<TouchableOpacity
			{...restProps}
			className={cn('', buttonStyles)}>
			<Text className={cn('', textStyles)}>{text}</Text>
		</TouchableOpacity>
	);
};

export default Button;
