import { combineReducers } from 'redux';
import TrailReducer from './trail.reducer';

const rootReducer = combineReducers({
  trails: TrailReducer,
});

export default rootReducer;
