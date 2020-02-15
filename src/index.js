import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import List from './List'
import ListEntrega from './ListEntrega'
import Relatorio from './Relatorio'
import Doacao from './Doacao';

import {BrowserRouter as Router, Route} from 'react-router-dom'

const Routers = (
    <Router>
        <Route path="/" exact component={App} />
        <Route path="/list" exact component={List} />
        <Route path="/listEntrega" exact component={ListEntrega} />
        <Route path="/relatorio" exact component={Relatorio} />
        <Route path='/doacoes' exact component={Doacao} />
    </Router>
)
ReactDOM.render(Routers, document.getElementById('root'));