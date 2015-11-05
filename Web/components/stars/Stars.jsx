import React from 'react';
import Star from './Star.jsx';
import './Stars.less';

export default React.createClass({

  propTypes: {
    stars: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    const { isInited } = this.props.stars;
    const { initAsync } = this.props.actions;

    if (!isInited) {
      initAsync();
    }
  },

  render() {
    const { items, isInitFetching, isFetching } = this.props.stars;

    if (isInitFetching) {
      return <div>
        数据初始化中，请耐心等待。
      </div>;
    }

    return <div className="Stars">
      {items.map(item => <Star key={item.id} data={item} />)}
    </div>;
  },
});
