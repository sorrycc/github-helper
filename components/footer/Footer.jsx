import React from 'react';
import './Footer.less';
import moment from 'moment';

export default React.createClass({

  propTypes: {
  },

  handleOpenPreference() {
    if (window.quark) {
      quark.openPreferences();
    }
  },

  render() {
    return <div className="Footer">
      <button onClick={this.handleOpenPreference}>Preference</button>
    </div>;
  }
})