import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
	name: {
		fontWeight: 'bold',
		color: 'white',
		flex: 2
	},
	listHead: {
		padding: 5,
		backgroundColor: 'rgb(73, 79, 74)',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	statusButton: {
		width: 'auto',
		padding: 5,
		borderRadius: 15,
		marginHorizontal: 5
	},
	statusButtonContainer: {
		flexDirection: 'row'
	},
	acceptButton: {
		backgroundColor: 'rgb(14, 179, 42)'
	},
	rejectButton: {
		backgroundColor: 'rgb(201, 51, 46)'
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

const ShowRequests = () => {
	const [ data, setData ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(null);
	const [ buttonDiv, setButtonDiv ] = useState([]);
	let guestDetails = [];
	let arr = [];
	let temp = [];
	const useFetch = () => {
		fetch('http://192.168.29.121/api/mobile-guest-requests', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setData(response);
				response.map((item, index) => {
					arr.push(
						<View key={index} style={[ styles.statusButtonContainer ]}>
							<TouchableHighlight
								onPress={() => changeStatus('approve', item.email, index)}
								style={[ styles.acceptButton, styles.statusButton ]}
							>
								<Text style={styles.buttonText}>Accept</Text>
							</TouchableHighlight>
							<TouchableHighlight
								onPress={() => changeStatus('disapprove', item.email, index)}
								style={[ styles.rejectButton, styles.statusButton ]}
							>
								<Text style={styles.buttonText}>Reject</Text>
							</TouchableHighlight>
						</View>
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
		fetch('http://192.168.29.121/api/mobile-confirm-requests', {
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
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		useFetch();
	}, []);

	const renderItem = ({ item, index }) => {
		guestDetails[index] === undefined
			? guestDetails.push(
					<View>
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
						{item.name}
					</Text>
					{buttonDiv[index]}
				</View>
				{index === currentIndex ? guestDetails[index] : null}
			</View>
		);
	};

	return (
		<View>
			<FlatList
				style={[ styles.list ]}
				data={data}
				extraData={buttonDiv}
				renderItem={renderItem}
				keyExtractor={(item) => item.email}
			/>
		</View>
	);
};

export default ShowRequests;
