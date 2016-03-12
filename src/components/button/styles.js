import { StyleSheet } from 'react-native';
import styleConfig from '../../styles/config';

export default StyleSheet.create({
  baseContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.brandColor,
  },
  baseType: {
    color: styleConfig.colors.buttonType,
    fontSize: styleConfig.typopgraphy.h4
  }
});
