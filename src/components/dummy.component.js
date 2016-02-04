import React from 'react-native';
const { View, StyleSheet, Text, Component } = React;
//var TrailMap = require('./TrailMap');

// module.exports = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text>I am the app component</Text>
//       </View>
//     );
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default (props) => {
  return (
    <View style={styles.container}>
      <Text>I am the app component</Text>
    </View>
  );
};
