import React, { Component } from 'react'
import Navbar from './navbar'
import { getEntrega, getEntregueMoto } from './services/get';
import api from './services/api';
import { toast, ToastContainer } from 'react-toastify';
import ReactToPrint from "react-to-print";


export default class ListEntrega extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            listEntregue: [],
            total: Number
        }
    }

    componentDidMount = async () => {
        const get = await getEntrega()
        const getOK = await getEntregueMoto()
        this.setState({ list: get.data.data })
        this.setState({ listEntregue: getOK.data })
        this.setState({ total: get.data.dados.totalMamitas })
        this.state.listEntregue.forEach(element => {
            document.getElementById(`button${element.id_ok}`).classList.add('btn-success')
            document.getElementById(`button${element.id_ok}`).innerHTML = 'Entregue'
        });
    }

    delete = async event => {
        toast.success('Registro excluido com sucesso')
        let item = document.getElementById(`linha${event}`)
        item.parentNode.removeChild(item)
        await api.delete(`users/${event}`);
    }


    update = async event => {
        await api.post(`/users/entregue/motoboy/${event}`);
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
                <div className="container-fluid mx-auto">
                    <h2 className="mb-3 text-center mt-5">Lista de entregas</h2>
                    <div className="d-flex justify-content-between">
                        <ReactToPrint
                            trigger={() => <button type="button" className="btn btn-primary btn-sm">Imprimir</button>}
                            content={() => this.componentRef}
                        />
                        <h4 className="my-1"><b>Total de encomendas:</b> {this.state.list.reduce((total, valor) => total + valor.qdt_marmita * 1, 0)} unidades</h4>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table text-center" ref={el => (this.componentRef = el)}>
                            <thead>
                                <tr>
                                    <th scope="col">Nome Completo</th>
                                    <th scope="col">Quantidade de marmita</th>
                                    <th scope="col">Endereço</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.list.map((res) => {
                                        return (
                                            <tr id={`linha${res.idusers}`}>
                                                <td>{res.name_user}</td>
                                                <td>{res.qdt_marmita}</td>
                                                <td>{res.endereco}</td>
                                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(res.total)}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => this.update(res.idusers)}
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
