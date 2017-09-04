import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {

  state = {
    query: ''
  }

  queryChanged = (e) => {
    let query = e.target.value;
    this.setState({query});
    this.props.searchBookHandler(query);
  }

  render(){
    return (
      <div className="search-books-input-wrapper">

        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.queryChanged}/>

      </div>
    );
  }
}

SearchBar.propTypes = {
  searchBookHandler: PropTypes.func.isRequired
}

export default SearchBar;
