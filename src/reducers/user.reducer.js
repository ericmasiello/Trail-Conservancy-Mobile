import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';
import React, { AsyncStorage } from 'react-native';

export default (state = null, action = {}) => {
  'use strict';

  //TODO: Maybe need to store user credentials in local storage if user goes offline?
  switch (action.type) {
    case USER_LOGGED_IN:
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload;
    case USER_LOGGED_OUT:
      AsyncStorage.setItem('user', '');
      return null;
  }

  return state;
};