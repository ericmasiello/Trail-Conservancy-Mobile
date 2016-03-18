'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

transparentWrapper: {
    flex: .12,
    backgroundColor: 'transparent',
    flexDirection:'row' ,
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:1
},
largeimage: {
	flex:1,
	borderWidth:1
},
midText: {
	flex:.1,
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
    backgroundColor: 'white',
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
}
});
