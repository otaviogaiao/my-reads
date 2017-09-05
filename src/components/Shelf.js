import React from 'react';
import Book from './Book';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Shelf = (props) => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{_.startCase(props.shelf)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.length > 0 ? props.books.map((book) =>
              (<li key={book.id}>
                <Book book={book} key={book.id} handleChangeShelf={props.updateBookFromShelf} shelves={props.shelves} updateRating={props.updateRating}/>
              </li>)) : <p>This shelf is empty</p>}
          </ol>
        </div>
      </div>
    );
}


Shelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookFromShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
  updateRating: PropTypes.func.isRequired
}
export default Shelf;
