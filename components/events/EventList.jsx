import React from 'react';
import EventItem from './EventItem.jsx';
import Spinner from 'react-spinkit';
import './EventList.less';

export default React.createClass({

  propTypes: {
    events: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    this.fetchEvents();
    const interval = 1000 * 60 * 5; // 5 分钟
    setInterval(this.fetchEvents, interval);
  },

  fetchEvents() {
    const { events } = this.props;
    this.props.actions.fetchAsync(events);
  },

  enterTimer: null,
  leaveTimer: null,
  enterDelay: 500,
  leaveDelay: 300,
  markReadImmediately: false,

  handleMouseEnter(id) {
    if (this.enterTimer) clearTimeout(this.enterTimer);
    if (this.leaveTimer) clearTimeout(this.leaveTimer);

    if (this.markReadImmediately) {
      this.props.actions.markOneAsRead(id);
    } else {
      this.enterTimer = setTimeout(() => {
        this.markReadImmediately = true;
        this.props.actions.markOneAsRead(id);
      }, this.enterDelay);
    }
  },

  handleMouseLeave() {
    if (this.enterTimer) clearTimeout(this.enterTimer);
    if (this.leaveTimer) clearTimeout(this.leaveTimer);

    this.leaveTimer = setTimeout(() => {
      this.markReadImmediately = false;
    }, this.leaveDelay);
  },

  render() {
    const { items, isFetching } = this.props.events;
    return (<div className="event-list">
      <div className="list">
        {items.slice(0, 50).map((item, index) =>
          <EventItem key={index} data={item} actions={this.props.actions}
                     onMouseEnter={this.handleMouseEnter.bind(this, item.id)}
                     onMouseLeave={this.handleMouseLeave}
          />
        )}
      </div>
      { isFetching && <Spinner spinnerName='circle' /> }
    </div>);
  },
});
