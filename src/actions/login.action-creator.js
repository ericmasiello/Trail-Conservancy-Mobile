'use strict';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';

export function loginActionCreator(user){
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

export function logoutActionCreator(){

  return {
    type: USER_LOGGED_OUT
  };
}
