import React from 'react';
import { openUrl } from '../../common/utils';

export default React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired,
  },

  handleClick() {
    openUrl(this.props.data.html_url);
  },

  render() {
    const {
        language, full_name, stargazers_count, description,
        owner,
      } = this.props.data;

    return <div className="star-item" onClick={this.handleClick}>
      <div className="avatar">
        <img src={owner.avatar_url + '&s=40'} width="16" height="16" />
      </div>
      <div className="main">
        <div>
          <b>{full_name}</b>
          {language}
          <i>({stargazers_count})</i>
        </div>
        <div className="description">
          {description}
        </div>
      </div>
    </div>;
  },
});
