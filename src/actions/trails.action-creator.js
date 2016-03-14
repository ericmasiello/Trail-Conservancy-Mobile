'use strict';
import { REQUEST_TRAILS, RECEIVE_TRAILS } from './types';
import {fetchMapTrail} from '../utilities/data-model';


function requestTrails() {
  return {
    type: REQUEST_TRAILS
  };
}

function receiveTrails(payload) {
  return {
    type: RECEIVE_TRAILS,
    payload
  };
}

function fetchTrailsActionCreator() {

  return (dispatch) => {
    dispatch(requestTrails());

    fetchMapTrail().then((response)=>{
      dispatch(receiveTrails(response));
    });
  };
}

export {fetchTrailsActionCreator};
