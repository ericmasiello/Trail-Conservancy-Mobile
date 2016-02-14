import { REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS } from './types';
import dataModel from '../utilities/data-model';

function requestAnnotations() {
  'use strict';

  return {
    type: REQUEST_ANNOTATIONS
  }
}

function receiveAnnotations(payload) {
  'use strict';

  return {
    type: RECEIVE_ANNOTATIONS,
    payload
  }
}

export function fetchAnnotations() {
  'use strict';

  return (dispatch) => {
    dispatch(requestAnnotations());

    dataModel.fetchMapAnnotations().then((response)=>{
      dispatch(receiveAnnotations(response));
    });
  }
}