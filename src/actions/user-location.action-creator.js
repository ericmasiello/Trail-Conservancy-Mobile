'use strict';
import { CURR_POSITION } from './types';

export function updateUserLocation(lat,lng){
  return {
    type: CURR_POSITION,
    payload: {lat,lng}
  };
}
