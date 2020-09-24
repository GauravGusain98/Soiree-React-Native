import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

function Header({ navigation }) {
	const styles = StyleSheet.create({
		style: {
			marginTop: 10,
			marginHorizontal: 10
		},
		header1: {
			backgroundColor: 'rgb(89, 102, 110)',
			fontSize: 35,
			color: 'white',
			textAlign: 'center'
		},
		header2: {
			marginTop: 5,
			fontSize: 20,
			textAlign: 'center'
		}
	});

	return (
		<View style={{ marginTop: 15 }}>
			<Text style={[ styles.style, styles.header1 ]}>Soiree</Text>
			<Text style={[ styles.header2 ]}> Welcome Admin</Text>
		</View>
	);
}

export default Header;
