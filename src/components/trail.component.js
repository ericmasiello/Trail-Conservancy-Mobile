'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  MapView,
  Image,
  Navigator,
} from 'react-native';
import s from './trail.style';
const styles = StyleSheet.create(s);

import Menu from './menu.component';

var Camera = require('react-native-camera');

var RNFS = require('react-native-fs');

export default class TrailMap extends Component {


  constructor(props) {
    super(props);

    this.state = {
      cameraType: Camera.constants.Type.back
    };
  }

  componentDidMount(){
    this.trackLocation();
  }

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails(); 
  }

  componentWillUpdate() {
    console.log(this.state);
    if (this.state.prepareToTakePhoto){
        this.ref.map.style = styles.hideMap;
    }
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

    var obj = this;
    this.cam.capture({
      metadata: {
        location: this.props.location
      },
      target: Camera.constants.CaptureTarget.disk,
    },
    function(err, filePath) {
      RNFS.readFile(filePath, 'base64').then((fileData) => {
         obj.props.saveAnnotation({'lat':obj.state.lat, 'lng': obj.state.lng,'photo':fileData});
         console.log("Photo captured.");
      })
      .catch((error) => {
        console.log(error.message);
      });
    });
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        />
    );
  }

  renderScene = () => {

    const { trails, isFetching, isSaving } = this.props.trails;

    if ( trails.length === 0 || isFetching ){
      console.log('trails are empty', trails, isFetching);
      return (
        <View style={styles.container}>
          <MapView style={styles.map}/>
        </View>
      );
    }

    if (isSaving){
      console.log('in process of saving annotation');
    }

    const overlays = {
      coordinates: trails,
      strokeColor: '#f007',
      lineWidth: 3
    };

    const annotations = [{
      latitude: trails[0].latitude,
      longitude: trails[0].longitude,
      title: 'Title',
      subtitle: 'Subtitle',
      detailCalloutView: (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../images/logo.png')}
            style={{height: 25, width: 25 }}
            />
        </View>)
    }];


    return (
      <View style={styles.container}>

      <View style={styles.cameraView}>
        <Camera
              ref={(c) => this.cam = c}
              type={this.state.cameraType}
              style={styles.cameraView}
              aspect={Camera.constants.Aspect.Fill}
        />
      </View>

      <View style={styles.mapView}>
      <MapView
          ref="map"
          style={styles.map}
          region={{
            latitude: trails[0].latitude,
            longitude: trails[0].longitude,
            latitudeDelta: .03,
            longitudeDelta: .03
          }}
          overlays={[overlays]}
          annotations={annotations}
          />
          </View>
           <View style={styles.tabView}>
            <Menu {...this.props} callBack={this.capturePhoto}  />
           </View>
      </View>
    );
  };

  getAnnotations = (region) => {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here'
    }];
  };
}
