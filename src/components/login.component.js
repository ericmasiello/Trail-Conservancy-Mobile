'use strict';

import React, {
  Component,
  View,
  StyleSheet,
} from 'react-native';
import FBLogin from 'react-native-facebook-login';

export default class LoginPage extends Component {

  onLogin = (data) => {
    console.log('Logged in!');

    this.props.loginActionCreator(data.credentials);
    this.gotoNext();
  };

  onLogout = () => {
    console.log('Logged out.');
    this.props.logoutActionCreator();
  };

  onLoginNotFound = () => {
    console.log('No user logged in.');
    this.props.logoutActionCreator();
  };

  onError = (data) => {
    console.log('ERROR');
    console.log(data);
  };

  onCancel = () => {
    console.log('User cancelled.');
  };

  onPermissionsMissing = (data) => {
    console.log('Check permissions!');
    console.log(data);
  };

  gotoNext = () => {
    this.props.navigator.push({name: 'trailmap'});
  };

  render() {
    return (
      <View style={styles.container}>
        <FBLogin style={{ marginBottom: 10 }}
                 permissions={['email','user_friends']}
                 onLogin={ this.onLogin }
                 onLogout={ this.onLogout }
                 onLoginFound={this.gotoNext}
                 onLoginNotFound={ this.onLoginNotFound }
                 onError={ this.onError }
                 onCancel={ this.onCancel }
                 onPermissionsMissing={ this.onPermissionsMissing }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000000'
  },
  map: {
    height: 500,
    width: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  }
});