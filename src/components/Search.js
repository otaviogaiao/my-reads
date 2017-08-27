import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import Book from './Book';
import {debounce} from 'throttle-debounce';
import Loader from 'react-loader';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      myBooks: [],
      loaded: true
    }
    // this.searchBooks = this.searchBooks.bind(this);
    this.searchBooks = debounce(400,this.searchBooks);
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {this.setState({myBooks: books})});
  }

  searchBooks = (query) =>{
    if(query.length > 2){
      this.setState({loaded: false})
      BooksAPI.search(query, 20).then((books) => {
       if(books.error){
         this.setState({books: [], loaded: true})
       }else{
        this.setState({books: this.setShelvesOnBooks(books), loaded: true})
       }
      })
    }
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      if(book.shelf !== 'none' && shelf === 'none'){
        this.setState((prevState) => ({myBooks: prevState.myBooks.filter((b) => b.id !== book.id)}))
      }else{
        book.shelf = shelf;
        this.setState((prevState) => ({myBooks: prevState.myBooks.concat([book])}))
      }
    })
  }

  setShelvesOnBooks(books){
    if(this.state.myBooks.length > 0 && books.length > 0){
      return books.map((book) => {
        let index = this.state.myBooks.findIndex((b) => b.id === book.id);
        if(index !== -1){
          book.shelf = this.state.myBooks[index].shelf;
        }else{
          book.shelf = 'none'
        }
        return book;
      })
    }
    return books;
  }


  render(){
    console.log(this.state)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <SearchBar searchBookHandler={this.searchBooks}/>
        </div>
        <div className="search-books-results">
          <Loader loaded={this.state.loaded}>
            <ol className="books-grid">
              {this.state.books.map((book) => <Book book={book} key={book.id} handleChangeShelf={this.changeBookShelf}/>)}
            </ol>
          </Loader>
        </div>
      </div>
    );
  }
}

export default Search;
