import React from 'react';
import { Icon } from 'antd';
import style from './searchBar.less';

function SearchBar() {
  return (
    <div className={`${style['search-bar-wrap']} ${style['search-bar-wrap-large']}`}>
      <input placeholder="Search Your Interested Photos." />
      <div className={style['search-bar-button']}>
        <a href="/square">
          <Icon type="search" />
        </a>
      </div>
    </div>
  );
}
export default SearchBar;
