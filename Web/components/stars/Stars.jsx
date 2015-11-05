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
    const { items, isInitFetching, isFetching, key } = this.props.stars;

    let newItems = items;
    if (key) {
      console.log('key', key);
      newItems = newItems.filter(item => {
        return item.full_name.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
          (item.description && item.description.toLowerCase().indexOf(key.toLowerCase()) > -1);
      });
    }

    if (isInitFetching) {
      return <div>
        数据初始化中，请耐心等待。
      </div>;
    }

    return <div className="Stars">
      {newItems.slice(0,50).map(item => <Star key={item.id} data={item} />)}
    </div>;
  },
});
