'use strict';
import { PAN_MAP } from '../actions/types';

export default (state = null, action = {}) => {
  switch (action.type) {

    case PAN_MAP:
      return action.payload;
  }

  return state;
};
