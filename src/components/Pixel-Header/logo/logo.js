import React from 'react';
import style from './logo.less';
import LogoImage from '../../../assets/images/logo.png';

function Logo() {
  return (
    <div className={style['logo-wrap']}>
      <a href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100px" height="40px"
        >
          <text
            fontFamily="Microsoft YaHei"
            fill="rgb(255, 255, 255)"
            transform="matrix( 0.1545245425321, 0, 0, 0.155655482532,18.2973609234161, 32.2402282947077)"
            fontSize="175px"
          >
            ixelice
 </text>
          <path
            fillRule="evenodd"
            fill="rgb(39, 165, 245)"
            d="M4.542,25.969 L14.185,16.256 L14.185,9.780 L4.542,19.493 L4.542,25.969 Z"
          />
          <path
            fillRule="evenodd"
            fill="rgb(21, 81, 154)"
            d="M4.682,0.000 L4.682,13.737 L0.136,18.315 L0.136,4.579 L4.682,0.000 Z"
          />
          <path
            fillRule="evenodd"
            fill="rgb(21, 81, 154)"
            d="M-0.001,30.682 L-0.001,16.946 L4.545,12.367 L4.545,26.104 L-0.001,30.682 Z"
          />
          <path
            fillRule="evenodd"
            fill="rgb(21, 81, 154)"
            d="M4.912,40.002 L4.912,25.919 L-0.006,21.225 L-0.006,35.308 L4.912,40.002 Z"
          />
          <path
            fillRule="evenodd"
            fill="rgb(21, 81, 154)"
            d="M4.543,0.003 L14.186,9.716 L14.186,16.192 L4.543,6.479 L4.543,0.003 Z"
          />
        </svg>
      </a>
    </div >
  );
}
export default Logo;
