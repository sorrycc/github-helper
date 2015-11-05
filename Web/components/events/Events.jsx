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


  render() {
    const { items, isFetching } = this.props.events;
    const { markAllRead } = this.props.actions;
    return (<div className="EventsWrap">
      <div className="Events">
        {items.slice(0, 20).map((item, index) =>
          <Event key={index} data={item} actions={this.props.actions} />
        )}
      </div>
      { isFetching && <Spinner spinnerName='circle' /> }
    </div>);
  },
});
