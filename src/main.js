'use strict';

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/';
import ROUTES from './config/routes';
import { loginActionCreator } from './actions/login.action-creator';
import thunkMiddleware from 'redux-thunk';
import userStorageMiddleware from './middleware/user-storage.middleware';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actions/types';

import devTools from 'remote-redux-devtools';


// Hook in redux native devtools to the store.  This allows use to debug redux store using chrome plugin.
// This is worth installing, since it allows time travel debugging etc
// see https://github.com/zalmoxisus/remote-redux-devtools
// https://github.com/reactjs/redux/blob/5a1b3e045f624fc3e96701c4e9b7193a49accfdd/docs/api/compose.md

const store = createStore(
  reducers,
  compose(
    applyMiddleware(userStorageMiddleware('user', USER_LOGGED_IN, USER_LOGGED_OUT),thunkMiddleware),
    devTools()
  )
);

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

    if (route.name == 'LOGIN'){
      Component = ROUTES['LOGIN'];
      return <Component {...props}/>;
    }

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
        <Navigator
          style={styles.container}
          initialRoute={{name: 'SPLASH'}}
          renderScene={this.renderScene}
          configureScene={()=> { return Navigator.SceneConfigs.FloatFromRight; }}
          />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
