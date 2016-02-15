'use strict';
import { REQUEST_TRAILS, RECEIVE_TRAILS } from './types';
import dataModel from '../utilities/data-model';

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

export function fetchTrails() {

  return (dispatch) => {
    dispatch(requestTrails());

    dataModel.fetchMapTrail().then((response)=>{
      dispatch(receiveTrails(response));
    });
  };
}
