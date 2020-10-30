import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Radar from 'react-native-radar';
import Snackbar from 'react-native-snackbar';

const EFFICIENT = 'EFFICIENT';
const RESPONSIVE = 'RESPONSIVE';
const CONTINUOUS = 'CONTINIOUS';

export default class MapsScreen extends Component {

	constructor(props) {
		super(props);
		// Get current time:
		let now = Date.now();
		this.state = {
			nCafes : 120,
			userId : "1",
			description: 'Full Stack Oasis',
			latitude : 44,
			longitude : -71,
			lastTime : now,
			delta : 0
		}
		Radar.setUserId(this.state.userId);
		Radar.setDescription(this.state.description);
	}

	componentDidMount() {
		Radar.getPermissionsStatus().then((status) => {
			console.log('status: ' + status);
			if (status === "DENIED") {
				const BACKGROUND = false;
				// So, ask for foreground permissions?
				Radar.requestPermissions(BACKGROUND);
			} else if (status === "GRANTED_BACKGROUND" || status === "GRANTED_FOREGROUND") {
				this.getLocation();
				Radar.on('location', (result) => {
					console.log(result);
					let now = Date.now();
					let delta = now - this.state.lastTime;
					this.setState({lastTime : now, delta : delta,
						latitude : result.location.latitude,
						longitude : result.location.longitude});
				});
				  
			}
		});
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		Radar.stopTracking();
	}

	getLocation() {
		Radar.getLocation().then((result) => {
			// do something with result.location
			console.log(result);
			this.setState({latitude : result.location.latitude, longitude : result.location.longitude})
		}).catch((err) => {
			// optionally, do something with err
		});
	}

	startTrackingUser(trackingType) {
		this.showSnackBar(trackingType);
		if (trackingType == EFFICIENT) {
			Radar.startTrackingEfficient();
		} else if (trackingType == RESPONSIVE) {
			Radar.startTrackingResponsive();
		} else {
			Radar.startTrackingContinuous();
		}
	}

	showSnackBar(trackingType) {
		let text = 'Tracking ' + (trackingType == EFFICIENT ? 'Efficiently' : 
			trackingType == RESPONSIVE ? 'Responsively' :
			trackingType == CONTINUOUS ? 'Continuously' : '...');
		let lastTime = Math.floor(this.state.delta/1000);
		text = text + (lastTime > 0 ? lastTime + ' seconds ago': '');
		Snackbar.show({
			text: text,
			duration: Snackbar.LENGTH_LONG,
		});
	}

	render() {
		this.startTrackingUser(this.props.tracking);
		let latLng = { latitude: this.state.latitude, longitude: this.state.longitude }
		console.log('render method, latLng = ' + JSON.stringify(latLng));
		let description = 'Zen Cafe';
		let name = 'Zen Cafe';

		return (<View style={
			[{ flex: 1, justifyContent: 'center' },
			{
				flexDirection: 'row',
				justifyContent: 'space-around',
				padding: 10
			}]
		}>
			<MapView style={[{ flex: 1 }]}
				initialRegion={{
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
			}}>
				<Marker key={name} coordinate={latLng}
					title={name} description={description}>
				</Marker>
			</MapView>
		</View>);
	}
}