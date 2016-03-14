'use strict';
import { CURR_POSITION } from './types';

function updateUserLocationActionCreator(lat,lng){
  return {
    type: CURR_POSITION,
    payload: {lat,lng}
  };
}
export {updateUserLocationActionCreator};
