import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './component/navigation';

export default function App() {
	return (
		<NavigationContainer>
			<Home />
		</NavigationContainer>
	);
}
