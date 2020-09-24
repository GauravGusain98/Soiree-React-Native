import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import Registered from './RegistrationForm';
import Verification from './Verification';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Home = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
			<Stack.Screen name="SignIn" component={LoginForm} options={{ headerShown: false }} />
			<Stack.Screen name="Register" component={Registered} options={{ headerShown: false }} />
			<Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
		</Stack.Navigator>
		/* <Drawer.Navigator>
			<Drawer.Screen name="SignIn" component={LoginForm} options={{ headerShown: false }} />
			<Drawer.Screen name="Register" component={Registered} options={{ headerShown: false }} />
			<Drawer.Screen name="Homepage" component={Homepage} />
		</Drawer.Navigator> */
	);
};

export default Home;
