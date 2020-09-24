import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableHighlight } from 'react-native';
import Header from './Header';

function LoginForm({ navigation }) {
	const styles = StyleSheet.create({
		style: {
			marginTop: 20,
			marginHorizontal: 10
		},
		border: {
			borderStyle: 'solid',
			borderColor: 'black',
			borderWidth: 1,
			borderRadius: 5
		},
		input: {
			marginVertical: 5,
			padding: 10
		},
		button: {
			marginTop: 10,
			width: '50%',
			padding: 10,
			borderRadius: 10,
			backgroundColor: 'rgb(27, 177, 227)'
		},
		error: {
			color: 'red',
			fontWeight: 'bold',
			marginTop: 5,
			marginBottom: 10
		}
	});

	const [ admin, setAdmin ] = useState({
		email: '',
		password: '',
		user: null,
		verify: false,
		error: ''
	});

	useEffect(() => {
		if (admin.verify == true) {
			console.log(admin.user);
			navigation.navigate('Homepage', { user: admin.user });
		} else if (admin.verify == 'not') {
			navigation.navigate('Verification', { email: admin.email, password: admin.password });
		}
	});

	const login = () => {
		// if (admin.email.trim() == '' || admin.password == '') {
		// 	return setAdmin({ ...admin, error: 'Please fill all credentials.' });
		// } else {
		fetch('http://192.168.29.122/api/mobile-login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Email: admin.email,
				password: admin.password
			})
		})
			.then((response) => response.json())
			.then((resp) => {
				console.log(resp);
				setAdmin({ ...admin, verify: resp.verify, error: resp.error, user: resp.user });
			})
			.catch((error) => {
				console.log(error);
			});
		// }
	};

	return (
		<ScrollView>
			<Header />
			<View style={styles.style}>
				<Text>Email</Text>
				<TextInput
					name="email"
					onChangeText={(e) => {
						setAdmin({ ...admin, verify: false, email: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Email."
				/>
				<Text>Password</Text>
				<TextInput
					name="password"
					secureTextEntry={true}
					onChangeText={(e) => {
						setAdmin({ ...admin, verify: false, password: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Password."
				/>
				{admin.error != '' ? <Text style={styles.error}>{admin.error}</Text> : null}

				<Button onPress={login} style={styles.button} title="submit" />
			</View>
			<TouchableHighlight
				style={[ styles.button, { alignSelf: 'center' } ]}
				onPress={() => navigation.navigate('Register')}
			>
				<Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>New Admin</Text>
			</TouchableHighlight>
		</ScrollView>
	);
}

export default LoginForm;
