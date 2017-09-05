import React from 'react';
import {Link} from 'react-router-dom';
import Shelf from './Shelf';
import Loader from 'react-loader';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';


const Shelves = (props) => {
  let keys = Object.keys(props.shelves);
  let shelves = props.shelves;
  return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      <Loader loaded={props.loaded}>
          {props.updating && <LinearProgress mode="indeterminate" color="#FFFF00"/>}
          <div className="list-books-content">
            <div>
              { keys.map((key) => <Shelf books={shelves[key]} shelf={key} key={key} shelves={keys} updateBookFromShelf={props.onUpdate}
                                   updateRating={props.updateRating} />) }
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
      </Loader>
      </div>

  );
}

Shelves.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  shelves: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired
}

export default Shelves;
