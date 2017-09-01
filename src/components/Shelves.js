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
      this.refs.root && this.setState((prevState) => {
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

        BooksAPI.getAll() //Then, we get all books from API and sets them in their shelves
          .then((books) => {
            this.refs.root && this.setState((prevState) => {
              for(let book of books){
                 //we ignore books whose category doesnt exist anymore..
                //preparing for when we are able to create categories (It's kinda done in another branch, but since the API doesn't
               //support it, I thought it better to remove it)
                if(prevState.shelves.hasOwnProperty(book.shelf)){
                  prevState.shelves[book.shelf] = prevState.shelves[book.shelf].concat([book])
                }

              }
              prevState.loaded = true
              return prevState
            })
          }).then(this.refs.root && this.setState({loaded: false}))
          .catch((erro) => console.log(erro))
  }

  //we close the modal and set the new shelve on the state if there is one
  closeModal = (newShelf) => {
    this.refs.root && this.setState((prevState) => {
      prevState.modalNewShelf = false;
      if(newShelf && newShelf.length > 0){
        prevState.shelves[newShelf] = []
      }
      return prevState;
    })
  }

  render(){
    let keys = Object.keys(this.state.shelves);
    return (
        <div className="list-books" ref="root">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <Loader loaded={this.state.loaded}>
            <div className="list-books-content">
              <div>
                { keys.map((key) => <Shelf books={this.state.shelves[key]} shelf={key} key={key} shelves={keys} removeBookFromShelf={this.removeBookFromShelf}
                                      />) }
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
