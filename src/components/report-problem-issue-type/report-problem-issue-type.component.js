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
import { Photo } from '../photo/';

export default class ReportProblemIssueType extends Component {
  render() {
    return (
       <View style={layout.container}>
        <NavHeader {...this.props}/>
        <Photo {...this.props} geoHash={this.props.route.geoHash}/>
      </View>
    );
 }
}
