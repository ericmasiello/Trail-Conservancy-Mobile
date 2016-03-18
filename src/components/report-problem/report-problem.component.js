'use strict';

import React, {
  Component,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import GeoHash from 'ngeohash';
import Camera  from 'react-native-camera';
import layout from '../../styles/layout';
import styles from './styles';
import { NavHeader } from '../nav-header/';

export default class ReportProblem extends Component {

  /**
   * Capture a photo with the camera, add in the geolocation, save to disk, send to firebase
   * Note: This function is passed as a callback to the menu component.  When the report button is clicked,
   * this function is executed.  We store a reference to the camera when the component is
   * rendered with:  ref={(c) => this.cam = c
   */
  capturePhoto = () => {


    this.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    }, (err, filePath) => {

      const geoHash = GeoHash.encode(this.props.userLocation.lat, this.props.userLocation.lng, 20);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.props.updateUserLocationActionCreator(position.coords.latitude,position.coords.longitude);
        }
      );

      this.props.saveAnnotationActionCreator(geoHash, {'lat': this.props.userLocation.lat, 'lng': this.props.userLocation.lng, 'geoHash': geoHash});

      this.props.savePhotoActionCreator(geoHash, filePath);

      this.props.fetchAnnotationsActionCreator();

      this.props.navigator.push({name: 'REPORT_PROBLEM_ISSUE_TYPE'});
    });
  }

  render() {
    return (
       <View style={layout.container}>
        <NavHeader {...this.props}  text="Snap the problem"/>
          <Camera
                ref={(c) => this.cam = c}
                type='cameraType: Camera.constants.Type.back'
                style={layout.container}
                aspect={Camera.constants.Aspect.Fill}
          />
          <View style={styles.transparentWrapper}>
              <TouchableHighlight underlayColor="transparent" onPress={()=> this.capturePhoto()}>
                <Image
                  source={require('../../images/bullseye.png')}
                />
              </TouchableHighlight>
          </View>

      </View>
    );
 }
}
