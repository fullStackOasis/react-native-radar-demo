import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class MainScreen extends Component {
	render() {
		const { navigation } = this.props;
		return (<View style={
			[{ justifyContent: 'center' },
			{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'space-around',
				padding: 10
			}]
		}>
			<Button title={'Demo Efficient Tracking'} style={{flex: 1}} color='green' onPress={() => this.props.navigation.navigate('Maps')} tracking='EFFICIENT' />
			<Button title={'Demo Responsive Tracking'} style={{flex: 1}} color='blue' onPress={() => this.props.navigation.navigate('Maps')} tracking='RESPONSIVE' />
			<Button title={'Demo Continuous Tracking'} style={{flex: 1}} color='red' onPress={() => this.props.navigation.navigate('Maps')} tracking='CONTINUOUS' />
		</View>);
	}
}
