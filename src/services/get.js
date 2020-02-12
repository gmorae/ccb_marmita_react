import request from './api';

export const getUsers = () => request.get('/users')
export const getEntrega = () => request.get('/entrega')
export const getRetirada = () => request.get('/retirada')