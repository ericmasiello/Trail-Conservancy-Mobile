'use strict';
import { StyleSheet } from 'react-native';
import { componentBackgroundColor } from '../../styles/config';

export default StyleSheet.create({
	wrapper: {
		flex: .08,
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor: componentBackgroundColor,
		paddingTop:20,
		paddingLeft:10,
		paddingRight:10,
		minHeight:50
	},
});
