var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
  } = React;
var TrailMap = require('./TrailMap');

var Camera = require("react-native-camera");

const Firebase = require('firebase');

var ReadImageData = require('NativeModules').ReadImageData;

 var base64ImgLoaded = 'data:image/png;base64';


module.exports = React.createClass({
  getInitialState: function() {
     console.log('set initial state');
    return {
      cameraType: Camera.constants.Type.back
    }
  },
   componentWillMount: function() {
  
      // =====
      // Load existing image from firebase
      // =====
      this.photoRef = new Firebase("https://shining-fire-7029.firebaseio.com/photos/photoupload");
     
      // Make 'this' available in callback scope
      var obj = this;

      // This callback is called by firebase to send data
      // Setting state will auto-rerender
      this.photoRef.on('value', (dataSnapshot) => {
        obj.setState({
          // WARNING: there is a bug that requires you using .png even though they are really .jpg image
          photoData: 'data:image/png;base64,' + dataSnapshot.val()
        });
      });
   },
  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },
  _takePicture: function() {
   
    // Make 'this' available in callback scope
    var obj = this;

    this.refs.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.cameraRoll,
    },
      function(err, data) {
      
      // ======
      // After camera capture, encode image as base 64 and send to firebase
      // =====
      var uri = data;
      ReadImageData.readImage(uri, (imageBase64) => {
        obj.photoRef.set(imageBase64)
      });
    });
  },
  render: function() {
    return (
      <View>

        <Image style={{width: 100, height: 50, borderWidth: 1, borderColor: 'red'}} source={{uri: this.state.photoData}}/>

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