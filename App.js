import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapsScreen from './MapsScreen';
import MainScreen from './MainScreen';

const MainNavigator = createStackNavigator({
	MainScreen: { screen: MainScreen },
	Maps: { screen: MapsScreen, navigationOptions: {
		headerTitle: 'Radar Demo!',
	  }, params : {} }
});

const App = createAppContainer(MainNavigator);

export default App;