var React = require('react-native');
const Firebase = require('firebase');
var { View, StyleSheet, MapView, MapRegionInput, Text, Image } = React;
var X2JS = require('x2js');
var FairLandXML = require('../gpx/fairland');

module.exports = React.createClass({

  getInitialState() {
    return {
      isFirstLoad: true,
      mapRegion: undefined,
      annotations: [],
    };
  },

  componentWillMount: function() {
    Firebase.enableLogging(true);
    this.ref = new Firebase("https://shining-fire-7029.firebaseio.com/annotations");
    
    // seed fake annotation data.  This is working and you can see it in the data viewer at
    // https://shining-fire-7029.firebaseio.com/annotations/
    this.ref.push({ latitude: '42.086445', longitude: '-76.918551', title:'test1title', subtitle:'subtitle1test' });
  },

  render() {

    const x2js = new X2JS();
    const fairland = x2js.xml2js(FairLandXML);
    const mapCoords = fairland.gpx.trk[0].trkseg.trkpt.map((o)=> {
      return {
        latitude: parseFloat(o._lat),
        longitude: parseFloat(o._lon)
      }
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
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./logo.png")}
            style={{height: 25, width: 25 }}
            />
        </View>)
    }];

    //view: <View style={{
    //      alignItems: 'center',
    //    }}>
    //  <Text style={{fontWeight: 'bold', color: '#f007'}}>
    //    Thumbs Up!
    //  </Text>
    //  <Image
    //    style={{width: 90, height: 65, resizeMode: 'cover'}}
    //    source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
    //    />
    //</View>

    return (
      <View style={styles.container}>
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
  },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }
});

var styles = StyleSheet.create({
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