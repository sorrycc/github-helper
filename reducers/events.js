import assign from 'object-assign';

export default function(state = { items:[] }, action) {

  switch (action.type) {

    case 'EVENTS_FETCH':
      return assign({}, state, {
        isFetching: true,
      });

    case 'EVENTS_FETCH_COMPLETE':
      return assign({}, state, {
        isFetching: false,
      });

    case 'EVENTS_SET_DATE':
      return assign({}, state, {
        date: action.date,
      });

    case 'EVENTS_SET':
      const ids = state.items.map(item => item.id);
      const newItems = action.items.filter(item => ids.indexOf(item.id) === -1);
      return assign({}, state, {
        items: newItems.concat(state.items).slice(0, 50),
      });

    case 'EVENTS_MARK_ALL_READ':
      return assign({}, state, {
        items: state.items.map(event => {
          return assign({}, event, {
            read: true,
          });
        }),
      });

    case 'EVENTS_MARK_READ':
      return assign({}, state, {
        items: state.items.map(item => {
          if (item.id === action.id) {
            return assign({}, item, {read: true});
          } else {
            return item;
          }
        }),
      });

    default:
      return state;
  }
}
