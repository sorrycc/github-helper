import React from 'react';
import Event from './Event.jsx';
import Spinner from 'react-spinkit';
import './Events.less';

export default React.createClass({

  propTypes: {
    events: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    const {fetchEventsAsync} =  this.props.actions;
    fetchEventsAsync();
    setInterval(fetchEventsAsync, 1000 * 60 * 5);
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
      this.props.actions.markRead(id);
    } else {
      this.enterTimer = setTimeout(() => {
        this.markReadImmediately = true;
        this.props.actions.markRead(id);
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
    return (<div className="EventsWrap">
      <div className="Events">
        {items.slice(0, 20).map((item, index) =>
          <Event key={index} data={item} actions={this.props.actions}
                 onMouseEnter={this.handleMouseEnter.bind(this, item.id)}
                 onMouseLeave={this.handleMouseLeave}
          />
        )}
      </div>
      { isFetching && <Spinner spinnerName='circle' /> }
    </div>);
  },
});
