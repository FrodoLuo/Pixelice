import React from 'react';
import { Icon } from 'antd';
import style from './albumCover.less';

function AlbumCover(props) {
  console.log(window.document.referrer);
  const scrollHandler = () => {
    // console.log('scrolled');
    if (window.document.documentElement.scrollTop === 0) {
      window.document.getElementById('cover').style.height = '100vh';
    } else {
      window.document.getElementById('cover').style.height = '50vh';
    }
  };
  window.onscroll = scrollHandler;
  return (
    <div
      id="cover"
      style={{
        backgroundImage: `url(${props.album.photoUrl})`,
        backgroundSize: 'cover',
      }}
      className={style['album-cover-wrap']}
    >
      <div className={style['album-description']}>
        <Icon type="edit" />&nbsp;{props.album.description}
      </div>
      <div className={style['album-cover-name']}>
        {props.album.albumName}
      </div>
      {props.fromInfo ? (
        <div className={style['back-button']}>
          <a href="/infocenter/album">
            <Icon type="caret-left" />
          </a>
        </div>
      ) : ''}
    </div>
  );
}
export default AlbumCover;
