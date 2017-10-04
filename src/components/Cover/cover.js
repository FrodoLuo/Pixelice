import React from 'react';
import style from './cover.less';
import defaultCover from '../../assets/images/default_cover.jpeg';

function Cover(props) {
  const height = window.document.body.clientHeight;
  return (
    <div
      className={style['cover-background']}
      style={{ backgroundImage: `url(${defaultCover})` }}
    >
      <div>test</div>
      <div>searchboad</div>
    </div>
  );
}
export default Cover;
