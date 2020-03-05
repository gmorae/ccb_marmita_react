import React from 'react';
import Navbar from './navbar'
import { ToastContainer, toast } from 'react-toastify';
import api from "./services/api";
import 'react-toastify/dist/ReactToastify.css';
import { getUsers } from './services/get';

class App extends React.Component {
  mostra() {
    document.getElementById('noneId').classList.remove('d-none')

  }
  esqconde() {
    document.getElementById('noneId').classList.add('d-none')

  }
  constructor() {
    super();
    this.state = {
      postUser: {
        name_user: String,
        qdt_marmita: Number,
        entrega: String,
        endereco: String,
        valorEntrega: Number,
        total: Number
      },
      users: [],
      totalMarmita: 300,
      resto: Number,
      valorMarmita: 15,
      reserva: Number
    }
  }

  componentWillMount = async () => {
    const get = await getUsers()
    this.setState({ users: get.data.dados })
    this.setState({ resto: get.data.dados.totalMarmitasAtual })
    this.setState({ reserva: get.data.dados.totalPedidos })
    if (this.state.reserva === 0 || this.state.reserva >= 0) {
      toast.error('Não pode mais cadastrar, pois o número de pedidos foi exedido')
      document.getElementById('buttonConfirm').classList.add('d-none')
      document.getElementById('alert').classList.remove('d-none')
    }
  }

  calculaTotal = () => {
    this.state.valorEntrega === undefined ? this.state.valorEntrega = 0 : this.state.valorEntrega = +this.state.valorEntrega
    this.state.total = this.state.qdt_marmita * this.state.valorMarmita + this.state.valorEntrega
  }

  up = async e => {
    e.preventDefault();
    if (this.state.entrega === 'Retirada igreja') {
      this.state.endereco = '-'
    }

    const { name_user, endereco, qdt_marmita, entrega, total } = this.state;
    if (!name_user || !endereco || !qdt_marmita || !entrega || !total) {
      toast.error("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/users", { name_user, endereco, qdt_marmita, entrega, total });
        toast.success("Cadastrado conomem sucesso")
        document.getElementById('nome').value = ''
        document.getElementById('marmita').value = ''
        document.getElementById('defaultUnchecked').checked = false
        document.getElementById('defaultChecked').checked = false
        document.getElementById('endereco').value = ''
        document.getElementById('valorEntrega2').checked = false
        document.getElementById('valorEntrega5').checked = false
        this.setState({reserva: this.state.reserva + +qdt_marmita})
        this.setState({resto: this.state.resto - +qdt_marmita})
      
      } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao cadastrar o cliente.");
      }
    }
  };
  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        <div className="container col-md-6 mx-auto">
          <form className="text-center mt-5" onSubmit={this.up}>
            <h2 className="mb-3">Cadastro de usuário</h2>
            <div className="my-4 d-flex justify-content-around">
              <h5><b>Total de reservada: </b>{this.state.reserva}</h5>
              <h5><b>Restantes: </b>{this.state.resto}</h5>
            </div>
            <input type="text" id="nome" className="form-control mb-4" name="name" onInput={(e) => this.setState({ name: e.target.value })} onChange={e => this.setState({ name_user: e.target.value })} placeholder="Nome Completo" />
            <input type="text" id="marmita" className="form-control mb-4" placeholder="Quantidade de marmitas" onInput={(e) => this.setState({ qdt_marmita: e.target.value })} onChange={e => this.setState({ qdt_marmita: e.target.value })} />
            <div className="d-flex">
              <div className="custom-control custom-radio">
                <input type="radio" onClick={() => this.mostra()} className="custom-control-input" onInput={(e) => this.setState({ entrega: e.target.value })} value="Entrega residêncial" id="defaultUnchecked" name="defaultExampleRadios" onChange={e => this.setState({ entrega: e.target.value })} />
                <label className="custom-control-label" for="defaultUnchecked">Entrega residêncial</label>
              </div>
              <div className="ml-5 custom-control custom-radio">
                <input type="radio" onClick={() => this.esqconde()} onInput={(e) => this.setState({ entrega: e.target.value })} className="custom-control-input" value="Retirada igreja" onChange={e => this.setState({ entrega: e.target.value })} id="defaultChecked" name="defaultExampleRadios" />
                <label className="custom-control-label" for="defaultChecked">Retirada na igreja</label>
              </div>
            </div>

            <div className="d-none mb-2" id="noneId">
              <input type="text" id="endereco" className="form-control my-4" name="endereco" onInput={(e) => this.setState({ endereco: e.target.value })} placeholder="Endereço Completo" onChange={e => this.setState({ endereco: e.target.value })} />
              <div className="d-flex">
                <div className="custom-control custom-radio">
                  <input id="valorEntrega2" type="radio" className="custom-control-input" onInput={(e) => this.setState({ valorEntrega: e.target.value })} value="2" name="valorEntrega" onChange={e => this.setState({ valorEntrega: e.target.value })} />
                  <label className="custom-control-label" for="valorEntrega2">R$ 2</label>
                </div>
                <div className="ml-5 custom-control custom-radio">
                  <input id="valorEntrega5" type="radio" onInput={(e) => this.setState({ valorEntrega: e.target.value })} className="custom-control-input" value="5" onChange={e => this.setState({ valorEntrega: e.target.value })} name="valorEntrega" />
                  <label className="custom-control-label" for="valorEntrega5">R$ 5</label>
                </div>
              </div>
            </div>
            <div className="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Resumo do pedido</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-left">
                    <p><b>Nome Completo:</b> {this.state.name}</p>
                    <p><b>Quantidade de marmita:</b> {this.state.qdt_marmita ? this.state.qdt_marmita : '0'} unidades</p>
                    <p><b>Entrega:</b> {this.state.entrega}</p>
                    <p><b>Endereço:</b> {this.state.entrega === 'Entrega residêncial' ? this.state.endereco : '---------'}</p>
                    <p><b>Valor da entrega:</b> {this.state.valorEntrega ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.state.valorEntrega) : '0'}</p>
                    <p><b>Total:</b> {this.state.total ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.state.total) : '0'}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-outline-danger waves-effect" data-dismiss="modal">Fechar</button>
                    <button type="submit" className="btn btn-sm btn-success">Confirmar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <button type="button" id="buttonConfirm" data-toggle="modal" onClick={this.calculaTotal()} data-target="#basicExampleModal" className="btn btn-primary btn-md btn-block mt-2">Cadastrar</button>
          <div id="alert" className="alert-danger alert mt-2 d-none">Não pode mais cadastrar, pois o número de pedidos foi exedido</div>
        </div>
      </div>

    )
  };
}

export default App;
