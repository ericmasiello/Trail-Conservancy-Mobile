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
      // Focus on current location on initial load
      this.setState({'lat': this.props.currLat});
      this.setState({'lng': this.props.currLng});
  }

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails();
  }

  render() {
   console.log('Rerender map page');
    
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

    // outer view needed since tabview requires single child
    return (
         <View style={styles.container}>
          <MapView
            ref="map"
            style={styles.container}
            region={{
              latitude: this.state.lat,
              longitude: this.state.lng,
              latitudeDelta: .01,
              longitudeDelta: .01
            }}
            overlays={[overlays]}
            annotations={this.buildAnnotationsFromDataModel()}
            />
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
