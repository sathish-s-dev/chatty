import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ size, icon, ...restProps }) => {
	return (
		<TouchableOpacity
			{...restProps}
			className='flex-row items-center space-x-2 border border-slate-600 rounded-lg p-2'>
			<Ionicons
				name={icon}
				size={size || 24}
				color='rgb(226 232 240)'
			/>
		</TouchableOpacity>
	);
};

export default IconButton;
