import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableHighlight } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
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
	button: {
		width: 100,
		padding: 10,
		borderRadius: 15,
		marginVertical: 5,
		marginLeft: 25,
		backgroundColor: 'rgb(201, 51, 46)',
		alignItems: 'center'
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		marginTop: -4
	},
	saveButton: {
		width: 100,
		padding: 10,
		borderRadius: 15,
		marginVertical: 5,
		marginLeft: 10,
		backgroundColor: 'rgb(14, 179, 42)',
		alignItems: 'center'
	},
	buttonContainer: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start'
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
	error: {
		color: 'red',
		fontWeight: 'bold',
		marginTop: 5,
		paddingHorizontal: 25
	}
});

const AddFunction = () => {
	const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
	const [ isTimePickerVisible, setTimePickerVisibility ] = useState(false);
	const [ isEventTimePickerVisible, setEventTimePickerVisibility ] = useState(false);
	const [ timePickerindex, setTimePickerIndex ] = useState(null);
	const [ error, setError ] = useState(null);
	const eventNameHandler = (name, key) => {
		functionData.eventData[key].eventName = name;
		setFunctionData({ ...functionData, eventData: functionData.eventData });
	};

	const eventTimeHandler = (time, key) => {
		const hour = time.getHours();

		const hh = hour > 12 ? (hour - 12).toString() : hour.toString();
		const mmss = time.toTimeString().substring(2, 8);
		const meridian = hour > 12 ? ' PM' : ' AM';
		const timeWanted = hh + mmss + meridian;

		functionData.eventData[key].eventTime = time.toTimeString().substring(0, 8);
		functionData.eventData[key].eventTimeConverted = timeWanted;
		setFunctionData({ ...functionData, eventData: functionData.eventData });
		setEventTimePickerVisibility(false);
	};

	const [ functionData, setFunctionData ] = useState({
		name: '',
		date: '',
		time: '',
		timeReal: '',
		eventData: []
	});

	const validate = () => {
		setError(null);
		setTimeout(function() {
			let isFilledFlag = true;
			if (functionData.name.trim() == '' || functionData.date == '' || functionData.time == '') {
				isFilledFlag = false;
			} else {
				functionData.eventData.map((item) => {
					console.log(item.eventName);
					if (item.eventName.trim() == '' || item.eventTime == '') {
						isFilledFlag = false;
					}
				});
			}
			if (isFilledFlag == false) {
				setError('Please fill all the details');
			} else {
				save();
			}
		}, 200);
	};

	const save = () => {
		let str = '';
		let str1 = JSON.stringify({
			functionName: functionData.name,
			functionDate: functionData.dateReal,
			functionTime: functionData.timeReal,
			count: functionData.eventData.length
		});
		for (let i = 0; i < functionData.eventData.length; i++) {
			if (i + 1 == functionData.eventData.length) {
				str +=
					'"eventName_' +
					(i + 1) +
					'"' +
					':"' +
					functionData.eventData[i].eventName +
					'",' +
					'"eventTime_' +
					(i + 1) +
					'":"' +
					functionData.eventData[i].eventTime +
					'"}';
			} else {
				str +=
					'"eventName_' +
					(i + 1) +
					'":"' +
					functionData.eventData[i].eventName +
					'",' +
					'"eventTime_' +
					(i + 1) +
					'":"' +
					functionData.eventData[i].eventTime +
					'",';
			}
		}
		let str2 = functionData.eventData.length == 0 ? str1 : str1.substring(0, str1.length - 1) + ', ' + str;
		console.log(str2);
		fetch('http://192.168.29.122/api/add-functions', {
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
					setError('An Event is already Booked for the given Date.');
				} else {
					alert('event Successfully Saved.');
				}
				console.log(resp);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const eventTimePickerVisibility = (index) => {
		setEventTimePickerVisibility(true);
		setTimePickerIndex(index);
	};

	const addEvent = () => {
		setFunctionData({
			...functionData,
			eventData: [ ...functionData.eventData, { eventName: '', eventTime: '', eventTimeConverted: '' } ]
		});
	};

	const handleConfirmDate = (date) => {
		var month =
			parseInt(date.getMonth()) + 1 <= 9 ? '0' + (parseInt(date.getMonth()) + 1) : parseInt(date.getMonth()) + 1;
		var day = parseInt(date.getDate()) <= 9 ? '0' + date.getDate() : date.getDate();
		var str = date.getFullYear() + '-' + month + '-' + day;
		setFunctionData({ ...functionData, date: date.toDateString(), dateReal: str });
		console.log(str);
		setDatePickerVisibility(false);
	};

	const handleConfirmTime = (time) => {
		const hour = time.getHours();

		const hh = hour > 12 ? (hour - 12).toString() : hour.toString();
		const mmss = time.toTimeString().substring(2, 8);
		const meridian = hour > 12 ? ' PM' : ' AM';
		const timeWanted = hh + mmss + meridian;

		setFunctionData({
			...functionData,
			time: timeWanted,
			timeReal: time.toTimeString().substring(0, 8)
		});
		setTimePickerVisibility(false);
	};

	const deleteEvent = (index) => {
		var temp = [ ...functionData ];
		temp.eventData.splice(index, 1);
		setFunctionData([ ...temp ]);
	};

	return (
		<ScrollView>
			<View style={{ marginTop: 10, alignItems: 'center' }}>
				<TextInput
					multiline={true}
					numberOfLines={1}
					style={styles.input}
					placeholder="Function Name"
					onChangeText={(e) => {
						setFunctionData({ ...functionData, name: e });
					}}
				/>
				<TextInput
					multiline={true}
					numberOfLines={1}
					style={styles.input}
					placeholder="Function Date"
					value={functionData.date}
					onTouchEnd={() => setDatePickerVisibility(true)}
				/>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={handleConfirmDate}
					onCancel={() => setDatePickerVisibility(false)}
				/>
				<TextInput
					multiline={true}
					numberOfLines={1}
					style={styles.input}
					placeholder="Function Time"
					value={functionData.time}
					onTouchEnd={() => setTimePickerVisibility(true)}
				/>
				<DateTimePickerModal
					isVisible={isTimePickerVisible}
					mode="time"
					onConfirm={handleConfirmTime}
					onCancel={() => setDatePickerVisibility(false)}
				/>
				{functionData.eventData.map((data, key) => {
					return (
						<View style={{ alignItems: 'center', width: '100%' }} key={key}>
							<View style={styles.eventHeader}>
								<Text style={styles.eventHeaderText}>Event {key + 1}</Text>
								<TouchableHighlight onPress={() => deleteEvent(key)} style={styles.button}>
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
									eventNameHandler(name, key);
								}}
							/>
							<TextInput
								multiline={true}
								numberOfLines={1}
								style={styles.input}
								placeholder="Event Time"
								value={data.eventTimeConverted}
								onTouchEnd={() => eventTimePickerVisibility(key)}
							/>
							<DateTimePickerModal
								isVisible={timePickerindex == key ? isEventTimePickerVisible : null}
								mode="time"
								onConfirm={(time) => eventTimeHandler(time, key)}
								onCancel={() => setEventTimePickerVisibility(false)}
							/>
						</View>
					);
				})}
			</View>
			{error != null ? <Text style={styles.error}>{error}</Text> : null}

			<View style={styles.buttonContainer}>
				<TouchableHighlight onPress={() => addEvent()} style={styles.button}>
					<Text style={styles.buttonText}>Add Event</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => validate()} style={styles.saveButton}>
					<Text style={[ styles.buttonText ]}>Save</Text>
				</TouchableHighlight>
			</View>
		</ScrollView>
	);
};

export default AddFunction;
