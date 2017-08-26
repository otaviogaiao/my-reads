import React, {Component} from 'react';

class SearchBar extends Component {

  state = {
    query: ''
  }

  queryChanged = (e) => {
    this.setState({query: e.target.value});
    this.props.searchBookHandler(e.target.value);
  }

  render(){
    return (
      <div className="search-books-input-wrapper">

        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.queryChanged}/>

      </div>
    );
  }
}

export default SearchBar;
