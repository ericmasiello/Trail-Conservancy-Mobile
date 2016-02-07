var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  } = React;
var TrailMap = require('./TrailMap');

var Camera = require("react-native-camera");

const Firebase = require('firebase');
 
module.exports = React.createClass({
  getInitialState: function() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },
   componentWillMount: function() {
    Firebase.enableLogging(true);
    
   },
  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },
  _takePicture: function() {
    this.refs.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    },
      function(err, data) {
      console.log(err, data);
      console.log('take');
      this.ref = new Firebase("https://shining-fire-7029.firebaseio.com/photos");
      this.ref.push(data);

    });
  },
  render: function() {
    return (
      <View>
        <Camera
          ref="cam"
          style={styles.container}
          type={this.state.cameraType} 
          >
          <View style={styles.buttonBar}>
            <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
              <Text style={styles.buttonText}>Flip</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this._takePicture}>
              <Text style={styles.buttonText}>Take</Text>
            </TouchableHighlight>
          </View>
        </Camera>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    padding: 10,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    margin: 5
  },
  buttonText: {
    color: "#ffffff"
  }
});