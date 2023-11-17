import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import ProfileScreen from '../screens/ProfileScreen';
import { Feather } from '@expo/vector-icons';
import BackgroundFetchScreen from '../screens/Background';

const Tab = createMaterialTopTabNavigator();

export function TopTabNavigator() {
	const config = (icon) => {
		return {
			tabBarIcon: ({ focused, color, size }) => (
				<Feather
					name={`${icon}`}
					size={24}
					color={color}
					className='text-slate-500'
				/>
			),
			tabBarContentContainerStyle: {
				flexDirection: 'row',
				backgroundColor: 'rgb(2 6 23)',
			},
			tabBarShowLabel: false,
		};
	};
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: 'red',
					borderBottomColor: '#fff',
					borderBottomWidth: 6,
					borderBottomStartRadius: 10,
					borderBottomEndRadius: 10,
				},
				tabBarActiveTintColor: '#fff',
				tabBarInactiveTintColor: 'rgb(100 116 139 )',

				tabBarContentContainerStyle: {},
			}}>
			<Tab.Screen
				name='main'
				component={HomeScreen}
				options={config('home')}
			/>
			<Tab.Screen
				name='background'
				component={BackgroundFetchScreen}
				options={config('settings')}
			/>
			<Tab.Screen
				name='profile'
				component={ProfileScreen}
				options={config('user')}
			/>
		</Tab.Navigator>
	);
}
