import React from 'react';
import { connect } from 'dva';
import style from './carousel.less';
import Preview from './preview';

class Carousel extends React.Component {
  state = {
    photos: this.props.data,
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      photos: nextProps.data,
    });
  }
  render() {
    const previews = [];
    for (const i of this.state.photos) {
      previews.push(
        <Preview photo={i} key={previews.length} index={previews.length} />,
      );
    }
    return (
      <div className={style['carousel-wrap']}>
        {previews}
      </div>
    );
  }
}
export default connect((models) => {
  return models.photo.cover;
})(Carousel);
