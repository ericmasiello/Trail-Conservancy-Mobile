'use strict';
import { CURR_POSITION } from '../actions/types';

export default (state = {lat:0,lng:0}, action = {}) => {

  switch (action.type) {
    case CURR_POSITION:
			return {
				...state,
				lat: action.payload.lat,
				lng:action.payload.lng
			};
  }

  return state;
};
