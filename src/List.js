import React, { Component } from 'react'
import Navbar from './navbar'
import { getRetirada, getEntregue } from './services/get'
import api from "./services/api";
import { toast, ToastContainer } from 'react-toastify';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            listEntregue: [],
            id: Number,
            total: Number
        }
    }

    componentDidMount = async () => {
        const get = await getRetirada()
        const getOK = await getEntregue()
        this.setState({ list: get.data.data })
        this.setState({ listEntregue: getOK.data })
        this.setState({ total: get.data.dados.totalMarmitas })
        this.state.listEntregue.forEach(element => {
            document.getElementById(`button${element.id_ok}`).classList.add('btn-success')
        });
    }

    delete = async event => {
        toast.success('Registro excluido com sucesso')
        let item = document.getElementById(`linha${event}`)
        item.parentNode.removeChild(item)
        await api.delete(`users/${event}`);
    }

    update = async event => {
        await api.post(`users/entregue/${event}`);
        document.getElementById(`button${event}`).classList.add('btn-success')
    };

    edit = event => {
        toast.warn('Funcionalidade a ser desenvolvida')
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <Navbar />
                <div className="container mx-auto">
                    <h2 className="mb-3 text-center mt-5">Lista de usuário</h2>
                    <h4 className="my-5"><b>Total de encomendas:</b> {this.state.total} unidades</h4>
                    <div className="table-responsive text-nowrap">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Nome Completo</th>
                                    <th scope="col">Quantidade de marmita</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    this.state.list.map((res) => {
                                        return (
                                            <tr key={res.idusers} id={`linha${res.idusers}`}>
                                                <td>{res.name_user}</td>
                                                <td>{res.qdt_marmita}</td>
                                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(res.total)}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => this.edit(res.idusers)}
                                                        className="btn btn-blue btn-sm">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        id={`button${res.idusers}`}
                                                        onClick={() => this.update(res.idusers)}
                                                        className="btn btn-warning btn-sm">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => this.delete(res.idusers)}
                                                        className="btn btn-danger btn-sm">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                </td>
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
