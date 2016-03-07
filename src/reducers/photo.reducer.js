'use strict';
import { REQUEST_PHOTO, RECEIVE_PHOTO, SEND_PHOTO, SEND_PHOTO_REPLY } from '../actions/types';

export default (state = {
  photo: [],
  isFetching: false,
  isSaving: false
}, action = {}) => {

  switch (action.type) {
    case REQUEST_PHOTO:
      return {...state, isFetching: true};
    case RECEIVE_PHOTO:
      return {
        isFetching: false,
        photo: action.payload
      };
    case SEND_PHOTO:
      return {...state, isSaving: true};
    case SEND_PHOTO_REPLY:
      return {
        isSaving: false,
        photo: action.payload
      };
  }

  return state;
};
