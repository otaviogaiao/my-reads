import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from './Shelf';
import Loader from 'react-loader';

class Shelves extends Component {

  state = {
      shelves: {
        read: [],
        wantToRead: [],
        currentlyReading: []
      },
      loaded: false
  }

  removeBookFromShelf = (book, shelf) => {
    let oldShelf = book.shelf;
    book.shelf = shelf;
    if(shelf !== 'none'){
      this.setState((prevState) => {
          prevState.shelves[shelf] = prevState.shelves[shelf].concat([book]);
          return prevState;
        }
      )
    }
    this.setState((prevState) => {
        prevState.shelves[oldShelf] = prevState.shelves[oldShelf].filter((b) =>  b.id !== book.id);
        return prevState;
      }
    )
    BooksAPI.update(book, shelf).catch((erro) => console.log(erro))
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState((prevState) => {
          for(let book of books){
            prevState.shelves[book.shelf] = prevState.shelves[book.shelf].concat([book])
          }
          prevState.loaded = true
          return prevState
        })
      }).then(this.setState({loaded: false}))
      .catch((erro) => console.log(erro))
  }

  render(){
    let keys = Object.keys(this.state.shelves);
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <Loader loaded={this.state.loaded}>
            <div className="list-books-content">
              <div>
                { keys.map((key) => <Shelf books={this.state.shelves[key]} shelf={key} key={key} removeBookFromShelf={this.removeBookFromShelf}/>) }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </Loader>
        </div>

    );
  }
}

export default Shelves;
