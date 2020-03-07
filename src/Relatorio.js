import React, { Component } from 'react'
import Navbar from './navbar'
import {
    relatorio, getDoacao
} from './services/get';

export default class Relatorio extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            list: [],
            doacao: Number
        }
    }

    componentDidMount = async () => {
        const dados = await relatorio()
        const dadosDoacao = await getDoacao()

        this.setState({ list: dados.data.dados })  
        this.setState({doacao: dadosDoacao.data.total})
        
        var data = new Date();
        this.setState({ date: `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}` })
    }

    format = value => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)

    render() {
        return (
            <div>
                <div>
                    <Navbar />
                    <div className="container col-md-7 mx-auto">
                        <h2 className="mb-3 text-center mt-5 mb-3">Relatório do dia {this.state.date}</h2>
                        <div className="mt-5">
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas que foi retirada </b></h5>
                                <h5>{this.format(this.state.list.totalRetirada)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas que foi entregue</b></h5>
                                <h5>{this.format(this.state.list.totalEntrega)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de marmitas vendidas</b></h5>
                                <h5>{this.format(this.state.list.totalMarmitas)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-between">
                                <h5><b>Total de doação</b></h5>
                                <h5>{this.format(this.state.doacao)}</h5>
                            </div>
                            <div className="d-flex mt-5 justify-content-end">
                                <h5><b>TOTAL GERAL</b></h5>
                                <h5 className="ml-2">{this.format(this.state.list.totalMarmitas + +this.state.doacao)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}