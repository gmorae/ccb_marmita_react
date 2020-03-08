import React, { Component } from 'react'
import Navbar from './navbar'
import { sorteio } from './services/get';


export default class SortPerson extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            count:Number,
            rand: Number
        }
    }

    componentDidMount = async () => {
        const s = await sorteio()
        this.setState({ list: s.data })
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    sort = () => {
        
        let number = this.getRandomInt(0, this.state.list.length - 2)
        this.setState({rand: number})
        document.getElementById('table').classList.remove('d-none')
        this.setState({count: 0 })
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar />
                    <div className="container col-md-7 mx-auto">
                        <h2 className="mb-3 text-center mt-5 mb-3">Sorteio</h2>
                        <div className="d-flex justify-content-between">
                            <button type="button"  onClick={() => this.sort()} className="btn btn-primary btn-md">SORTEAR</button>
                            <h4 className="my-1"><b>Número sorteado: </b> {this.state.rand ? this.state.rand : '0'} </h4>
                        </div>
                        <table class="table d-none" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Nome completo</th>
                                    <th scope="col">Quantidade de marmita</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.map((res) => {
                                        return (
                                            <tr>
                                                <th scope="row">{this.state.count++}</th>
                                                <td>{res.name_user}</td>
                                                <td>{res.qdt_marmita}</td>
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