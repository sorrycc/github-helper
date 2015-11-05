import assign from 'object-assign';

export default function(state = {}, action) {

  const { type, payload } = action;

  switch (type) {

    case 'SET_ACTIVE_KEY':
      return assign({}, state, {
        activeKey: payload.activeKey,
      });

    default:
      return state;
  }
}
