import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapsScreen from './MapsScreen';
import MainScreen from './MainScreen';

const MainNavigator = createStackNavigator({
	MainScreen: { screen: MainScreen },
	Maps: { screen: MapsScreen, navigationOptions: {
		headerTitle: 'Radar Demo!',
	  }, params : { latLng : { latitude: 40.730610, longitude: -73.935242 }  } }
});

const App = createAppContainer(MainNavigator);

export default App;