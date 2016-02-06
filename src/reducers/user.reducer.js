import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';

export default (state = null, action = {}) => {
  'use strict';

  //TODO: Maybe need to store user credentials in local storage if user goes offline?
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;
    case USER_LOGGED_OUT:
      return null;
  }

  return state;
};