import React, { Component } from 'react'
import Navbar from './navbar'
import { getRetirada } from './services/get'
import api from "./services/api";
import { toast, ToastContainer } from 'react-toastify';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    componentDidMount = async () => {
        const get = await getRetirada()
        this.setState({ list: get.data })
    }

    delete = async (event) =>  {
        await api.delete(`users/${event}`);
        toast.success('Registro excluido com sucesso')
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    
    render() {
        return (
            <div>
                <ToastContainer />
                <Navbar />
                <div className="container col-md-7 mx-auto">
                    <h2 className="mb-3 text-center mt-5">Lista de usuário</h2>
                    <h4 className="my-5"><b>Total de encomendas:</b> {this.state.list.reduce((total, valor) => total + valor.qdt_marmita * 1, 0)} unidades</h4>
                    <div className="table-responsive text-nowrap">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Nome Completo</th>
                                    <th scope="col">Quantidade de marmita</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    this.state.list.map((res) => {
                                        return (
                                            <tr key={res.idusers}> 
                                                <td>{res.name_user}</td>
                                                <td>{res.qdt_marmita}</td>
                                                <td><button type="button" className="btn btn-success btn-sm">Entregue</button>
                                                    <button type="button" onClick={() => this.delete(res.idusers)} className="btn btn-danger btn-sm">Excluir</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
