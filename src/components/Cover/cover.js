import React from 'react';
import style from './cover.less';
import defaultCover from '../../assets/images/default_cover.jpeg';

function Cover(props) {
  const c = props.home ? 'cover-background-home' : 'cover-background';
  return (
    <div
      className={style[c]}
      style={{ backgroundImage: `url(${defaultCover})` }}
    >
      {props.home ?
        (
          <div className={style['cover-search-wrap']}>
            <div className="cover-content">
              <p>Pixelice</p>
              <p>Search, coming soon.</p>
            </div>
          </div>
        )
        :
        ''
      }
      <div className={style['cover-author']}>
        <div>Author: {props.author}</div>
      </div>
    </div>
  );
}
export default Cover;
