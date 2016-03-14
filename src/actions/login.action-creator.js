'use strict';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';

function loginActionCreator(user){
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

function logoutActionCreator(){

  return {
    type: USER_LOGGED_OUT
  };
}

export {loginActionCreator,logoutActionCreator};
