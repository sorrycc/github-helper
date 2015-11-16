import assign from 'object-assign';

const initialState = {
  items: [],
  isFetching: false,
  date: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case 'events.fetch.start':
      return assign({}, state, {
        isFetching: true,
      });

    case 'events.fetch.end':
      return assign({}, state, {
        isFetching: false,
      });

    case 'events.set.date':
      return assign({}, state, {
        date: action.date,
      });

    case 'events.set.items':
      const ids = state.items.map(item => item.id);
      const newItems = action.items.filter(item => ids.indexOf(item.id) === -1);
      return assign({}, state, {
        items: newItems.concat(state.items).slice(0, 50),
      });

    case 'events.markRead.all':
      return assign({}, state, {
        items: state.items.map(event => {
          return assign({}, event, {
            read: true,
          });
        }),
      });

    case 'events.markRead':
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
