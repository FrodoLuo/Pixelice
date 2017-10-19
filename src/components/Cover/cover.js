import React from 'react';
import { connect } from 'dva';
import { Input, Row, Col } from 'antd';
import style from './cover.less';
import defaultCover from '../../assets/images/default_cover.jpeg';

const Search = Input.Search;

class Cover extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch({
      type: 'photo/randomPhoto',
    });
  }
  render() {
    console.log(this.props);
    const c = this.props.home ? 'cover-background-home' : 'cover-background';
    return (
      <div
        className={style[c]}
        style={{ backgroundImage: `url(${this.props.result.photoUrl})` }}
      >
        {this.props.home ?
          (
            <div className={style['background-mask']}>
              <div>
                <Row type="flex" justify="center">
                  <div className={style['cover-title-wrap']}>
                    <p style={{ color: 'white', fontSize: '48px' }}>Pixelice</p>
                    <p style={{ color: 'white', fontSize: '24px' }}>面向所有人的摄影社区</p>
                  </div>
                </Row>
                <Row type="flex" justify="center">
                  <div className={style['cover-search-wrap']}>
                    <Search placeholder="Coming Soon." />
                  </div>
                </Row>
              </div>
            </div>
          )
          :
          ''
        }
        <div className={style['cover-author']}>
          <div>Author: {this.props.result.author}</div>
        </div>
      </div>
    );
  }
}
export default connect((models) => {
  return models.photo.cover;
})(Cover);
