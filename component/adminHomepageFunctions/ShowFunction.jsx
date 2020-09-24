import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, EdgeInsetsPropType } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
		width: 'auto',
		paddingVertical: 5,
		paddingHorizontal: 10,
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
	},
	input: {
		textAlign: 'center',
		width: '90%',
		fontSize: 20,
		marginTop: 10,
		marginLeft: 10,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 10,
		padding: 5
	},
	editButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	eventHeader: {
		marginLeft: 10,
		width: '90%',
		backgroundColor: 'black',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10,
		marginTop: 10
	},
	eventHeaderText: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		color: 'white',
		textAlign: 'center',
		fontSize: 15,
		marginTop: 5
	},
	deleteEventButton: {
		width: 100,
		padding: 10,
		borderRadius: 15,
		marginVertical: 5,
		marginLeft: 25,
		backgroundColor: 'rgb(201, 51, 46)',
		alignItems: 'center'
	},
	addEventButton: {
		width: 100,
		padding: 10,
		borderRadius: 15,
		marginVertical: 5,
		backgroundColor: 'purple',
		marginLeft: 25
	}
});

const ShowFunction = () => {
	const [ data, setData ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(null);
	const [ edit, setEdit ] = useState(false);
	const [ editIndex, setEditIndex ] = useState(null);
	const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
	const [ isTimePickerVisible, setTimePickerVisibility ] = useState(false);
	const [ isEventTimePickerVisible, setEventTimePickerVisibility ] = useState(false);
	const [ timePickerindex, setTimePickerIndex ] = useState(null);
	const [ functionData, setFunctionData ] = useState(null);
	const [ referenceData, setReferenceData ] = useState(null);
	const [ error, setError ] = useState(null);

	const eventTimePickerVisibility = (index) => {
		setEventTimePickerVisibility(true);
		setTimePickerIndex(index);
	};

	const addEvent = (index) => {
		console.log(functionData[index]);
		var temp = [ ...functionData ];
		temp[index].eventData = [ ...temp[index].eventData, { eventName: '', eventTime: '' } ];
		setFunctionData([ ...temp ]);
	};

	const handleConfirmDate = (date, index) => {
		var month = parseInt(date.getMonth()) < 9 ? '0' + date.getMonth() : date.getMonth();
		var day = parseInt(date.getDate()) < 9 ? '0' + date.getDate() : date.getDate();
		var str = date.getFullYear() + '-' + month + '-' + day;
		updateData(str, index, 'Date');
		// setFunctionData({ ...functionData, date: date.toDateString(), dateReal: str });
		setDatePickerVisibility(false);
	};

	const handleConfirmTime = (time, index) => {
		const hour = time.getHours();

		const hh = hour > 12 ? (hour - 12).toString() : hour.toString();
		const mmss = time.toTimeString().substring(2, 8);
		const meridian = hour > 12 ? ' PM' : ' AM';
		const timeWanted = hh + mmss + meridian;
		const timeReal = time.toTimeString().substring(0, 8);
		updateData(timeReal, index, 'Time');
		// setFunctionData({
		// 	...functionData,
		// 	time: timeWanted,
		// 	timeReal: time.toTimeString().substring(0, 8)
		// });
		setTimePickerVisibility(false);
	};

	const deleteEvent = (index, key) => {
		var temp = [ ...functionData ];
		temp[index].eventData.splice(key, 1);
		setFunctionData([ ...temp ]);
	};

	const useFetch = async () => {
		fetch('http://192.168.29.122/api/mobile-functions', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((response) => {
				var tempArray = [];
				response.map((item, index) => {
					tempArray.push({
						Name: item.Name,
						Date: item.Date,
						Time: item.Time,
						oldDate: item.Date,
						eventData: []
					});
					for (let i = 1; response[index]['event' + i] != undefined; i++) {
						tempArray[index].eventData = [
							...tempArray[index].eventData,
							{ eventName: response[index]['event' + i], eventTime: response[index]['eventTime' + i] }
						];
					}
				});

				console.log(tempArray);
				console.log(response);
				setData(JSON.parse(JSON.stringify(response)));
				setFunctionData(JSON.parse(JSON.stringify(tempArray)));
				setReferenceData(JSON.parse(JSON.stringify(tempArray)));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const updateData = (e, index, prop) => {
		var temp = [ ...functionData ];
		temp[index][prop] = e;
		setFunctionData([ ...temp ]);
		console.log(functionData);
	};

	const eventNameHandler = (name, key, index) => {
		var temp = [ ...functionData ];
		temp[index].eventData[key].eventName = name;
		setFunctionData(temp);
		console.log(functionData);
	};

	const eventTimeHandler = (time, key, index) => {
		// const hour = time.getHours();

		// const hh = hour > 12 ? (hour - 12).toString() : hour.toString();
		// const mmss = time.toTimeString().substring(2, 8);
		// const meridian = hour > 12 ? ' PM' : ' AM';
		// const timeWanted = hh + mmss + meridian;

		var temp = [ ...functionData ];
		temp[index].eventData[key].eventTime = time.toTimeString().substring(0, 8);
		// functionData[index].eventData[key].eventTimeConverted = timeWanted;
		setFunctionData([ ...temp ]);
		setEventTimePickerVisibility(false);
		console.log(functionData);
	};

	const validate = (index) => {
		setError(null);
		setTimeout(function() {
			let isFilledFlag = true;
			if (
				functionData[index].Name.trim() == '' ||
				functionData[index].Date == '' ||
				functionData[index].Time == ''
			) {
				isFilledFlag = false;
			} else {
				functionData[index].eventData.map((item) => {
					console.log(item.eventName);
					if (item.eventName.trim() == '' || item.eventTime == '') {
						isFilledFlag = false;
					}
				});
			}
			if (isFilledFlag == false) {
				setError('Please fill all the details');
			} else {
				save(index);
			}
		}, 200);
	};

	const save = (index) => {
		let str = '';
		let str1 = JSON.stringify({
			name: functionData[index].Name,
			date: functionData[index].Date,
			time: functionData[index].Time,
			oldDate: functionData[index].oldDate,
			count: functionData[index].eventData.length
		});
		for (let i = 0; i < functionData[index].eventData.length; i++) {
			if (i + 1 == functionData[index].eventData.length) {
				str +=
					'"event' +
					(i + 1) +
					'"' +
					':"' +
					functionData[index].eventData[i].eventName +
					'",' +
					'"eventtime' +
					(i + 1) +
					'":"' +
					functionData[index].eventData[i].eventTime +
					'"}';
			} else {
				str +=
					'"event' +
					(i + 1) +
					'":"' +
					functionData[index].eventData[i].eventName +
					'",' +
					'"eventtime' +
					(i + 1) +
					'":"' +
					functionData[index].eventData[i].eventTime +
					'",';
			}
		}
		let str2 = functionData[index].eventData.length == 0 ? str1 : str1.substring(0, str1.length - 1) + ', ' + str;
		console.log(str2);
		fetch('http://192.168.29.122/api/save-edited-function', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: str2
		})
			.then((response) => response.json())
			.then((resp) => {
				if (resp.code == 500) {
					setError('A Function is already Booked for the given Date.');
				} else {
					alert('Function Successfully Edited.');
					setReferenceData(JSON.parse(JSON.stringify(functionData)));
				}
				console.log(resp);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteFunction = (index) => {
		fetch('http://192.168.29.122/api/delete-function', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: functionData[index].oldDate
			})
		})
			.then((response) => response.json())
			.then((resp) => {
				if (resp.code == 500) {
					setError('A Function is already Booked for the given Date.');
				} else {
					alert('Function Successfully Edited.');
					setReferenceData(JSON.parse(JSON.stringify(functionData)));
				}
				console.log(resp);
			})
			.catch((error) => {
				console.log(error);
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

		return edit && editIndex == index ? (
			<View>
				<View style={styles.listHead}>
					<Text onStartShouldSetResponder={() => setEditIndex(index)} style={[ styles.name ]} />
					<View style={styles.editButtonsContainer}>
						<TouchableHighlight
							style={[ styles.editButton, styles.statusButton, { backgroundColor: 'rgb(43, 194, 83)' } ]}
							onPress={() => {
								setEdit(false);
								setEditIndex(index);
								validate(index);
							}}
						>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={[ styles.editButton, styles.statusButton ]}
							onPress={() => {
								setEdit(false);
								setEditIndex(index);
								deleteFunction(index);
							}}
						>
							<Text style={styles.buttonText}>Delete</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={[ styles.editButton, styles.statusButton ]}
							onPress={() => {
								setEdit(false);
								setEditIndex(index);
							}}
						>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableHighlight>
					</View>
				</View>
				<View style={{ marginTop: 10, alignItems: 'center' }}>
					<TextInput
						multiline={true}
						numberOfLines={1}
						style={styles.input}
						placeholder="Function Name"
						onChangeText={(e) => updateData(e, index, 'Name')}
						value={functionData[index].Name}
					/>
					<TextInput
						multiline={true}
						numberOfLines={1}
						style={styles.input}
						placeholder="Function Date"
						value={functionData[index].Date}
						onTouchEnd={() => setDatePickerVisibility(true)}
					/>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={(date) => handleConfirmDate(date, index)}
						onCancel={() => setDatePickerVisibility(false)}
					/>
					<TextInput
						multiline={true}
						numberOfLines={1}
						style={styles.input}
						placeholder="Function Time"
						value={functionData[index].Time}
						onTouchEnd={() => setTimePickerVisibility(true)}
					/>
					<DateTimePickerModal
						isVisible={isTimePickerVisible}
						mode="time"
						onConfirm={(time) => handleConfirmTime(time, index)}
						onCancel={() => setTimePickerVisibility(false)}
					/>
					{functionData[index].eventData.map((data, key) => {
						return (
							<View style={{ alignItems: 'center', width: '100%' }} key={key}>
								<View style={styles.eventHeader}>
									<Text style={styles.eventHeaderText}>Event {key + 1}</Text>
									<TouchableHighlight
										onPress={() => deleteEvent(index, key)}
										style={styles.deleteEventButton}
									>
										<Text style={styles.buttonText}>Delete</Text>
									</TouchableHighlight>
								</View>
								<TextInput
									multiline={true}
									numberOfLines={1}
									style={styles.input}
									value={data.eventName}
									placeholder="Event Name"
									onChangeText={(name) => {
										eventNameHandler(name, key, index);
									}}
								/>
								<TextInput
									multiline={true}
									numberOfLines={1}
									style={styles.input}
									placeholder="Event Time"
									value={data.eventTime}
									onTouchEnd={() => eventTimePickerVisibility(key)}
								/>
								<DateTimePickerModal
									isVisible={timePickerindex == key ? isEventTimePickerVisible : null}
									mode="time"
									onConfirm={(time) => eventTimeHandler(time, key, index)}
									onCancel={() => setEventTimePickerVisibility(false)}
								/>
							</View>
						);
					})}
				</View>
				<TouchableHighlight onPress={() => addEvent(index)} style={styles.addEventButton}>
					<Text style={styles.buttonText}>Add Event</Text>
				</TouchableHighlight>
			</View>
		) : (
			<View>
				<View style={styles.listHead}>
					<Text
						onStartShouldSetResponder={() => {
							setEdit(false);
							setEditIndex(null);
							setCurrentIndex(currentIndex === index ? null : index);
						}}
						style={[ styles.name ]}
					>
						{index + 1}. {item.Name}
					</Text>

					<TouchableHighlight
						style={[ styles.editButton, styles.statusButton ]}
						onPress={() => {
							setFunctionData(JSON.parse(JSON.stringify(referenceData)));
							setEdit(true);
							setEditIndex(index);
							setCurrentIndex(index);
						}}
					>
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
	return (
		<FlatList
			style={[ styles.list ]}
			data={data}
			extraData={functionData}
			renderItem={renderItem}
			keyExtractor={(item) => item.Date}
		/>
	);
};

export default ShowFunction;
