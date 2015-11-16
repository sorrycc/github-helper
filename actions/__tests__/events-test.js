jest.dontMock('../events');

const configureStore = require('redux-mock-store-jest');
const events = require('../events');
const fetch = require('../../common/fetch');

describe('actions/events', () => {

  beforeEach(() => {
    fetch.__setSuccessResult(null);
    fetch.__setFailResult(null);
  });

  pit('fetchAsync.success', () => {
    fetch.__setSuccessResult({
      headers: { 'Last-Modified': 'today' },
      data: [1, 2]
    });

    const expectedActions = [
      { type: 'events.fetch.start' },
      { type: 'events.fetch.end' },
      { type: 'events.set.date', date: 'today' },
      { type: 'events.set.items', items: [1, 2] },
    ];

    return new Promise(resolve => {
      const mockStore = configureStore([]);
      const store = mockStore({}, expectedActions, resolve);
      events.fetchAsync({date:'1111-11-11 11:11'})(store.dispatch);

      expect(fetch.mock.calls[0][1]).toEqual({
        type: 'GET',
        reqHeaders: {
          'If-Modified-Since': '1111-11-11 11:11',
        },
      });
    });
  });

  pit('fetchAsync.fail', () => {
    fetch.__setFailResult({});

    const expectedActions = [
      { type: 'events.fetch.start' },
      { type: 'events.fetch.end' },
    ];

    return new Promise(resolve => {
      const mockStore = configureStore([]);
      const store = mockStore({}, expectedActions, resolve);
      events.fetchAsync({})(store.dispatch);
    });
  });

  it('markAllAsRead', () => {
    expect(events.markAllAsRead()).toEqual({
      type: 'events.markRead.all',
    });
  });

  it('markOneAsRead', () => {
    expect(events.markOneAsRead('1')).toEqual({
      type: 'events.markRead',
      id: '1',
    });
  });
});

