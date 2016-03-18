'use strict';
import { StyleSheet } from 'react-native';
import { componentBorderColor } from '../../styles/config';

export default StyleSheet.create({
	largeimage: {
		flex:1,
		borderWidth:1
	},
	textInputWrapper: {
		justifyContent:'center',
		paddingTop:50,
		flex:1,
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:30
	},
	textInput :{
		flex:1,
		borderColor: componentBorderColor,
		borderWidth: 2,
		paddingLeft:10,
		paddingRight:10,
	}
});
