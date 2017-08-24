import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from './Shelf';

class Shelves extends Component {

  state = {
      read: [],
      wantToRead: [],
      currentlyReading: []
  }

  removeBookFromShelf = (book, shelf) => {
    let oldShelf = book.shelf;
    book.shelf = shelf;
    if(shelf !== 'none'){
      this.setState((prevState) => (
         {[shelf]: prevState[shelf].concat([book])}
      ))
    }
    this.setState((prevState) => (
        {[oldShelf]: prevState[oldShelf].filter((b) =>  b.id !== book.id)}
    ))

    BooksAPI.update(book, shelf)
      .then((dados) => console.log(dados))
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        for(let book of books){
          this.setState((prevState) => prevState[book.shelf].push(book))
        }
      })
      .catch((erro) => console.log(erro))
  }

  render(){
    let keys = Object.keys(this.state);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { keys.map((key) => <Shelf books={this.state[key]} shelf={key} key={key} removeBookFromShelf={this.removeBookFromShelf}/>) }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Shelves;
