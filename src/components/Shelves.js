import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from './Shelf';
import Loader from 'react-loader';
import NewShelf from './NewShelf';

class Shelves extends Component {

  state = {
      shelves: {},
      loaded: false,
      modalNewShelf: false
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
    //First, we get all sheves and put it on the state
    BooksAPI.getAllShelves()
      .then((shelves) => {
        this.setState((prevState) => { //sets all shelves as states
          for(let shelf of shelves){
            prevState.shelves[shelf] = [];
          }
          return prevState;
        });
        BooksAPI.getAll() //Then, we get all books from API and sets them in their shelves
          .then((books) => {
            this.setState((prevState) => {
              for(let book of books){
                 //we ignore books whose category doesnt exist anymore..
                 //If the API had a bulk update, we would update the shelf of every book when its category is deleted.
                if(prevState.shelves.hasOwnProperty(book.shelf)){
                  prevState.shelves[book.shelf] = prevState.shelves[book.shelf].concat([book])
                }

              }
              prevState.loaded = true
              return prevState
            })
          }).then(this.setState({loaded: false}))
          .catch((erro) => console.log(erro))
      })
      .catch((erro) => console.log(erro));
  }

  //we close the modal and set the new shelve on the state if there is one
  closeModal = (newShelf) => {
    this.setState((prevState) => {
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
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <Loader loaded={this.state.loaded}>
            <div className="list-books-content">
              <div>
                { keys.map((key) => <Shelf books={this.state.shelves[key]} shelf={key} key={key} shelves={keys} removeBookFromShelf={this.removeBookFromShelf}
                                      openModal={this.openModal} closeModal={this.closeModal}/>) }
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => {this.setState({modalNewShelf: true})}}>Add a new shelf</button>
              <Link to="/search">Add a book</Link>
            </div>
            {this.state.modalNewShelf && <NewShelf onClose={this.closeModal}/>}
        </Loader>
        </div>

    );
  }
}

export default Shelves;
