import { REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS } from '../actions/types';

export default (state = {
  annotations: [],
  isFetching: false
}, action = {}) => {
  'use strict';

  switch (action.type) {
    case REQUEST_ANNOTATIONS:
      return {...state, isFetching: true}
    case RECEIVE_ANNOTATIONS:
      return {
        isFetching: false,
        annotations: action.payload
      }
  }

  return state;
};