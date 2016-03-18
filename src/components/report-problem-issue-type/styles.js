'use strict';
import { StyleSheet } from 'react-native';
import { componentBackgroundColor } from '../../styles/config';

export default StyleSheet.create({
  largeimage: {
    flex:1,
    borderWidth:1
  },
  midText: {
    flex:.1	,
    textAlign:'center'
  },
  iconBarWrapper: {
    justifyContent:'center',
    paddingTop:50,
    flex:1
  },
  iconBar: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: componentBackgroundColor,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
  }
});
