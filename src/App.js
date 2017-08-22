import React from 'react';
import * as BooksAPI from './BooksAPI';
import {Route} from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Shelves from './components/Shelves';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Shelves} />
        <Route exact path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp;
