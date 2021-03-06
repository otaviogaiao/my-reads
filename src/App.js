import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Shelves from './components/Shelves';
import * as BooksAPI from './BooksAPI';
import NotFound from './components/NotFound';

class BooksApp extends React.Component {

  state = {
    shelves: {
      read: [],
      wantToRead: [],
      currentlyReading: []
    },
    loaded: true,
    updating: false
  }

  componentDidMount(){
    this.setState({loaded: false})
    BooksAPI.getAll() //we get all books from API and sets them in their shelves
    .then((books) => {
       this.setState((prevState) => {
        let {shelves} = prevState;
        for(let book of books){
           //we ignore books whose category doesnt exist anymore..
          //preparing for when we are able to create categories (It's kinda done in another branch, but since the API doesn't
         //support it, I thought it better to remove it)
          if(shelves.hasOwnProperty(book.shelf)){
            shelves[book.shelf] = shelves[book.shelf].concat([book])
          }

        }
        return {shelves}
      })
    })
    .catch((erro) => console.log(erro))
    .then(() => {this.setState({loaded: true})}) //it executes regardeless of error or success
  }

  updateBookFromShelf = (book, shelf) => {
    this.setState({updating: true})
    let oldShelf = book.shelf;
    book.shelf = shelf;
    this.setState((prevState) => {
      let { shelves } = prevState;
      if(shelf !== 'none'){
        shelves[shelf] = shelves[shelf].concat([book]);
      }
      if(oldShelf !== 'none'){
        shelves[oldShelf] = shelves[oldShelf].filter((b) =>  b.id !== book.id);
      }
      
      return {shelves};
      }
    )
    BooksAPI.update(book, shelf)
      .catch((erro) => {
        console.log(erro);
      })
      .then(() => {this.setState({updating: false});})
  }

  updateRating = (e, book) => {
    if(book.shelf !== 'none'){
      book.averageRating = e;
      this.setState((prevState) => {
         let { shelves } = prevState;
         let index = shelves[book.shelf].findIndex((b) => b.id === book.id)
         if(index !== -1){
           shelves[book.shelf][index].averageRating = e;
         }
         return {shelves};
      })
    }
  }

  render() {
    return (
        <div className="app">
          <Switch>
            <Route exact path="/" render={ () => {
              return <Shelves onUpdate={this.updateBookFromShelf} shelves={this.state.shelves} 
              loaded={this.state.loaded} updating={this.state.updating} updateRating={this.updateRating}/>
              }} />
            <Route exact path="/search" render={ () => {return <Search shelves={this.state.shelves} 
            onUpdate={this.updateBookFromShelf} updating={this.state.updating} updateRating={this.updateRating}/>}} />
            <Route component={NotFound} />
          </Switch>
        </div>
    )
  }
}

export default BooksApp;
