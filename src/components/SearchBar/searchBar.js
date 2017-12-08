import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import style from './searchBar.less';

class SearchBar extends React.Component {
  state = {
    searchkey: '',
  };
  handleChange = (e) => {
    this.setState({
      searchkey: e.target.value,
    });
  }
  handleSearch = () => {
    this.props.dispatch({
      type: 'photo/search',
      payload: this.state.searchkey,
    });
  }
  render() {
    return (
      <div
        className={
          `${style['search-bar-wrap']} ${this.props.home ? style['search-bar-wrap-home'] : style['search-bar-wrap-small']}`
        }
      >
        <input placeholder="Search Your Interested Photos." value={this.state.searchkey} onChange={this.handleChange} />
        <div className={style['search-bar-button']}>
          <a href={`/square/search?searchkey=${this.state.searchkey}`} style={{ color: 'grey' }} onClick={this.handleSearch}>
            <Icon type="search" />
          </a>
        </div>
      </div>
    );
  }
}
export default connect()(SearchBar);