import React from 'react';
import style from './albumCover.less';

function AlbumCover(props) {
  return (
    <div
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
