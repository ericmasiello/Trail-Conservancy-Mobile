'use strict';

import React from 'react-native';

const {
  Component,
  View,
  StyleSheet,
  MapView,
  Image,
  Navigator
} = React;

import Firebase from 'firebase';
import X2JS from 'x2js';
import FairLandXML from '../gpx/fairland';

class TrailMap extends Component {

  constructor(props) {

      super(props);

      this.state = {
        isFirstLoad: true,
        mapRegion: undefined,
        annotations: []
      };

  }

  componentWillMount() {
    //Firebase.enableLogging(true);
    this.ref = new Firebase('https://shining-fire-7029.firebaseio.com/annotations');
    this.ref.push({ latitude: '42.086445', longitude: '-76.918551', title:'test1title', subtitle:'subtitle1test' });
  }

  render() {
    console.log('hi');
    console.log(this.renderScene);   
    return (
      <Navigator
      renderScene={this.renderScene}
      />
    );

  }

  renderScene = (route, navigator) => {
    const x2js = new X2JS();
    const fairland = x2js.xml2js(FairLandXML);
    const mapCoords = fairland.gpx.trk[0].trkseg.trkpt.map((o)=> {
      return {
        latitude: parseFloat(o._lat),
        longitude: parseFloat(o._lon)
      };
    });

    const overlays = {
      coordinates: mapCoords,
      strokeColor: '#f007',
      lineWidth: 3
    };

    const annotations = [{
      latitude: mapCoords[0].latitude,
      longitude: mapCoords[0].longitude,
      title: 'Title',
      subtitle: 'Subtitle',
      detailCalloutView:(
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('./logo.png')}
            style={{height: 25, width: 25 }}
            />
        </View>)
    }];

    return (
      <View style={styles.container}>
       <Image
            source={require('./logo.png')}
            style={{height: 25, width: 25 }}
            />
        <MapView
          style={styles.map}
          region={{
            latitude: mapCoords[0].latitude,
            longitude: mapCoords[0].longitude,
            latitudeDelta: .03,
            longitudeDelta: .03
          }}
          overlays={[overlays]}
          annotations={annotations}
          />
      </View>
    );
  };

getAnnotations = (region) =>   {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  };
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000000'
  },
  map: {
    height: 500,
    width: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  }
});

export default TrailMap;
//module.exports = TrailMap;
