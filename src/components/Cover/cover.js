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
    this.state = ({
      changeProcess: 0.5,
      currentImgIndex: 0,
      coverImageList: [defaultCover],
    });
  }
  componentDidMount() {
    if (this.props.home) {
      setInterval(() => {
        const t = this.state.currentImgIndex;
        this.setState({
          currentImgIndex: t === 4 ? 0 : t + 1,
        });
      }, 8000);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      coverImageList: nextProps.result,
    });
  }
  render() {
    const c = this.props.home ? 'cover-background-home' : 'cover-background';
    return (
      <div
        className={style[c]}
        style={{
          backgroundImage: `url(${this.state.coverImageList[this.state.currentImgIndex].photoUrl})`,
        }}
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
          <div>Author: {this.state.coverImageList[this.state.currentImgIndex].author}</div>
        </div>
        <div className={style['process-bar']}>
          <span
            style={{
              width: `${100 * this.state.changeProcess}%`,
            }}
          />
        </div>
      </div>
    );
  }
}
export default connect((models) => {
  return models.photo.cover;
})(Cover);
