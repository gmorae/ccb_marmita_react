import React, { Component } from 'react'
import Navbar from './navbar'
import {
    getEntregue,
    getUsers,
    getEntrega,
    getRetirada,
    getDoacao,
    getEntregueMoto
} from './services/get';

export default class Relatorio extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            listEntregue: [],
            list: [],
            listRetirada: [],
            listEntrega: [],
            listDoacao: [],
            listMotoboy: []
        }
    }

    componentDidMount = async () => {
        const getUser = await getUsers()
        const getOK = await getEntregue()
        const retirada = await getRetirada()
        const entrega = await getEntrega()
        const doacao = await getDoacao()
        const motoboy = await getEntregueMoto()

        this.setState({ listEntregue: getOK.data })
        this.setState({ list: getUser.data })
        this.setState({ listRetirada: retirada.data })
        this.setState({ listEntrega: entrega.data })
        this.setState({ listDoacao: doacao.data })
        this.setState({ listMotoboy: motoboy.data })



        var data = new Date();
        this.setState({ date: `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}` })
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar />
                    <div className="container col-md-7 mx-auto">
                        <h2 className="mb-3 text-center mt-5 mb-3">Relatório do dia {this.state.date}</h2>
                        <div className="mt-5">
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas à ser vendida</b></h5>
                                <h5>R$ {this.state.list.reduce((total, valor) => total + valor.qdt_marmita, 0) * 15} </h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas que foi retirada </b></h5>
                                <h5>R$ {this.state.listRetirada.reduce((total, valor) => total + valor.qdt_marmita, 0) * 15}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas que foi entregue</b></h5>
                                <h5>R$ {this.state.listEntrega.reduce((total, valor) => total + valor.qdt_marmita + 2, 0) * 15}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas vendidas</b></h5>
                                <h5>R$ {(this.state.listEntregue.length * 15) + ((this.state.listMotoboy.length * 15) + 2)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de doação</b></h5>
                                <h5>R$ {this.state.listDoacao.reduce((t, v) => t + v.valor * 1, 0)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-end">
                                <h5><b>TOTAL GERAL</b></h5>
                                <h5 className="ml-2">R$
                                {(this.state.listEntregue.length * 15) + ((this.state.listMotoboy.length * 15) + 2) + this.state.listDoacao.reduce((t, v) => t + v.valor * 1, 0)}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}