import { StyleSheet } from 'react-native';
import { brandColor, buttonTypeColor, h4TypeSize } from '../../styles/config';

export default StyleSheet.create({
  baseContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brandColor,
  },
  baseType: {
    color: buttonTypeColor,
    fontSize: h4TypeSize
  }
});
