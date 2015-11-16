jest.mock('moment');
jest.dontMock('../EventItem.jsx');
jest.dontMock('../getType');
jest.dontMock('../Types');
jest.dontMock('../getUrl');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import utils from '../../../common/utils';

const EventItem = require('../EventItem');
let eventItem;

describe('EventItem', () => {

  describe('DeleteEvent', () => {

    beforeEach(() => {
      const data = {
        read: false,
        type: 'DeleteEvent',
        actor: {
          avatar_url: 'url',
          login: 'sorrycc',
        },
        repo: {
          name: 'abc'
        },
        created_at: '2015-11-11 11:11:11',
      };
      const noop = () => {};
      eventItem = TestUtils.renderIntoDocument(
        <EventItem data={data} onMouseEnter={noop} onMouseLeave={noop} />
      );
    });

    it('should render', () => {
      const node = ReactDOM.findDOMNode(eventItem);
      expect(node.textContent).toEqual('sorryccdeletedabc5 days ago');
    });

    it('should openUrl after click', () => {
      const node = ReactDOM.findDOMNode(eventItem);
      TestUtils.Simulate.click(node);
      expect(utils.openUrl.mock.calls[0][0]).toEqual('https://github.com/abc');
    });

  });

  describe('IssuesEvent', () => {
    beforeEach(() => {
      const data = {
        read: false,
        type: 'IssuesEvent',
        payload: {
          issue: {
            html_url: 'http://abc.com',
          },
        },
        actor: {
          avatar_url: 'url',
          login: 'sorrycc',
        },
        repo: {
          name: 'abc'
        },
        created_at: '2015-11-11 11:11:11',
      };
      const noop = () => {};
      eventItem = TestUtils.renderIntoDocument(
        <EventItem data={data} onMouseEnter={noop} onMouseLeave={noop} />
      );
    });

    it('should openUrl after click', () => {
      const node = ReactDOM.findDOMNode(eventItem);
      TestUtils.Simulate.click(node);
      expect(utils.openUrl.mock.calls[1][0]).toEqual('http://abc.com');
    });
  });

});
