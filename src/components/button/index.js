import React, {
  TouchableHighlight,
  Text
} from 'react-native';

import styles from './styles';

export default (props) => {
  return (
    <TouchableHighlight style={styles.baseContainer} onPress={props.onPress}>
      <Text style={styles.baseType}>{props.children}</Text>
    </TouchableHighlight>
  );
}
