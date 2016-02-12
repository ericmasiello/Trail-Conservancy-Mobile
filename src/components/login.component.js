'use strict';

import React, {
  Component,
  View,
  StyleSheet,
} from 'react-native';
import FBLogin from 'react-native-facebook-login';
import s from './login.style';
const styles = StyleSheet.create(s);

export default class LoginPage extends Component {

  onLogin = (data) => {
    console.log('LoginPage: logged in');
    this.props.loginActionCreator(data.credentials);
    this.gotoNext();
  };

  onLogout = () => {
    console.log('LoginPage: logged out');
    this.props.logoutActionCreator();
  };

  onLoginFound = (data) => {
    console.log("LoginPage: existing login found.");
    this.props.loginActionCreator(data.credentials);
    this.gotoNext();
  };

  onLoginNotFound = () => {
    console.log('LoginPage: login not found');
    this.props.logoutActionCreator();
  };

  gotoNext = () => {
    this.props.navigator.push({name: 'LANDING_PAGE'});
  };

  onError(data) {
    console.log('LoginPage: error', data);
  }

  onCancel() {
    console.log('LoginPage: cancel');
  }

  onPermissionsMissing(data) {
    console.log('LoginPage: permissions missing', data);
  }

  render() {
    return (
      <View style={styles.container}>
        <FBLogin style={styles.fbLogin}
                 permissions={['email','user_friends']}
                 onLogin={ this.onLogin }
                 onLogout={ this.onLogout }
                 onLoginFound={this.onLoginFound }
                 onLoginNotFound={ this.onLoginNotFound }
                 onError={ this.onError }
                 onCancel={ this.onCancel }
                 onPermissionsMissing={ this.onPermissionsMissing }
        />
      </View>
    );
  }
}
