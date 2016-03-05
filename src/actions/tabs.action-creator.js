'use strict';
import { SWITCH_TAB, } from './types';

export function switchTabActionCreator(selectedTab){
  return {
    type: SWITCH_TAB,
    payload: {selectedTab}
  };
}
