import { TextInput } from 'react-native';
import React from 'react';
import { cn } from '../utils/cn';

const Input = ({ placeholder, handleChange, className, value, secure }) => {
	return (
		<TextInput
			value={value}
			className={cn(
				'flex-1 text-slate-100 placeholder-slate-600 p-3 rounded-md text-lg',
				className
			)}
			placeholderTextColor='rgb(71 85 105)'
			onChangeText={handleChange}
			placeholder={placeholder}
			secureTextEntry={secure}
		/>
	);
};

export default Input;
