import assign from 'object-assign';
import fetch from '../common/fetch';

const username = 'sorrycc';

export function fetchAsync(events) {
  return (dispatch) => {
    dispatch({type: 'events.fetch.start'});

    const reqHeaders = {};
    if (events.date) {
      reqHeaders['If-Modified-Since'] = events.date;
    }

    return fetch(`https://api.github.com/users/${username}/received_events`, {
        type: 'GET',
        reqHeaders,
      })
      .then(res => {
        const { headers, data } = res;
        const date = headers['Last-Modified'];
        dispatch({type: 'events.fetch.end'});
        dispatch({type: 'events.set.date', date});
        dispatch({type: 'events.set.items', items: data});
      }, error => {
        dispatch({type: 'events.fetch.end'});
      });
  }
}

export function markAllAsRead() {
  return {
    type: 'events.markRead.all',
  };
}

export function markOneAsRead(id) {
  return {
    type: 'events.markRead',
    id,
  };
}
