import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
	editButton: {
		backgroundColor: 'rgb(201, 51, 46)',
		width: 60,
		padding: 5,
		borderRadius: 15,
		marginHorizontal: 5
	},
	statusButtonContainer: {
		flexDirection: 'row'
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

const ShowFunction = () => {
	let i;
	const [ data, setData ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(null);

	const useFetch = () => {
		fetch('http://192.168.29.121/api/mobile-functions', {
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
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		useFetch();
	}, []);

	const renderItem = ({ item, index }) => {
		var events = [];

		for (let i = 1; item['event' + i] != undefined; i++) {
			events.push(
				<View key={i}>
					<Text style={styles.innerText}>
						Event{i}: {item['event' + i]}
					</Text>
					<Text style={styles.innerText}>Time: {item['eventTime' + i]}</Text>
				</View>
			);
		}
		return (
			<View>
				<View style={styles.listHead}>
					<Text
						onStartShouldSetResponder={() => setCurrentIndex(currentIndex === index ? null : index)}
						style={[ styles.name ]}
					>
						{index + 1}. {item.Name}
					</Text>

					<TouchableHighlight style={[ styles.editButton, styles.statusButton ]}>
						<Text style={styles.buttonText}>Edit</Text>
					</TouchableHighlight>
				</View>
				{currentIndex === index ? (
					<View>
						<Text style={styles.innerText}>Date: {item.Date}</Text>
						<Text style={styles.innerText}>Time: {item.Time}</Text>
						{events}
					</View>
				) : null}
			</View>
		);
	};
	return <FlatList style={[ styles.list ]} data={data} renderItem={renderItem} keyExtractor={(item) => item.Date} />;
};

export default ShowFunction;
