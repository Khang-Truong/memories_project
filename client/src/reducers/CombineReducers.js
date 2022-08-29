import { combineReducers } from 'redux';

import posts from './PostReducer.js';

export const allReducers = combineReducers({ posts});
