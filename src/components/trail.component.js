'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  MapView,
  Image,
  Navigator,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native';
import s from './trail.style';
const styles = StyleSheet.create(s);

import Menu from './menu.component';

export default class TrailMap extends Component {

  componentWillMount() {
    this.props.fetchAnnotations();
    this.props.fetchTrails();

    this.state = {
      animated: true,
      modalVisible: false,
      transparent: false,
    };
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

    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };

    var innerContainerTransparentStyle = this.state.transparent
     ? {backgroundColor: '#fff', padding: 20}
     : null;

    return (
      <View style={styles.container}>
      <TouchableHighlight style={{height: 50, backgroundColor: '#cc0000', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{ this.setState({modalVisible: true}); }}><Text>Click Me</Text></TouchableHighlight>
      <Modal
        animated={this.state.animated}
        transparent={this.state.transparent}
        visible={this.state.modalVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
            <TouchableHighlight onPress={()=>{ this.setState({modalVisible: false}); }}><Text>Click Me</Text></TouchableHighlight>
          </View>
        </View>
      </Modal>
        <View style={styles.mapView}>
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
           <View style={styles.tabView}>
				      <Menu/>
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
