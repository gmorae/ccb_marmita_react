import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import List from './List'
import ListEntrega from './ListEntrega'

import {BrowserRouter as Router, Route} from 'react-router-dom'
const Routers = (
    <Router>
        <Route path="/" exact component={App} />
        <Route path="/list" exact component={List} />
        <Route path="/listEntrega" exact component={ListEntrega} />
    </Router>
)
ReactDOM.render(Routers, document.getElementById('root'));