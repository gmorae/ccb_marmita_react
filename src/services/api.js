import Axios from 'axios';

const Api = Axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://marmitaccb.herokuapp.com/" ,
    headers: {
        "Content-Type" : "application/json",
    }
});


export default Api;