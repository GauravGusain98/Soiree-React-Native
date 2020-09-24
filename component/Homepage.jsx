import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import ShowRequests from './adminHomepageFunctions/ShowRequests';
import ShowFunction from './adminHomepageFunctions/ShowFunction';
import ShowGuests from './adminHomepageFunctions/ShowGuests';
import ShowCancelledRequests from './adminHomepageFunctions/ShowCancelledRequests';
import AddFunction from './adminHomepageFunctions/AddFunction';

const styles = StyleSheet.create({
	layout: {
		padding: 5,
		flex: 1
	},
	header: {
		backgroundColor: 'black',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 25,
		color: 'white',
		textAlign: 'left',
		padding: 10
	},
	greeting: {
		fontSize: 20,
		textAlign: 'center',
		padding: 5,
		marginBottom: 10
	},
	list: {
		marginTop: 5
	},
	logout: {
		width: 70,
		justifyContent: 'center',
		marginVertical: 10,
		backgroundColor: 'purple'
	},
	menu: {
		borderRadius: 5,
		backgroundColor: 'rgb(165, 144, 212)',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	menuButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginVertical: 5,
		backgroundColor: 'rgb(12, 181, 207)',
		borderRadius: 10,
		marginHorizontal: 5
	},
	menuButtonText: {
		textAlign: 'center',
		color: 'white'
	}
});

// const Homepage = ({ navigation, route }) => {
// 	const user = route.params.user;
const Homepage = ({ navigation }) => {
	const [ menu, setMenu ] = useState({
		showRequests: false,
		showFunction: false,
		showGuests: false,
		showCancelledRequests: false,
		addFunction: false
	});

	return (
		<View style={{ flex: 1, marginTop: '5%' }}>
			<View style={[ styles.header ]}>
				<Text style={[ styles.title ]}>ColoredCow</Text>
				<TouchableHighlight style={[ styles.logout ]} onPress={() => navigation.navigate('SignIn')}>
					<Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
				</TouchableHighlight>
			</View>
			<View style={styles.layout}>
				{/* <Text style={[ styles.greeting ]} numberOfLines={1}>
					Hello {user.name}
				</Text> */}
				<Text style={[ styles.greeting ]} numberOfLines={1}>
					Hello Gaurav Gusain
				</Text>

				<View style={[ styles.menu ]}>
					<TouchableHighlight
						style={[ styles.menuButton ]}
						onPress={() =>
							setMenu({
								showRequests: !menu.showRequests,
								showFunction: false,
								showGuests: false,
								showCancelledRequests: false,
								addFunction: false
							})}
					>
						<Text style={[ styles.menuButtonText ]}>Requests</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[ styles.menuButton ]}
						onPress={() =>
							setMenu({
								showRequests: false,
								showFunction: !menu.showFunction,
								showGuests: false,
								showCancelledRequests: false,
								addFunction: false
							})}
					>
						<Text style={[ styles.menuButtonText ]}>Functions</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[ styles.menuButton ]}
						onPress={() =>
							setMenu({
								showRequests: false,
								showFunction: false,
								showGuests: false,
								showCancelledRequests: false,
								addFunction: !menu.addFunction
							})}
					>
						<Text style={[ styles.menuButtonText ]}>Add Function</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[ styles.menuButton ]}
						onPress={() =>
							setMenu({
								showRequests: false,
								showFunction: false,
								showGuests: !menu.showGuests,
								showCancelledRequests: false,
								addFunction: false
							})}
					>
						<Text style={[ styles.menuButtonText ]}>Guest</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[ styles.menuButton ]}
						onPress={() =>
							setMenu({
								showRequests: false,
								showFunction: false,
								showGuests: false,
								showCancelledRequests: !menu.showCancelledRequests,
								addFunction: false
							})}
					>
						<Text style={[ styles.menuButtonText ]}>Cancelled Requests</Text>
					</TouchableHighlight>
				</View>
				{menu.showRequests ? <ShowRequests /> : null}
				{menu.showFunction ? <ShowFunction /> : null}
				{menu.showGuests ? <ShowGuests /> : null}
				{menu.showCancelledRequests ? <ShowCancelledRequests /> : null}
				{menu.addFunction ? <AddFunction /> : null}
			</View>
		</View>
	);
};

export default Homepage;
