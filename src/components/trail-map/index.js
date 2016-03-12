'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  MapView,
  Image,
} from 'react-native';

import config from '../../styles/config';
import layout from '../../styles/layout';
import styles from './styles';

export default class TrailMap extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails();
  }

  render() {
    const { trails, isFetching, isSaving } = this.props.trails;

    // Render a default empty map if we are loading
    if ( trails.length === 0 || isFetching ){

      console.log('trails are empty', trails, isFetching);
      return <MapView style={layout.container}/>;
    }
    const overlays = {
      coordinates: trails,
      strokeColor: config.overlays.strokeColor,
      lineWidth: config.overlays.lineWidth
    };

    // outer view needed since tabview requires single child
    return (
      <MapView
        ref="map"
        style={layout.container}
        region={{
          latitude: this.props.userLocation.lat,
          longitude: this.props.userLocation.lng,
          latitudeDelta: .01,
          longitudeDelta: .01
        }}
        overlays={[overlays]}
        annotations={this.buildAnnotationsFromDataModel()}
      />
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
          <View style={layout.container}>
            <Image
              source={{uri:photo}}
              style={styles.annotation}
              />
          </View>)
        });
    });

  };
}
