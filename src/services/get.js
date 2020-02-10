import request from './api';

export const getUsers = () => request.get('/users')
