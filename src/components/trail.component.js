'use strict';

import React, {
  Component,
  View,
  Text,
  StyleSheet,
  MapView,
  Image,
  Navigator
} from 'react-native';
import s from './trail.style';
const styles = StyleSheet.create(s);

export default class TrailMap extends Component {

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails();
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        />
    );
  }

  renderScene = () => {

    const { trails, isFetching } = this.props.trails;

    if( trails.length === 0 || isFetching ){
      console.log('trails are empty', trails, isFetching);
      return (
        <View style={styles.container}>
          <MapView style={styles.map}/>
        </View>
      );
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
        <MapView
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
