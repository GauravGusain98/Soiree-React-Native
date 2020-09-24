import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableHighlight } from 'react-native';
import Header from './Header';

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

const RegistrationForm = ({ navigation }) => {
	const [ admin, setAdmin ] = useState({
		name: '',
		email: '',
		password1: '',
		password2: '',
		error: null
	});

	const auth = () => {
		setAdmin({ ...admin, error: null });
		if (admin.name.trim() == '' || admin.email.trim() == '' || admin.password1 == '' || admin.password2 == '') {
			return setAdmin({ ...admin, error: 'Please fill all Credentials.' });
		} else if (admin.password1 != admin.password2) {
			return setAdmin({ ...admin, error: "Password didn't match" });
		} else {
			submit();
		}
	};

	const submit = () => {
		fetch('http://192.168.29.122/api/mobile-register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: admin.name,
				email: admin.email,
				password: admin.password1
			})
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				if (response.status == true) {
					navigation.navigate('Verification', { email: admin.email, password: admin.password1 });
				} else {
					setAdmin({ ...admin, error: 'Wrong Details' });
				}
			});
	};

	return (
		<ScrollView>
			<Header />
			<View style={styles.style}>
				<Text>Name</Text>
				<TextInput
					maxLength={30}
					name="name"
					onChangeText={(e) => {
						setAdmin({ ...admin, name: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Name."
				/>
				<Text>Email</Text>
				<TextInput
					name="email"
					onChangeText={(e) => {
						setAdmin({ ...admin, email: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Email."
				/>
				<Text>Password</Text>
				<TextInput
					name="password"
					secureTextEntry={true}
					onChangeText={(e) => {
						setAdmin({ ...admin, password1: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Password."
				/>
				<Text>Retype-Password</Text>
				<TextInput
					name="password"
					secureTextEntry={true}
					onChangeText={(e) => {
						setAdmin({ ...admin, password2: e });
					}}
					style={[ styles.border, styles.input ]}
					placeholder="Enter Your Password."
				/>
				{admin.error != null ? <Text style={styles.error}>{admin.error}</Text> : null}
				<Button title="Submit" onPress={auth} style={styles.button} title="submit" />
			</View>
			<TouchableHighlight
				style={[ styles.button, { alignSelf: 'center' } ]}
				onPress={() => navigation.navigate('SignIn')}
			>
				<Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Already a user</Text>
			</TouchableHighlight>
		</ScrollView>
	);
};

export default RegistrationForm;
