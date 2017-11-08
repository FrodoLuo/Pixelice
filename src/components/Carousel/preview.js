import React from 'react';
import style from './preview.less';

function Preview(props) {
  console.log(props);
  return (
    <div className={style['preview-wrap']}>
      <div className={style['preview-title-wrap']}>
        title here.
      </div>
      <div className={style['preview-img-wrap']}>
        <img src={props.photo.zipUrl} role="presentation" />
      </div>
    </div>
  );
}
export default Preview;
