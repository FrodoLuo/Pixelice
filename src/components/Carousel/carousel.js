import React from 'react';
import { connect } from 'dva';
import style from './carousel.less';

class Carousel extends React.Component {
  state = {
    photos: [],
    currentIndex: 0,
  };
  render() {
    return (
      <div className={style['carousel-wrap']}>
        <div>
          k
        </div>
        carousel
      </div>
    );
  }
}
export default connect()(Carousel);
