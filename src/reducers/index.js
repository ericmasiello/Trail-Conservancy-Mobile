'use strict';
import { combineReducers } from 'redux';
import trailAnnotationsReducer from './trail-annotations.reducer';
import trailsReducer from './trails.reducer';
import userReducer from './user.reducer';
import userLocationReducer from './user-location.reducer';

/*
 * The object returned from here represents our GLOBAL
 * application state - the whoooole thing.
 */
const rootReducer = combineReducers({
  user: userReducer,
  annotations: trailAnnotationsReducer,
  trails: trailsReducer,
  userLocation:userLocationReducer
});

export default rootReducer;
