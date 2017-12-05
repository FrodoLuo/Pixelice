import React from 'react';
import style from './albumCover.less';

function AlbumCover(props) {
  const scrollHandler = () => {
    // console.log('scrolled');
    if (window.document.documentElement.scrollTop === 0) {
      window.document.getElementById('cover').style.height = '600px';
    } else {
      window.document.getElementById('cover').style.height = '256px';
    }
  };
  window.onscroll = scrollHandler;
  return (
    <div
      id="cover"
      style={{
        background: `url(${props.album.photoUrl})`,
      }}
      className={style['album-cover-wrap']}
    >
      <div className={style['album-cover-name']}>
        {props.album.albumName}
      </div>
    </div>
  );
}
export default AlbumCover;
