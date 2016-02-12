import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';

export function loginActionCreator(user){
 'use strict';
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function logoutActionCreator(){
  'use strict';

  return {
    type: USER_LOGGED_OUT
  }
}