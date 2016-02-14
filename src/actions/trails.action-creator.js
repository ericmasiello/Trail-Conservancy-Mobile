import { REQUEST_TRAILS, RECEIVE_TRAILS } from './types';
import dataModel from '../utilities/data-model';

function requestTrails() {
  'use strict';

  return {
    type: REQUEST_TRAILS
  }
}

function receiveTrails(payload) {
  'use strict';

  return {
    type: RECEIVE_TRAILS,
    payload
  }
}

export function fetchTrails() {
  'use strict';

  return (dispatch) => {
    dispatch(requestTrails());

    dataModel.fetchMapTrail().then((response)=>{
      dispatch(receiveTrails(response));
    });
  }
}