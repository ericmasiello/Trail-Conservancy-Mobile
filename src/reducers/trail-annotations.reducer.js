'use strict';
import { REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, SEND_ANNOTATION, SEND_ANNOTATION_REPLY, CACHE_LAST_ANNOTATION } from '../actions/types';

export default (state = {
  annotations: [],
  isFetching: false,
  isSaving: false
}, action = {}) => {

  switch (action.type) {
    case REQUEST_ANNOTATIONS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_ANNOTATIONS:
      return {
        ...state,
        isFetching: false,
        annotations: action.payload
      };
    case SEND_ANNOTATION:
      return {
        ...state,
        isSaving: true
      };
    case SEND_ANNOTATION_REPLY:
      return {
        ...state,
        isSaving: false,
        annotations: action.payload
      };
    case CACHE_LAST_ANNOTATION:
      return {
        ...state,
        lastSavedAnnotation: action.payload
      };
  }

  return state;
};
