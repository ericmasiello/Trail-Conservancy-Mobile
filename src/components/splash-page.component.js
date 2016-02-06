'use strict';

import React, {
  Component,
  View,
  Text
} from 'react-native';

export default class SplashPage extends Component {
  componentWillMount() {
    const { navigator } = this.props;

    setTimeout(()=>{
      navigator.immediatelyResetRouteStack([{name: 'login'}]);
    }, 1500);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Trail Con Splash Page!</Text>
      </View>
    );
  }
}
