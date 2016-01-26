'use strict';

const React = require('react-native');
const {
  Component,
  StyleSheet,
  Navigator
} = React;

const SplashPage = require('./SplashPage');
const LoginPage = require('./LoginPage');
const TrailMap = require('./TrailMap');

const ROUTES = {
  splash: SplashPage,
  login: LoginPage,
  trailmap: TrailMap
};

class Main extends Component {

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

module.exports = Main;
