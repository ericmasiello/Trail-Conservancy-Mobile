import { combineReducers } from 'redux';
import trailsReducer from './trails.reducer';
import userReducer from './user.reducer';

/*
 * The object returned from here represents our GLOBAL
 * application state - the whoooole thing.
 */
const rootReducer = combineReducers({
  user: userReducer,
  trails: trailsReducer
});

export default rootReducer;