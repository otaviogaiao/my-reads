import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from './App';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <BooksApp />
    </MuiThemeProvider>
  </BrowserRouter>, document.getElementById('root'))
