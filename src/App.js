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

//var base64ImgLoaded2 = "data:image/jpg;base64,"; 


//var base64ImgLoaded = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
var base64ImgLoaded = 'data:image/png;base64';


module.exports = React.createClass({
  getInitialState: function() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },
   componentWillMount: function() {
  
      // Save image
      this.photoRef = new Firebase("https://shining-fire-7029.firebaseio.com/photos/photoupload");
      this.photoRef.on('value', (dataSnapshot) => {
        this.setState({
          photoData: 'data:image/jpg;base64,' + dataSnapshot.val()
        });
         console.log(this.state.photoData);
      });
   },
  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },
  _takePicture: function() {
   

    var obj = this;

    this.refs.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.cameraRoll,
    },
      function(err, data) {
      
      var uri = data;
      ReadImageData.readImage(uri, (imageBase64) => {
        console.log('aa' + imageBase64);
      });
    });
  },
  render: function() {
    console.log('render' + base64ImgLoaded);
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