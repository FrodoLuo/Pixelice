import React from 'react';
import style from './preview.less';

function Preview() {
  return (
    <div className={style['preview-wrap']}>
      <div>
        title here.
      </div>
      <div>
        <img src="" role="presentation" />
      </div>
    </div>
  );
}
export default Preview;
