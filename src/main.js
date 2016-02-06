'use strict';

import React, {
  Component,
  StyleSheet,
  Navigator
} from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore, applyMiddleware } from 'redux';

import SplashPage from './SplashPage';
import LoginPage from './LoginPage';
import TrailMap from './TrailMap';



const ROUTES = {
  splash: SplashPage,
  login: LoginPage,
  trailmap: TrailMap
};

export default class Main extends Component {

  constructor(props) {
      super(props);
  }

  renderScene(route, navigator) {
    console.log('Route to ' + route.name);
      var Component = ROUTES[route.name]; //ROUTES['signin'] => Signin
      return <Component route={route} navigator={navigator} />;
  }

  render(){

      return (
        <Navigator
          style={styles.container}
          initialRoute={{name: 'splash'}}
          renderScene={this.renderScene}
          configureScene={()=> { return Navigator.SceneConfigs.FloatFromRight; }}
          />
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
