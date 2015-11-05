import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../actions/events';
import * as starActions from '../actions/stars';
import Events from '../components/events/Events.jsx';
import Stars from '../components/stars/Stars.jsx';
import Footer from '../components/footer/Footer.jsx';
import Header from '../components/header/Header.jsx';
import Tabs, { TabPane } from 'antd/lib/tabs';
import './App.less';

const App = React.createClass({

  render() {
    const { events, stars, dispatch } = this.props;
    const _eventActions = bindActionCreators(eventActions, dispatch);
    const _starActions = bindActionCreators(starActions, dispatch);

    console.warn('events', events);
    console.warn('stars', stars);

    return (<div className="App">
      <Header isFetching={events.isFetching} />
      <Tabs defaultActiveKey="0" size="small">
        <TabPane tab="Events" key="0"><Events events={events} actions={_eventActions} /></TabPane>
        <TabPane tab="Stars" key="1"><Stars stars={stars} actions={_starActions} /></TabPane>
      </Tabs>
      <Footer date={events.date} />
    </div>);
  },
});

function mapStateToProps(state) {
  return {
    stars: state.stars,
    events: state.events,
  };
}

export default connect(mapStateToProps)(App);
