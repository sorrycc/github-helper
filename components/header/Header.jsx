import React from 'react';
import './Header.less';

export default React.createClass({

  propTypes: {
    search: React.PropTypes.func.isRequired,
    val: React.PropTypes.any,
  },

  getInitialState() {
    return {
      val: this.props.val || '',
    };
  },

  handleChange(evt) {
    const val = evt.target.value;
    this.setState({ val });
    this.props.search(val);
  },

  render() {
    const { val } = this.state;
    return <div className="Header">
      <input type="search" placeholder="Type to search stars" value={val} autoFocus onChange={this.handleChange} />
    </div>;
  }
})