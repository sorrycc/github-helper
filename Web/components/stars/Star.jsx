import React from 'react';

export default React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired,
  },

  render() {
    const {
        language, full_name, html_url, stargazers_count, description,
        owner,
      } = this.props.data;

    return <div className="Star">
      <div className="avatar">
        <img src={owner.avatar_url + 's=40'} width="16" height="16" />
      </div>
      <div className="main">
        <div>
          <a href={html_url} target="_blank">{full_name}</a>
          {language}
          ({stargazers_count})
        </div>
        <div>
          {description}
        </div>
      </div>
    </div>;
  },
});
