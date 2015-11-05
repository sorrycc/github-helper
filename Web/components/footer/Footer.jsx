import React from 'react';
import './Footer.less';
import moment from 'moment';

export default React.createClass({

  propTypes: {
    date: React.PropTypes.string.isRequired,
  },

  handleOpenPreference() {
    if (window.quark) {
      quark.openPreferences();
    }
  },

  render() {
    return <div className="Footer">
      <button onClick={this.handleOpenPreference}>Preference</button>
      {moment(new Date(this.props.date)).fromNow()}
    </div>;
  }
})