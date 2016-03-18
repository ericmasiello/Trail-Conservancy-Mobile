'use strict';
import { StyleSheet } from 'react-native';
import { componentTransparentBackgroundColor } from '../../styles/config';

export default StyleSheet.create({
	transparentWrapper: {
		flex: .12,
		backgroundColor: componentTransparentBackgroundColor,
		flexDirection:'row' ,
		alignItems:'center',
		justifyContent:'center',
		borderTopWidth:1
	},
});
