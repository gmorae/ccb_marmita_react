import React, { Component } from 'react'
import Navbar from './navbar'

export default class List extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container col-md-6 mx-auto">
                    <h2 className="mb-3 text-center mt-5">Lista de usuário</h2>
                    <div class="table-responsive text-nowrap">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nome Completo</th>
                                    <th scope="col">Quantidade de marmita</th>
                                    <th scope="col">Retirada</th>
                                    <th scope="col">Endereço</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td>Cell</td>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                    <td><button type="button" class="btn btn-success btn-sm">Entregue</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
