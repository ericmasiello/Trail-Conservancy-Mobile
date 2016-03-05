'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import s from './report-problem.style';
const styles = StyleSheet.create(s);

var Camera = require('react-native-camera');

var RNFS = require('react-native-fs');

export default class ReportProblem extends Component {


  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.trackLocation();
    this.state = {
      cameraType: Camera.constants.Type.back,
    };
  }

  /**
   * Store geolocation in state variable so we can save it in annotation.
   */
  trackLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          this.setState({'lat':lat, 'lng':lng});
        },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.setState({'lat':lat, 'lng':lng});
      });
  }

  /**
   * Capture a photo with the camera, add in the geolocation, save to disk, send to firebase
   * Note: This function is passed as a callback to the menu component.  When the report button is clicked,
   * this function is executed.  We store a reference to the camera when the component is
   * rendered with:  ref={(c) => this.cam = c
   */
  capturePhoto = () => {
    console.log('Capture photo');
    var obj = this;
    this.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    },
    function(err, filePath) {
       console.log('Save photo');
      RNFS.readFile(filePath, 'base64').then((fileData) => {
         
         // TODO: do these need to be chained promises? I works OK
         // now, but e.g. save annotation should finish before fetchAnnotations runs
         // (but pan and tab switch could happen async)  
         console.log('Begin save annotation and photo.');
         obj.props.saveAnnotation({'lat':obj.state.lat, 'lng': obj.state.lng,'photo':fileData});
         console.log('Begin fetch annotations.');
         obj.props.fetchAnnotations();
         console.log('Begin pan map.');
         obj.props.panMapActionCreator(obj.state.lat, obj.state.lng);
         console.log('Begin switch tab.');
         obj.props.switchTabActionCreator('location');
         
         console.log('Photo captured.');
      })
      .catch((error) => {
        console.log(error.message);
      });
    });
  }

  render() {
    return (
       <View style={styles.container}>
        <View style={styles.container}>
          <Camera  
                ref={(c) => this.cam = c}
                type='cameraType: Camera.constants.Type.back'
                style={styles.container}
                aspect={Camera.constants.Aspect.Fill}
          />
         </View>
         <View style={[{flex:.2}]}>
            <TouchableHighlight style={{flex:.1, backgroundColor: 'blue'}} onPress={this.capturePhoto}>
            <View style={{flexDirection: 'column', }}>
                <Text style={{textAlign:'center', color: 'white', fontSize:22, marginTop:10}}>Take Picture</Text>
            </View>
        </TouchableHighlight>
        </View>
      </View>
    );
 }
  getAnnotations = (region) => {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here'
    }];
  };
}
