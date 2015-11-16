jest.dontMock('../events');
const reducer = require('../events');

describe('reducers/events', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      isFetching: false,
      date: null,
    });
  });

  it('should handle events.fetch.start', () => {
    expect(reducer({}, {
      type: 'events.fetch.start',
    })).toEqual({
      isFetching: true,
    });
  });

  it('should handle events.fetch.end', () => {
    expect(reducer({}, {
      type: 'events.fetch.end',
    })).toEqual({
      isFetching: false,
    });
  });

  it('should handle events.set.date', () => {
    expect(reducer({}, {
      type: 'events.set.date',
      date: '2011-11-11 11:11:11',
    })).toEqual({
      date: '2011-11-11 11:11:11',
    });
  });

  it('should handle events.set.items', () => {
    expect(reducer({
      items: [
        {id: 1},
        {id: 2},
      ],
    }, {
      type: 'events.set.items',
      items: [
        {id: 2},
        {id: 3},
      ],
    })).toEqual({
      items: [
        {id: 3},
        {id: 1},
        {id: 2},
      ]
    });
  });

  it('should handle events.markRead.all', () => {
    expect(reducer({
      items: [
        {id: 1},
        {id: 2},
      ],
    }, {
      type: 'events.markRead.all',
    })).toEqual({
      items: [
        {id: 1, read:true},
        {id: 2, read:true},
      ]
    });
  });

  it('should handle events.markRead', () => {
    expect(reducer({
      items: [
        {id: 1},
        {id: 2},
      ],
    }, {
      type: 'events.markRead',
      id: 1,
    })).toEqual({
      items: [
        {id: 1, read:true},
        {id: 2},
      ]
    });
  });

});
