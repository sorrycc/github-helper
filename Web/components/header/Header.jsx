import React from 'react';
import './Header.less';

export default React.createClass({

  propTypes: {
    isFetching: React.PropTypes.bool.isRequired,
    searchVal: React.PropTypes.any,
  },

  render() {
    const { isFetching, searchVal } = this.props;
    return <div className="Header">
      <input type="search" placeholder="Type to search stars" value={searchVal} autoFocus />
    </div>;
  }
})