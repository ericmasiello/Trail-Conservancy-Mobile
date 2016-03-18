import React, {
  TouchableHighlight,
  Text
} from 'react-native';

import styles from './styles';
import { buttonBGActiveColor } from '../../styles/config/';

export default (props) => {
  return (
    <TouchableHighlight style={styles.baseContainer} underlayColor={buttonBGActiveColor} {...props} >
      <Text style={styles.baseType}>{props.buttonText}</Text>
    </TouchableHighlight>
  );
}
