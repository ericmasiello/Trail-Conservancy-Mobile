var React = require('react-native');
var { View, StyleSheet, Text, Navigator } = React;
var Login = require('./Login');
var TrailMap = require('./TrailMap');

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Login />       
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});