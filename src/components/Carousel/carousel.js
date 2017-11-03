import React from 'react';
import { connect } from 'dva';
import style from './carousel.less';
import Preview from './preview';

class Carousel extends React.Component {
  state = {
    photos: [],
    currentIndex: 0,
  };
  render() {
    return (
      <div className={style['carousel-wrap']}>
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>
    );
  }
}
export default connect()(Carousel);
