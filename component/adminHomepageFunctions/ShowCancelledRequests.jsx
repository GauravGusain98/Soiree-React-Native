import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
	name: {
		fontWeight: 'bold',
		color: 'white',
		flex: 3
	},
	listHead: {
		padding: 5,
		backgroundColor: 'rgb(73, 79, 74)',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	changeButton: {
		width: 'auto',
		padding: 5,
		borderRadius: 15,
		marginHorizontal: 5,
		backgroundColor: 'rgb(201, 51, 46)',
		alignItems: 'center'
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		marginTop: -4
	},
	innerText: {
		marginTop: 5,
		marginLeft: 20
	}
});

const ShowCancelledRequests = () => {
	const [ data, setData ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(null);
	const [ buttonDiv, setButtonDiv ] = useState([]);
	var details = [];
	let arr = [];
	let temp = [];

	const useFetch = () => {
		fetch('http://192.168.29.122/api/mobile-cancelled-requests', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((response) => {
				setData(response);
				console.log(response);
				response.map((item, index) => {
					arr.push(
						<TouchableHighlight
							key={index}
							onPress={() => changeStatus('approve', item.email, index)}
							style={[ styles.changeButton, styles.statusButton ]}
						>
							<Text style={styles.buttonText}>change</Text>
						</TouchableHighlight>
					);
				});
				temp = arr.slice();
				setButtonDiv(arr);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const changeStatus = (status, email, index) => {
		console.log(status, email);
		temp = temp.slice();
		temp[index] = (
			<Text key={index} style={{ color: 'white', paddingRight: 10 }}>
				Loading...
			</Text>
		);
		setButtonDiv(temp);
		fetch('http://192.168.29.122/api/mobile-confirm-requests', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				value: status,
				email: email
			})
		})
			.then((response) => response.json())
			.then((response) => {
				temp = temp.slice();
				temp[index] = (
					<Text key={index} style={{ color: 'white', paddingRight: 10 }}>
						{response}
					</Text>
				);
				setButtonDiv(temp);
				console.log(response);
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		useFetch();
	}, []);

	const renderItem = ({ item, index }) => {
		details[index] === undefined
			? details.push(
					<View key={index}>
						<Text style={styles.innerText}>Email: {item.email}</Text>
						<Text style={styles.innerText}>Contact: {item.phone}</Text>
						<Text style={styles.innerText}>Message: {item.message == ' ' ? 'NA' : item.message}</Text>
					</View>
				)
			: null;
		return (
			<View>
				<View style={styles.listHead}>
					<Text
						onStartShouldSetResponder={() => setCurrentIndex(currentIndex === index ? null : index)}
						style={[ styles.name ]}
					>
						{index + 1}. {item.name}
					</Text>
					{buttonDiv[index]}
				</View>
				{index === currentIndex ? details[currentIndex] : null}
			</View>
		);
	};

	return (
		<View>
			<FlatList data={data} extraData={buttonDiv} renderItem={renderItem} keyExtractor={(item) => item.email} />
		</View>
	);
};

export default ShowCancelledRequests;
