'use strict';

import React, {
  Component,
  View
} from 'react-native';
import GeoHash from 'ngeohash';
import Camera  from 'react-native-camera';
import Button from './button';
import layout from '../styles/layout';

export default class ReportProblem extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Capture a photo with the camera, add in the geolocation, save to disk, send to firebase
   * Note: This function is passed as a callback to the menu component.  When the report button is clicked,
   * this function is executed.  We store a reference to the camera when the component is
   * rendered with:  ref={(c) => this.cam = c
   */
  capturePhoto = () => {

    var self = this;

    this.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    }, (err, filePath) => {

      const geoHash = GeoHash.encode(self.props.userLocation.lat, self.props.userLocation.lng, 20);
      self.props.saveAnnotation(geoHash, {'lat': self.props.userLocation.lat, 'lng': self.props.userLocation.lng});

      navigator.geolocation.getCurrentPosition(
        (position) => {
          self.props.updateUserLocation(position.coords.latitude,position.coords.longitude);
        }
      );
      self.props.savePhoto(geoHash, filePath);
      self.props.fetchAnnotations();
      self.props.switchTab('location');
    });
  }

  render() {
    return (
       <View style={layout.container}>
          <Camera
                ref={(c) => this.cam = c}
                type='cameraType: Camera.constants.Type.back'
                style={layout.container}
                aspect={Camera.constants.Aspect.Fill}
          />
          <Button onPress={this.capturePhoto}>Snap a Photo</Button>
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
