'use strict';

import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';
import s from './splash-page.style';
const styles = StyleSheet.create(s);

export default class SplashPage extends Component {
  componentWillMount() {

    const { navigator, loading } = this.props;

    if (!loading) {
      setTimeout(()=> {
        navigator.immediatelyResetRouteStack([{name: 'LANDING_PAGE'}]);
      }, 1500);
    }
  }

  render() {

    const display = this.props.loading
      ? <Text style={styles.appTitle}>Loading...</Text>
      : <Text style={styles.appTitle}>Trail Reporter!</Text>;

    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
}
