import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Shelves from './components/Shelves';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BooksApp extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Route exact path="/" component={Shelves} />
          <Route exact path="/search" component={Search} />
        </div>
      </MuiThemeProvider>

    )
  }
}

export default BooksApp;
