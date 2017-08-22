import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import SearchBar from './SearchBar';

class Search extends Component {
  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <SearchBar />
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default Search;
