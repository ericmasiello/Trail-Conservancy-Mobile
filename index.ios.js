'use strict';

import React from 'react-native';
import Main from './src/main';

const {
  AppRegistry
  } = React;

/**
 * This is a workaround to get rid of the yellowbox warning when
 * running on a device and using chrome debugging.  See
 * https://github.com/facebook/react-native/issues/1598
 *
 */
console.ignoredYellowBox = ['jsSchedulingOverhead'];

AppRegistry.registerComponent('TrailConservancy', () => Main);
