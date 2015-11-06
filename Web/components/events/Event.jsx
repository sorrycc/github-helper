import React from 'react';
import moment from 'moment';
import getType from './getType';
import getUrl from './getUrl';
import { openUrl } from '../../common/utils';

export default React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  handleClick() {
    const { type } = this.props.data;
    const url = getUrl[type]
      ? getUrl[type](this.props.data)
      : `https://github.com/${this.props.data.repo.name}`;
    openUrl(url);
  },

  render() {
    const { id, read, type, actor, repo, created_at } = this.props.data;
    const { markRead } = this.props.actions;

    return <div className="Event" onMouseEnter={(e) => markRead(id)} onClick={this.handleClick}>
        <i className={read ? 'readed' : 'unread'}></i>
        <img src={actor.avatar_url + 'v=3&s=40'} width="16" height="16" />
        <span className="user">
          {actor.login}
        </span>
        <div style={{flex:1}}>
          <b className={`type-${type}`}>{getType(type, this.props.data)}</b>
          <span className="repo">{repo.name}</span>
          <strong>{moment(created_at).fromNow()}</strong>
        </div>
      </div>;
  },
});
