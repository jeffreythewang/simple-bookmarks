import React from 'react';
import {Route} from 'react-router';
import App from './components/app';
import Home from './components/home';
import AddBookmark from './components/add_bookmark';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
  </Route>
);
