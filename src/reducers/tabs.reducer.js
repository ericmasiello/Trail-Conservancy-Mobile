'use strict';
import { SWITCH_TAB } from '../actions/types';

export default (state = null, action = {}) => {
  switch (action.type) {
    case SWITCH_TAB:
      return action.payload;
  }

  return state;
};
