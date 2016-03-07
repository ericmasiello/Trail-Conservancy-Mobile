'use strict';
import { REQUEST_TRAILS, RECEIVE_TRAILS } from '../actions/types';

export default (state = {
  trails: [],
  isFetching: false
}, action = {}) => {

  switch (action.type) {
    case REQUEST_TRAILS:
      return {...state, isFetching: true};
    case RECEIVE_TRAILS:
      return {
        isFetching: false,
        trails: action.payload
      };
  }

  return state;
};
