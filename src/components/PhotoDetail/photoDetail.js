import React from 'react';
import { Row, Col, Icon, Avatar, Tag } from 'antd';
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
  componentDidMount() {

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
  handleLike = (e) => {
    const { props } = this;
    e.stopPropagation();
    if (props.liked) {
      props.dispatch({
        type: 'social/dislike',
        payload: props.photoInfo.photoId,
      });
      const k = parseInt(window.document.getElementById(`${props.photoInfo.photoId}_liked`).innerHTML, 10);
      if (k >= props.photoInfo.liked && k <= props.photoInfo.liked + 1) { window.document.getElementById(`${props.photoInfo.photoId}_liked`).innerHTML = k - 1; }
    } else {
      props.dispatch({
        type: 'social/like',
        payload: props.photoInfo.photoId,
      });
      const k = parseInt(window.document.getElementById(`${props.photoInfo.photoId}_liked`).innerHTML, 10);
      if (k <= props.photoInfo.liked && k >= props.photoInfo.liked - 1) { window.document.getElementById(`${props.photoInfo.photoId}_liked`).innerHTML = k + 1; }
    }
  };
  render() {
    const avatar = this.props.photoInfo.avatarUrl || defaultAvatar;
    console.log(this.props.photoInfo);
    const tags = [];
    if (this.props.photoInfo.tags) {
      const taglist = this.props.photoInfo.tags.split(' ');
      for (const item of taglist) {
        tags.push(<Tag><a
          href={`/square/search?searchkey=${item}`}
        >{item}</a></Tag>);
      }
    }
    return (
      <div style={{ height: '100%' }}>
        <div className={style['photo-wrap']}>
          <img src={this.props.photoInfo.photoUrl} role="presentation" />
        </div>
        <div className={style['detail-wrap']}>
          <a className={style['detail-avatar']} href={`/user/${this.props.photoInfo.userId}`}>
            {this.props.photoInfo.nickName}&nbsp;<Avatar src={avatar} />
          </a>
          <div className={style['detail-title']}>
            {this.props.photoInfo.title}
          </div>
          <span className={style['detail-date']}>{this.props.photoInfo.date}</span>
          <span>{tags}</span>
          <p>
            {this.props.photoInfo.intro}
          </p>
          <div className={style['social-wrap']}>
            <i style={{ fontSize: 24, alignSelf: 'top' }} className="iconfont icon-zone" onClick={this.shareToZone} />
            <i style={{ fontSize: 24, alignSelf: 'top' }} className="iconfont icon-WeBlog-Thirdpartylogin" onClick={this.shareToSina} />
            <Icon style={{ lineHeight: '36px' }} onClick={this.handleLike} type={this.props.liked ? 'heart' : 'heart-o'} />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(models => models.social)(PhotoDetail);
