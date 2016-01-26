import React, { View, StyleSheet, Text, Image, Navigator } from 'react-native';
import FBLogin from 'react-native-facebook-login';
import { FBLoginManager } from 'NativeModules';

/*
 * FIXME: this should probably go into some app configuration object somewhere. This is fine for now.
 */
const FB_PHOTO_WIDTH = 200;

module.exports = React.createClass({

  getInitialState() {
    return {
      user: null
    };
  },
  onLogin( data ) {
    console.log("Logged in!");
    console.log(data);
    this.setState({ user: data.credentials });
    this.gotoNext();
  },

  onLogout(){
    console.log("Logged out.");
    this.setState({ user : null });
  },

  onLoginNotFound(){
    console.log("No user logged in.");
    this.setState({ user : null });
  },

  onError(data){
    console.log("ERROR");
    console.log(data);
  },
  onCancel(){
    console.log("User cancelled.");
  },
  onPermissionsMissing(data){
    console.log("Check permissions!");
    console.log(data);
  },


  render() {
    const { user } = this.state;

    return (
      <View style={styles.container}>
        <FBLogin style={{ marginBottom: 10 }}
                 permissions={["email","user_friends"]}
                 onLogin={ this.onLogin }
                 onLogout={ this.onLogout }
                 onLoginFound={this.gotoNext}
                 onLoginNotFound={ this.onLoginNotFound }
                 onError={ this.onError }
                 onCancel={ this.onCancel }
                 onPermissionsMissing={ this.onPermissionsMissing }
          />
        <Text>{ user ? user.token : "N/A" }</Text>
      </View>
    );
 
  },
  gotoNext() {
    console.log('go to next');
    this.props.navigator.push({name: 'trailmap'});
  },
  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

});

var styles = StyleSheet.create({
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


var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;
    var self = this;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          }
        });
      }).done();
  },

  render: function(){
    if(this.state.photo == null) return this.renderLoading();
    
    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});



