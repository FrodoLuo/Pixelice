import React from 'react';
import { } from 'antd';
import { connect } from 'dva';

class PhotoDetail extends React.Component {
  state = {
    photoInfo: {
      title: '',
      uploadTime: '',
      intro: '',
      device: '',
      author: '',
      likes: 0,
      stars: 0,
      url: '',
    },
  };
  componentWillMount() {
    // TODO 获取图片详细信息
    console.log('component build');
  }
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}
export default connect()(PhotoDetail);
