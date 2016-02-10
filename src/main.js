'use strict';

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/';
import ROUTES from './config/routes';
import { loginActionCreator } from './actions/login.action-creator';

const store = applyMiddleware()(createStore)(reducers);

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    console.log('Route to ' + route.name);

    var { user } = store.getState();
    var props = {
      route,
      navigator
    };
    let Component;

    if(!user && route.name !== 'SPLASH'){

      //check the local storage
      AsyncStorage.getItem('user').then((value) => {
        user = JSON.parse(value);
        if(user){
          store.dispatch(loginActionCreator(user));

          navigator.immediatelyResetRouteStack([{name: route.name}]);
        } else {
          navigator.immediatelyResetRouteStack([{name: 'LOGIN'}]);
        }

      }).done();

      /*
       * While waiting for async storage to resolve, we hijack the view
       * to display the splash page with a loading message
       */
      Component = ROUTES['SPLASH'];
      props.loading = true; //adds flag to inform splash page to say its loading
    } else {

      //Goes to requested route
      Component = ROUTES[route.name];
    }

    return <Component {...props}/>;
  }

  render() {
    return (
      <Provider store={store}>
        {() => <Navigator
          style={styles.container}
          initialRoute={{name: 'SPLASH'}}
          renderScene={this.renderScene}
          configureScene={()=> { return Navigator.SceneConfigs.FloatFromRight; }}
          />}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
