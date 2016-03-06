'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

import s from './report-problem.style';

import GeoHash from 'ngeohash';

const styles = StyleSheet.create(s);

var Camera = require('react-native-camera');



export default class ReportProblem extends Component {


  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // Note: must set lat / lng in componentDidMount and componentWillReceiveProps since
    // componentWillReceiveProps is not called on initial render (so var will not be set 1st time)
    this.state = {
      cameraType: Camera.constants.Type.back,
      'lat': this.props.currLat,
      'lng': this.props.currLng
    };
  }
  componentWillReceiveProps(){
      this.setState({'lat': this.props.currLat});
      this.setState({'lng': this.props.currLng});
  }

  /**
   * Capture a photo with the camera, add in the geolocation, save to disk, send to firebase
   * Note: This function is passed as a callback to the menu component.  When the report button is clicked,
   * this function is executed.  We store a reference to the camera when the component is
   * rendered with:  ref={(c) => this.cam = c
   */
  capturePhoto = () => {

 
    var obj = this;
  
    this.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    },
    function(err, filePath) {

      const geoHash = GeoHash.encode(obj.state.lat, obj.state.lng, 20);

      obj.props.saveAnnotation(geoHash, {'lat':obj.state.lat, 'lng': obj.state.lng});

      obj.props.savePhoto(geoHash, filePath);

      obj.props.fetchAnnotations();

      obj.props.panMapActionCreator(obj.state.lat, obj.state.lng);

      obj.props.switchTab('location');

    });
  }

  render() {
    return (
       <View style={styles.container}>   
          <Camera  
                ref={(c) => this.cam = c}
                type='cameraType: Camera.constants.Type.back'
                style={styles.container}
                aspect={Camera.constants.Aspect.Fill}
          />
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
