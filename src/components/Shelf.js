import React, {Component} from 'react';
import Book from './Book';

class Shelf extends Component {

  handleChangeShelf = (book, shelf) =>{
    this.props.removeBookFromShelf(book, shelf);
  }


  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              (<li key={book.id}>
                <Book book={book} key={book.id} handleChangeShelf={this.handleChangeShelf} />
              </li>))}
          </ol>
        </div>
      </div>
    );
  }

}

export default Shelf;
