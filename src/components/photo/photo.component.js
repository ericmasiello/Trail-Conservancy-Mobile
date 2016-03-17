'use strict';
import React, {
  Component,
  TouchableHighlight,
  View,
  Image,
  Text,
} from 'react-native';

import styles from './styles';

// transparentWrapper is needed to make touchable highlight
export default class Photo extends Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchPhotoActionCreator(this.props.geoHash);
  }


  cancel = () => {
     this.props.navigator.popToTop();
  }
  render() {

    console.log(this.props);
    // Note: extra text element below allows space-between layout to work right
    // see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
      return (
        <View style={styles.wrapper}>
        <Text/>
            <Text style={styles.right}>Snap the problem</Text>
            <TouchableHighlight underlayColor="transparent" onPress={this.cancel}>
              <Image
                source={require('../../images/delete-header-icon.png')}
              />
            </TouchableHighlight>
        </View>
      );
    }
}
