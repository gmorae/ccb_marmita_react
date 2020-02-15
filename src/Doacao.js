import React from 'react';
import Navbar from './navbar'
import { ToastContainer, toast } from 'react-toastify';
import api from "./services/api";
import 'react-toastify/dist/ReactToastify.css';

class Doacao extends React.Component {

    constructor() {
        super();
        this.state = {

            postDoacao: {
                valor: "",
            },
        }
    }

    up = async e => {
        e.preventDefault();
        const { valor } = this.state;
        if (!valor) {
            toast.error("Preencha o campo para para poder cadastrar");
        } else {
            try {
                await api.post("/doacao", { valor });
                toast.success("Cadastrado com sucesso");
            } catch (err) {
                console.log(err);
                toast.error("Ocorreu um erro ao cadastrar.");
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
                        <h2 className="mb-3">Cadastro de doações</h2>
                        <input type="text" className="form-control mb-4" name="valor" onChange={e => this.setState({ valor: e.target.value })} placeholder="Valor de doação" />
                        <button type="submit" className="btn btn-primary btn-md btn-block mt-2">Cadastrar</button>
                    </form>
                </div>
            </div>

        )
    };
}

export default Doacao;
