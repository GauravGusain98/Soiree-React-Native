import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: '20%'
	},
	layout: {
		padding: 10,
		marginTop: 10,
		flex: 1
	},
	instruction: {
		color: 'purple',
		fontSize: 20,
		marginLeft: 10,
		marginTop: 10
	},
	input: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginTop: 15,
		fontSize: 15,
		padding: 10
	},
	button: {
		width: '35%',
		backgroundColor: 'rgb(43, 194, 83)',
		alignSelf: 'center',
		borderRadius: 10,
		padding: 10,
		marginTop: 10
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white'
	},
	error: {
		color: 'red',
		marginLeft: 10,
		fontSize: 18
	}
});
const Verification = ({ navigation, route }) => {
	const adminEmail = route.params.email;
	const adminPassword = route.params.password;
	const [ code, setCode ] = useState(null);
	const [ error, setError ] = useState(null);
	const submit = () => {
		console.log(code);
		fetch('http://192.168.29.122/api/mobile-verify', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: adminEmail,
				code: code
			})
		})
			.then((response) => response.json())
			.then((response) => {
				if (!response.status) {
					setError('Wrong Activation code');
				} else {
					navigation.navigate('Homepage', { user: response.user });
				}
			});
	};
	useEffect(() => {}, []);

	return (
		<View style={styles.layout}>
			<Text style={styles.header}>You are successfully Registered</Text>
			<Text style={[ styles.instruction ]}>Please paste the Verification code sent to your mail</Text>
			<TextInput onChangeText={(e) => setCode(e)} style={styles.input} placeholder="Enter verification code" />
			<Text style={styles.error}>{error}</Text>
			<TouchableHighlight style={styles.button} onPress={submit}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableHighlight>
		</View>
	);
};

export default Verification;
