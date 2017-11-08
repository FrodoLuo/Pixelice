import React from 'react';
import { connect } from 'dva';
import style from './preview.less';

function Preview(props) {
  const handleClick = () => {
    console.log('bla');
    props.dispatch({
      type: 'photo/setCoverIndex',
      payload: props.index,
    });
  };
  return (
    <div className={style['preview-wrap']} onClick={handleClick}>
      <div className={style['preview-title-wrap']}>
        {props.photo.title}
      </div>
      <div className={style['preview-img-wrap']}>
        <img src={props.photo.zipUrl} role="presentation" />
      </div>
    </div>
  );
}
export default connect()(Preview);
