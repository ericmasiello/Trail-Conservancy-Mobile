import { LOAD_TRAILS } from '../actions/types';

export default (state = null, action = {}) => {
  'use strict';

  switch(action.type){
    case LOAD_TRAILS:
      return action.payload.data;
  }

  return state;
};
