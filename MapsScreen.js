import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Radar from 'react-native-radar';
import Snackbar from 'react-native-snackbar';
import { EFFICIENT, CONTINUOUS, RESPONSIVE } from './MainScreen';
const MAGIC_LATITUDE = -1000;
export default class MapsScreen extends PureComponent {

	constructor(props) {
		super(props);
		// Get current time:
		let now = Date.now();
		this.state = {
			nCafes : 120,
			userId : "1",
			description: 'Full Stack Oasis',
			latitude : MAGIC_LATITUDE,
			longitude : MAGIC_LATITUDE,
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
				// start listening
				Radar.on('location', (result) => {
					// Example of result that is received:
					// {"location": {"altitude": 194.70001220703125, "latitude": 43.9327101, "longitude": -71.1372923}, "status": "SUCCESS", "stopped": true}
					console.log('	On Location: result');
					console.log(result);
					console.log(JSON.stringify(result.location));
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
		console.log('	componentWillUnmount, stop tracking');
		Radar.stopTracking();
	}

	getLocation() {
		console.log('	getLocation called');
		Radar.getLocation().then((result) => {
			// do something with result.location
			console.log(result);
			if (result.location.latitude !== this.state.latitude ||
				result.location.longitude !== this.state.longitude) {
				// setState will cause a render to occur, so tracking happens
				this.setState({latitude : result.location.latitude,
					longitude : result.location.longitude});
			} else {
				showSnackBar();
			}
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
		} else if (trackingType == CONTINUOUS) {
			Radar.startTrackingContinuous();
		} else {
			console.log('	No need to call tracking');
		}
	}

	showSnackBar(trackingType) {
		let text = 'Tracking ' + (trackingType == EFFICIENT ? 'Efficiently' : 
			trackingType == RESPONSIVE ? 'Responsively' :
			trackingType == CONTINUOUS ? 'Continuously' : '...');
		let lastTime = Math.floor(this.state.delta/1000);
		text = text + (lastTime > 0 ? lastTime + ' seconds ago': '');
		text = text + (', (' + this.state.latitude + ', ' + this.state.longitude + ')');
		Snackbar.show({
			text: text,
			duration: Snackbar.LENGTH_LONG,
		});
	}

	render() {
		const { navigation } = this.props;

		console.log((new Date()) + '**	render method');
		// props: {"navigation":{"state":{"params":{"latLng":{"latitude":40.73061,"longitude":-73.935242},"tracking":"CONTINUOUS"},"routeName":"Maps","key":"id-1604083159025-1"},"actions":{}}}
		this.startTrackingUser(navigation.getParam('tracking'));
		this.showSnackBar();
		if (this.state.latitude == MAGIC_LATITUDE) {
			return (<View style={[{ flex: 1 }]}>
				<Text style={{ textAlign: 'center', flex: 1,
					textAlignVertical: "center", fontSize: 20,
					margin: 20}}>
					Waiting for GPS coordinates to found...
				</Text>
			</View>)
		}

		let latLng = { latitude: this.state.latitude, longitude: this.state.longitude }
		console.log((new Date()) + '	RENDER method, latLng = ' + JSON.stringify(latLng));
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