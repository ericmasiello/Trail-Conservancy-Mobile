'use strict';
import { PAN_MAP, } from './types';

export function panMapActionCreator(panToLat, panToLng){
   return {
    type: PAN_MAP,
    payload: {panToLat:panToLat,panToLng:panToLng}
  };
}
