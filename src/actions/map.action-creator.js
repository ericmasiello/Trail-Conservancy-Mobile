'use strict';
import { PAN_MAP, } from './types';

function panMapActionCreator(lat, lng){
   return {
    type: PAN_MAP,
    payload: {lat,lng}
  };
}

export {panMapActionCreator};
