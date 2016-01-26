import React, {
  StyleSheet,
  Navigator,
} from 'react-native';
import SplashPage from './SplashPage';
import LoginPage from './LoginPage';
import TrailMap from './TrailMap';

const ROUTES = {
  splash: SplashPage,
  login: LoginPage,
  trailmap: TrailMap
};

module.exports = React.createClass({
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name]; //ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator} />;
  },
  render: function(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'splash'}}
        renderScene={this.renderScene}
        configureScene={()=> { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});