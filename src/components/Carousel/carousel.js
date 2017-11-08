import React from 'react';
import { connect } from 'dva';
import style from './carousel.less';
import Preview from './preview';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch({
      type: 'photo/randomPhotos',
    });
  }
  state = {
    photos: [],
    currentIndex: 0,
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      photos: nextProps.result,
    });
  }
  render() {
    const previews = [];
    for (const i of this.state.photos) {
      previews.push(
        <Preview photo={i} key={previews.length} />,
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
  console.log(models);
  return models.photo.cover;
})(Carousel);
