import { combineReducers } from 'redux';
import events from './events';
import stars from './stars';
import tabs from './tabs';

export default combineReducers({
  events,
  stars,
  tabs,
});
