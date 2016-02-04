/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Dummy from './components/dummy.component';
import styleRules from './app.styles';

const store = applyMiddleware()(createStore)(reducers);
const styles = StyleSheet.create(styleRules);

export default () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Dummy />
      </View>
    </Provider>
  );
};
