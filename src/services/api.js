import Axios from 'axios';

const Api = Axios.create({
    baseURL: "https://5de5426a9c4220001405ad45.mockapi.io" ,
    headers: {
        "Content-Type" : "application/json",
    }
});


export default Api;