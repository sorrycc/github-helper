import assign from 'object-assign';

export default function(state = { items:[] }, action) {

  const { type, payload } = action;

  switch (type) {

    case 'STARS_SET_STATE':
      return assign({}, state, payload);

    case 'STARS_CLEAN_ITEMS':
      return assign({}, state, {
        items: [],
      });

    case 'STARS_SET_ITEMS':
      const ids = state.items.map(item => item.id);
      const newItems = payload.items
        .filter(item => ids.indexOf(item.id) === -1)
        .map(item => assign({}, {
          created_at: item.created_at,
          id: item.id,
          owner: {
            avatar_url: item.owner.avatar_url,
          },
          html_url: item.html_url,
          stargazers_count: item.stargazers_count,
          language: item.language,
          description: item.description,
          full_name: item.full_name,
        }));
      let items;
      if (payload.isInit) {
        items = state.items.concat(newItems);
      } else {
        items = newItems.concat(state.items);
      }
      return assign({}, state, {
        items,
      });

    case 'STARS_SEARCH':
      return assign({}, state, {
        key: payload.key,
      });

    default:
      return state;
  }
}
