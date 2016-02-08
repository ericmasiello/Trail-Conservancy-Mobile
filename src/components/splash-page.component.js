'use strict';

import React, {
  AsyncStorage,
  Component,
  View,
  Text
} from 'react-native';
import { loginActionCreator } from '../actions/login.action-creator';

export default class SplashPage extends Component {
  componentWillMount() {
    const { navigator } = this.props;

    AsyncStorage.getItem('user').then((value) => {

      const user = JSON.parse(value);
      console.log('value', value);
      if(user){
        loginActionCreator(user);
        navigator.immediatelyResetRouteStack([{name: 'trailmap'}]);
      } else {
        navigator.immediatelyResetRouteStack([{name: 'login'}]);
      }

    }).done();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Trail Con Splash Page!</Text>
      </View>
    );
  }
}
