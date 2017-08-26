import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import Book from './Book';
import {debounce} from 'throttle-debounce';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      myBooks: []
    }
    // this.searchBooks = this.searchBooks.bind(this);
    this.searchBooks = debounce(400,this.searchBooks);
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {this.setState({myBooks: books})});
  }

  searchBooks = (query) =>{
    console.log(query)
    if(query.length > 2){
      BooksAPI.search(query, 20).then((books) => {
       if(books.error){
         this.setState({books: []})
       }else{
        this.setState({books: this.setShelvesOnBooks(books)})
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
          <ol className="books-grid">
            {this.state.books.map((book) => <Book book={book} key={book.id} handleChangeShelf={this.changeBookShelf}/>)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;