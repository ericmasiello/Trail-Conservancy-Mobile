import { AsyncStorage } from 'react-native';

export default (key, updateOnActionType, deleteOnActionType) => store => next => action => { //eslint-disable-line strict
  'use strict';

  if(action.type === updateOnActionType){
    AsyncStorage.setItem(key, JSON.stringify(action.payload));
  } else if(action.type === deleteOnActionType){
    AsyncStorage.setItem(key, '');
  }
  
  return next(action);
};
