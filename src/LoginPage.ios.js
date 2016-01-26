'use strict';

import React from 'react-native';

const {
  Component,
  View,
  StyleSheet,
} = React;
 
import FBLogin from 'react-native-facebook-login';

class LoginPage extends Component {

   constructor(props) {
    super(props);

    this.state = {
      user: null
    };

   }

  onLogin = (data) =>  {
    console.log('Logged in!');
    console.log(data);
    this.setState({ user: data.credentials });
    this.gotoNext();
  };

  onLogout = () => {
    console.log('Logged out.');
    this.setState({ user : null });
  };

  onLoginNotFound = () => {
    console.log('No user logged in.');
    this.setState({ user : null });
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

  gotoNext = () =>  {
     this.props.navigator.push({name: 'trailmap'});
  };

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

module.exports = LoginPage;

//export default LoginPage;
