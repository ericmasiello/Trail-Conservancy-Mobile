'use strict';
import { PAN_MAP, } from './types';

export function panMapActionCreator(lat, lng){
   return {
    type: PAN_MAP,
    payload: {lat,lng}
  };
}
