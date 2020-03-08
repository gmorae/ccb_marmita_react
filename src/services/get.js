import request from './api';

export const getUsers = () => request.get('/users')
export const getEntrega = () => request.get('/entrega')
export const getRetirada = () => request.get('/retirada')
export const getEntregue = () => request.get('/users/entregue')
export const getDoacao = () => request.get('doacao')
export const getEntregueMoto = () => request.get('/users/entregue/motoboy')
export const relatorio = () => request.get('/relatorio')
export const sorteio = () => request.get('/sorteio')