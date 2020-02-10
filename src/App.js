import React from 'react';
import Navbar from './navbar'
import { ToastContainer, toast } from 'react-toastify';
import api from "./services/api";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  mostra() {
    document.getElementById('endereco').classList.remove('d-none')
  }
  esqconde() {
    document.getElementById('endereco').classList.add('d-none')
  }
  constructor() {
    super();
    this.state = {

      postUser: {
        name_user: "",
        qdt_marmita: "",
        entrega: "",
        endereco: "",
      }

    }
  }

  up = async e => {
    e.preventDefault();

    const { name_user, endereco, qdt_marmita, entrega } = this.state;
    if (!name_user || !endereco || !qdt_marmita || !entrega) {
      toast.error("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/users", { name_user, endereco, qdt_marmita, entrega });
        this.props.history.push('/');
        toast.success("Cadastrado com sucesso, faça login para acessar sua conta");
      } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao cadastrar o cliente.");
      }
    }
  };
  onSend() {
    console.log(this.state.name);
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        <div className="container col-md-6 mx-auto">
          <form className="text-center mt-5" onSubmit={this.up}>
            <h2 className="mb-3">Cadastro de usuário</h2>
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

            <input type="text" id="endereco" className="form-control my-4 d-none" name="endereco" onInput={(e) => this.setState({ endereco: e.target.value })} placeholder="Endereço Completo" onChange={e => this.setState({ endereco: e.target.value })} />

            <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Resumo do pedido</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body text-left">
                    <p><b>Nome Completo:</b> {this.state.name}</p>
                    <p><b>Quantidade de marmita:</b> {this.state.qdt_marmita ? this.state.qdt_marmita : '0'} unidades</p>
                    <p><b>Entrega:</b> {this.state.entrega}</p>
                    <p><b>Endereço:</b> {this.state.entrega === 'Entrega residêncial' ? this.state.endereco : '---------'}</p>
                    <p><b>Total:</b> R$ {this.state.entrega === 'Entrega residêncial' ? this.state.qdt_marmita * 15 + 2 : this.state.qdt_marmita * 15},00</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-outline-danger waves-effect" data-dismiss="modal">Alterar</button>
                    <button type="submit" class="btn btn-sm btn-success">Confirmar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <button type="button" data-toggle="modal" data-target="#basicExampleModal" class="btn btn-primary btn-md btn-block mt-2">Cadastrar</button>
        </div>
      </div>
    )
  };
}

export default App;
