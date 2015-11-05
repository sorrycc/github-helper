import { combineReducers } from 'redux';
import events from './events';
import stars from './stars';

export default combineReducers({
  events,
  stars,
});
