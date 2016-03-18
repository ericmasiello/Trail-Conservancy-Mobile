'use strict';
import { StyleSheet } from 'react-native';
import { componentTransparentBackgroundColor } from '../../styles/config';

export default StyleSheet.create({
	transparentWrapper: {
		flex: 1,
		backgroundColor: componentTransparentBackgroundColor,
		position: 'absolute',
		bottom:20,
		right:10
	},
});
