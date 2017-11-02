import React from 'react';
import style from './searchBar.less';

function SearchBar() {
  return (
    <div className={`${style['search-bar-wrap']} ${style['search-bar-wrap-large']}`}>
      <input />
    </div>
  );
}
export default SearchBar;
