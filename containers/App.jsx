import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../actions/events';
import * as starActions from '../actions/stars';
import * as tabActions from '../actions/tabs';
import Events from '../components/events/Events.jsx';
import Stars from '../components/stars/Stars.jsx';
import Footer from '../components/footer/Footer.jsx';
import Header from '../components/header/Header.jsx';
import Tabs, { TabPane } from 'antd/lib/tabs';
import './App.less';

const App = React.createClass({

  handleTabChange(activeKey) {
    this._tabActions.setActiveKey(activeKey);
  },

  render() {
    const { events, stars, tabs, dispatch } = this.props;
    const _eventActions = bindActionCreators(eventActions, dispatch);
    const _starActions = bindActionCreators(starActions, dispatch);
    const _tabActions = bindActionCreators(tabActions, dispatch);

    this._tabActions = _tabActions;

    const activeKey = tabs.activeKey || "0";

    return (<div className="App">
      <Header search={_starActions.search} val={stars.key} />
      <Tabs size="small" defaultActiveKey={activeKey} activeKey={activeKey} onChange={this.handleTabChange}>
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
    tabs: state.tabs,
  };
}

export default connect(mapStateToProps)(App);
