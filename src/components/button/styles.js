'use strict';
import { StyleSheet } from 'react-native';
import { buttonBGColor, buttonTypeColor, h4TypeSize } from '../../styles/config';

export default StyleSheet.create({
  baseContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: buttonBGColor,
  },
  baseType: {
    color: buttonTypeColor,
    fontSize: h4TypeSize
  }
});
