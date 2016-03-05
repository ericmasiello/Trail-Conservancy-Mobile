'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  MapView,
  Image,
} from 'react-native';
import s from './trail-map.style';
const styles = StyleSheet.create(s);
 
export default class TrailMap extends Component {


  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(){
   // TODO: only pull back annotations in a region for performance
  }

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails();
  }

  render() {
   console.log('Rerender map page');
   console.log(this.props);
    const { trails, isFetching, isSaving } = this.props.trails;

    // Render a default empty map if we are loading
    if ( trails.length === 0 || isFetching ){

      console.log('trails are empty', trails, isFetching);
      return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView style={styles.container}/>
        </View>
      </View>
      );
    }
    const overlays = {
      coordinates: trails,
      strokeColor: '#f007',
      lineWidth: 3
    };

    var lat;
    var lng;

    // If we take a photo, refresh from DB, then pan to where the
    // pin is located
    if (this.props.map && this.props.map.panToLat ){
       lat = this.props.map.panToLat;
       lng = this.props.map.panToLng;
       console.log('Will pan to lat/lng ' + lat + ',' + lng);
    }
    // If there's an annotation, then pan to the first location
    else if (this.props.annotations && this.props.annotations.length > 0){
      console.log(this.props.annotations);
      lat = this.props.annotations[0].lat;
      lng = this.props.annotations[0].lng;
      console.log('Will use lat/lng of first annotation ' + lat + ',' + lng);
    }
    // Otherwise pan to the trail
    else  if (trails.length > 0) {
      console.log('hit else 2');
      lat = trails[0].latitude;
      lng =  trails[0].longitude;
       console.log('Will use lat/lng of first trail ' + lat + ',' + lng);
    }

    // outer view needed since tabview requires single child
    return (
      <View style={styles.container}>
         <View style={styles.container}>
          <MapView
            ref="map"
            style={styles.container}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: .01,
              longitudeDelta: .01
            }}
            overlays={[overlays]}
            annotations={this.buildAnnotationsFromDataModel()}
            />
          </View>
      </View>
    );
  }


  buildAnnotationsFromDataModel = () => {
    if (!this.props.annotations.annotations || this.props.annotations.annotations.length === 0){
      return [];
    }

    return this.props.annotations.annotations.map(function(currVal, ind, arr) {
      // TODO: need to optimize the photo display.  Right now we download all images and annotations.
      // when there are too many in firebase it crashes the app.
      var photo = 'data:image/png;base64,' + currVal.photo;
      return({
        longitude: currVal.lng,
        latitude: currVal.lat,
        title: 'You Are Here',
        subtitle: 'Subtitle',
        detailCalloutView: (
          <View style={styles.container}>
            <Image
              source={{uri:photo}}
              style={styles.annotation}
              />
          </View>)
        });
    });

  };
}
