'use strict';

import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';
import styles from './styles';
import layout from '../../styles/layout';
import { H1 } from '../h1/';

export default class SplashPage extends Component {
  componentWillMount() {
    const { navigator, loading } = this.props;
    if (!loading) {
      setTimeout(() => {
        navigator.immediatelyResetRouteStack([{name: 'LANDING_PAGE'}]);
      }, 1500);
    }
  }

  render() {
    const display = this.props.loading
      ? <H1 style={styles.appTitle}>Loading...</H1>
      : <H1 style={styles.appTitle}>Trail Reporter!</H1>;

    return (
      <View style={[layout.container, layout.centerContainer, styles.container]}>
        {display}
      </View>
    );
  }
}
