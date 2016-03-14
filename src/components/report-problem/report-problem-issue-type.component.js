'use strict';

import React, {
  Component,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import layout from '../../styles/layout';
import styles from './styles';
import { NavHeader } from '../nav-header/';

export default class ReportProblem extends Component {


  render() {
    return (
       <View style={layout.container}>
        <NavHeader {...this.props}/>
          <View style={styles.transparentWrapper}>
              <TouchableHighlight underlayColor="transparent" onPress={this.capturePhoto}>
                <Image
                  source={require('../../images/bullseye.png')}
                />
              </TouchableHighlight>
          </View>

      </View>
    );
 }
  getAnnotations = (region) => {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here'
    }];
  };
}
