import React, {Component} from 'react';
import Book from './Book';
import _ from 'lodash';

class Shelf extends Component {

  handleChangeShelf = (book, shelf) =>{
    this.props.removeBookFromShelf(book, shelf);
  }


  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{_.startCase(this.props.shelf)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.length > 0 ? this.props.books.map((book) =>
              (<li key={book.id}>
                <Book book={book} key={book.id} handleChangeShelf={this.handleChangeShelf} shelves={this.props.shelves}/>
              </li>)) : <p>This shelf is empty</p>}
          </ol>
        </div>
      </div>
    );
  }

}

export default Shelf;
