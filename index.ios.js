/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SplashPage = require('./src/SplashPage');
var LoginPage = require('./src/LoginPage');
var TrailMap = require('./src/TrailMap');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;
var App = require('./src/App');

var TrailConservancy = React.createClass({
   render: function() {
    return (
      <Navigator
        initialRoute={{ name: 'SplashPage', component: SplashPage}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
        }}
      />
    );
  } 
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TrailConservancy', () => TrailConservancy);
