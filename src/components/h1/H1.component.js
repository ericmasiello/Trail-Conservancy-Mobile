'use strict';
import React, { Text } from 'react-native';
import styles from './styles';

export default (props) => {
  return <Text style={[styles.h1, props.style]}>{props.children}</Text>;
};
