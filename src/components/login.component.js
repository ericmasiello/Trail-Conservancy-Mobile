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

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLoginNotFound = this.onLoginNotFound.bind(this);
    this.onLoginFound = this.onLoginFound.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  onLogin(data) {
    console.log('LoginPage: logged in');
    this.props.loginActionCreator(data.credentials);
    this.gotoNext();
  }

  onLogout() {
    console.log('LoginPage: logged out');
    this.props.logoutActionCreator();
  }

  onLoginFound(data) {
    console.log("LoginPage: existing login found.");
    this.props.loginActionCreator(data.credentials);
    this.gotoNext();
  }

  onLoginNotFound() {
    console.log('LoginPage: login not found');
    this.props.logoutActionCreator();
  }

  onError(data) {
    console.log('LoginPage: error', data);
  }

  onCancel() {
    console.log('LoginPage: cancel');
  }

  onPermissionsMissing(data) {
    console.log('LoginPage: permissions missing', data);
  }

  gotoNext() {
    this.props.navigator.push({name: 'LANDING_PAGE'});
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