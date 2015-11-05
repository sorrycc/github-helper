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
      const newItems = payload.items.filter(item => ids.indexOf(item.id) === -1);
      let items;
      console.warn('isInit', payload.isInit);
      if (payload.isInit) {
        items = state.items.concat(newItems);
      } else {
        items = newItems.concat(state.items);
      }
      return assign({}, state, {
        items,
      });

    default:
      return state;
  }
}
