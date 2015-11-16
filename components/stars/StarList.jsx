import React from 'react';
import StarItem from './StarItem.jsx';
import './StarList.less';

export default React.createClass({

  propTypes: {
    stars: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    const { isInited } = this.props.stars;
    const { initAsync, updateAsync } = this.props.actions;

    if (!isInited) {
      initAsync(() => {
        setInterval(updateAsync, 1000 * 60 * 5);
      });
    } else {
      updateAsync();
      setInterval(updateAsync, 1000 * 60 * 5);
    }
  },

  render() {
    const { items, isInitFetching, isFetching, key } = this.props.stars;
    let newItems;

    if (key) {
      console.log('key', key);
      newItems = items.filter(item => {
        return item.full_name.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
          (item.description && item.description.toLowerCase().indexOf(key.toLowerCase()) > -1);
      });
    }

    if (isInitFetching) {
      return <div>
        数据初始化中，请耐心等待。
      </div>;
    }

    return <div className="star-list">
      {newItems.slice(0,50).map(item => <StarItem key={item.id} data={item} />)}
    </div>;
  },
});
