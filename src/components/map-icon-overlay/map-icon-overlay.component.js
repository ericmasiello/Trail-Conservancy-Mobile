'use strict';
import React, {
  Component,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import styles from './styles';

// transparentWrapper is needed to make touchable highlight
export default class MapIconOverlay extends Component {

  constructor(props) {
    super(props);
  }

  reportProblem = () => {
     this.props.navigator.push({name: 'REPORT_PROBLEM'});
  }
  render() {
      return (
        <View style={styles.transparentWrapper}>
            <TouchableHighlight underlayColor="transparent" onPress={this.reportProblem}>
              <Image
                source={require('../../images/camera-icon.png')}
              />
            </TouchableHighlight>
        </View>
      );
    }
}
