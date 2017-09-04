import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import Book from './Book';
import {debounce} from 'throttle-debounce';
import Loader from 'react-loader';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';


class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      loaded: true
    }
    this.searchBooks = debounce(400,this.searchBooks);
  }

  searchBooks = (query) =>{
    if(query.length > 2){
      this.setState({loaded: false})
      BooksAPI.search(query, 20).then((books) => {
       if(books.error){
          this.refs.root && this.setState({books: [], loaded: true})
        
       }else{
        this.refs.root && this.setState({books: this.setShelvesOnBooks(books), loaded: true})
       }
      })
    }
  }


  setShelvesOnBooks(books){
    if(books.length > 0){
      let keys = Object.keys(this.props.shelves);
      return books.map((book) => {
        for(let key of keys){
          let index = this.props.shelves[key].findIndex((b) => b.id === book.id);
          if(index !== -1){
            book.shelf = key;
            return book;
          }
        }
        book.shelf = 'none';
        return book;
      })
    }
    return books;
  }


  render(){
    let keys = Object.keys(this.props.shelves);
    return (
      <div className="search-books" ref="root">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <SearchBar searchBookHandler={this.searchBooks}/>
        </div>
        <div className="search-books-results">
        {this.props.updating && <LinearProgress mode="indeterminate" color="#FFFF00"/>}
          <Loader loaded={this.state.loaded}>
            <ol className="books-grid">
              {this.state.books.length > 0 ? this.state.books.map((book) => <Book book={book} key={book.id} handleChangeShelf={this.props.onUpdate} shelves={keys}/>) :
               <p>No books found. Type something to search.</p>}
            </ol>
          </Loader>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shelves: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Search;
