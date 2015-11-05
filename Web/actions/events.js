import assign from 'object-assign';

const username = 'sorrycc';

export function fetchEventsAsync() {
  return (dispatch, getState) => {
    const events = getState().events || {};
    if (events.isEventsFetching) return;
    dispatch({type: 'EVENTS_FETCH'});

    const headers = {};
    if (events.date) {
      headers['If-Modified-Since'] = events.date;
    }

    return fetch(`https://api.github.com/users/${username}/received_events`, {
        type: 'GET',
        headers,
      })
      .then(res => {
        const date = res.headers.get('Last-Modified');
        dispatch({type: 'EVENTS_FETCH_COMPLETE'});
        dispatch({type: 'EVENTS_SET_DATE', date});

        if (res.status === 200) {
          res.json().then(items => {
            if (items.length) dispatch({type: 'EVENTS_SET', items});
          });
        }
      }, error => {
        dispatch({type: 'EVENTS_FETCH_COMPLETE'});
        console.log(error);
      })
  }
}

export function markAllRead() {
  return {
    type: 'EVENTS_MARK_ALL_READ',
  };
}

export function markRead(id) {
  return {
    type: 'EVENTS_MARK_READ',
    id,
  };
}
