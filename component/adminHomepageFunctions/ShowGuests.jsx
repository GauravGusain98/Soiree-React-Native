import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	namePhone: {
		fontWeight: 'bold',
		color: 'white'
	},
	listHead: {
		padding: 5,
		backgroundColor: 'rgb(73, 79, 74)',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	innerText: {
		marginTop: 5,
		marginLeft: 20
	}
});

const ShowGuests = () => {
	const [ data, setData ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(null);
	var emailList = [];
	const useFetch = () => {
		fetch('http://192.168.29.121/api/mobile-guests', {
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
		emailList[index] === undefined
			? emailList.push(
					<View key={index}>
						<Text style={styles.innerText}>Email: {item.email}</Text>
					</View>
				)
			: null;
		return (
			<View>
				<View
					style={styles.listHead}
					onStartShouldSetResponder={() => setCurrentIndex(currentIndex === index ? null : index)}
				>
					<Text style={[ styles.namePhone ]}>
						{index + 1}. {item.name}
					</Text>
					<Text style={[ styles.namePhone ]}>{item.phone}</Text>
				</View>
				{index === currentIndex ? emailList[index] : null}
			</View>
		);
	};
	return <FlatList style={[ styles.list ]} data={data} renderItem={renderItem} keyExtractor={(item) => item.email} />;
};

export default ShowGuests;
