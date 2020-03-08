import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class navbar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                    <Link class="navbar-brand" to='/'>CCB Jd Adriana</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="basicExampleNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link class="nav-link" to='/'>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/list'>Lista de retirada</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/listEntrega'>Lista de entrega</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/doacoes'>Doações</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/relatorio'>Relatótios</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/sorteio'>Sorteio</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
