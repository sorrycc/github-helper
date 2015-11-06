import assign from 'object-assign';

const username = 'sorrycc';

export function initAsync(callback) {
  return (dispatch) => {
    dispatch({type: 'STARS_CLEAN_ITEMS'});
    dispatch({type: 'STARS_SET_STATE', payload: { isInitFetching: true }});

    function parseLink(str) {
      const ret = {};
      str.split(',').forEach(function(item) {
        var m = item.match(/<(.+?)>; rel=\"(.+?)\"/);
        ret[m[2]] = m[1];
      });
      return ret;
    }

    function fetchItems(url) {
      fetch(url).then(res => {
        res.json().then(items => {
          dispatch({
            type: 'STARS_SET_ITEMS',
            payload: { items, isInit: true },
          });

          const links = parseLink(res.headers.get('Link'));
          if (links.next) {
            fetchItems(links.next);
          } else {
            dispatch({type: 'STARS_SET_STATE', payload: { isInitFetching: false }});
            dispatch({type: 'STARS_SET_STATE', payload: { isInited: true }});

            if (callback) {
              callback();
            }
          }
        });
      })
    }

    fetchItems(`https://api.github.com/users/${username}/starred?per_page=100&page=1`);
  };
}

export function updateAsync() {
  return (dispatch) => {
    dispatch({type: 'STARS_SET_STATE', payload: { isFetching: true }});

    const url = `https://api.github.com/users/${username}/starred?per_page=100&page=1`;
    fetch(url).then(res => res.json()).then(items => {
      dispatch({
        type: 'STARS_SET_ITEMS',
        payload: { items },
      });
    });
  };
}

export function search(key) {
  return (dispatch) => {
    dispatch({
      type: 'STARS_SET_STATE',
      payload: {key},
    });

    dispatch({
      type: 'SET_ACTIVE_KEY',
      payload: {activeKey: "1"},
    });
  };
}


