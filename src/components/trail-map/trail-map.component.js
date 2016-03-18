'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { overlayStrokeColor, overlayLineWidth } from '../../styles/config';
import layout from '../../styles/layout';
import styles from './styles';
import MapView from 'react-native-maps';
import { MapIconOverlay } from '../map-icon-overlay/';

export default class TrailMap extends Component {

  constructor(props) {

    super(props);
  }

  componentWillMount() {
    this.props.fetchAnnotationsActionCreator();
    this.props.fetchTrailsActionCreator();
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
      strokeColor: overlayStrokeColor,
      lineWidth: overlayLineWidth
    };


    // outer view needed since tabview requires single child

    return (
      <View style={layout.container}>
        <MapView
          ref="map"
          style={layout.container}
          region={{
            latitude: this.props.userLocation.lat,
            longitude: this.props.userLocation.lng,
            latitudeDelta: .01,
            longitudeDelta: .01
          }}>

          <MapView.Polyline
            coordinates={this.props.trails.trails}
            fillColor="rgba(0, 200, 0, 0.5"
            strokeColor="rgba(0,0,0,0.5"
            strokeWidth={2}
          />
          {this.buildAnnotationsFromDataModel()}
        </MapView>
        <MapIconOverlay {...this.props}/>
     </View>
    );
  }


  buildAnnotationsFromDataModel = () => {
    if (!this.props.annotations.annotations || this.props.annotations.annotations.length === 0){
      return [];
    }

    return this.props.annotations.annotations.map(function(currVal, ind, arr) {
      return(
        <MapView.Marker
          key={ind}
          coordinate={{
            latitude: currVal.lat,
            longitude: currVal.lng,
          }}
          centerOffset={{ x: -42, y: -60 }}
          anchor={{ x: 0.84, y: 1 }}
          image={require('../../images/Log-green.png')}
          title={currVal.issueType}
          description={currVal.comment}
        />
      );
    });

  };
}
