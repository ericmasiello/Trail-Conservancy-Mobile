'use strict';

import React from 'react-native';

const {
  Component,
  View,
  Text
} = React;

class SplashPage extends Component {
  componentWillMount() {
    const { navigator } = this.props;

    setTimeout(()=>{
      navigator.immediatelyResetRouteStack([{name: 'login'}]);
    }, 1500);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Trail Con Splash Page</Text>
      </View>
    );
  }
}

module.exports = SplashPage;
