import React from 'react';
import { Row, Col, Icon, Avatar } from 'antd';
import { connect } from 'dva';
import style from './photoDetail.less';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInfo: props.photoInfo,
      comment: [],
    };
  }
  shareToSina = () => {
    // eslint-disable-next-line
    const sharesinastring = `http://v.t.sina.com.cn/share/share.php?title=${'分享来自Pixelice的照片'}&url=${window.location.href}&content=utf-8&sourceUrl=${window.location.href}&pic=${this.props.photoInfo.photoUrl}`;
    window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
  }
  shareToZone = () => {
    const p = {
      url: window.location.href,
      showcount: '0',
      desc: '',
      summary: '分享一张来自Pixelice的照片',
      title: '分享来自pixelice的照片',
      site: 'Pixelice',
      pics: this.props.photoInfo.photoUrl,
      style: '203',
      width: 22,
      height: 22,
    };
    const s = [];
    for (const i in p) {
      if (i) {
        s.push(i.concat('=').concat(encodeURIComponent(p[i] || '')));
      }
    } const shareqqzonestring = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'${s.join('&')}`;
    window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
  }
  render() {
    const avatar = this.props.photoInfo.avatarUrl || defaultAvatar;
    console.log(this.props.photoInfo);
    return (
      <div style={{ height: '100%' }}>
        <div className={style['photo-wrap']}>
          <img src={this.props.photoInfo.photoUrl} role="presentation" />
        </div>
        <div className={style['detail-wrap']}>
          <a className={style['detail-avatar']}>
            {this.props.photoInfo.nickName}&nbsp;<Avatar src={avatar} />
          </a>
          <div className={style['detail-title']}>
            {this.props.photoInfo.title}
          </div>
          <span className={style['detail-date']}>{this.props.photoInfo.date}</span>
          <p>
            {this.props.photoInfo.intro}
          </p>
          <div className={style['social-wrap']}>
            <i style={{ fontSize: 24, alignSelf: 'top' }} className="iconfont icon-zone" onClick={this.shareToZone} />
            <i style={{ fontSize: 24, alignSelf: 'top' }} className="iconfont icon-WeBlog-Thirdpartylogin" onClick={this.shareToSina} />
            <Icon style={{ lineHeight: '36px' }} type="heart" />
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(PhotoDetail);
