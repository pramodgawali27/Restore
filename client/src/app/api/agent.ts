import axios, { AxiosError, AxiosResponse } from "axios";
import { resolve } from "path";

const sleep = () => new Promise(resolve => setTimeout(resolve,1000));

axios.defaults.baseURL = "http://localhost:5051/api/";

const responseBody = (response : AxiosResponse) => response.data;

axios.interceptors.response.use(async response=>{
    await sleep();
return response;
},
(error:AxiosError)=>{
    const {data,status} = error.response!
}
);

const requests = {
    get : (url:string) => axios.get(url).then(responseBody),
    post : (url:string,body : {}) => axios.post(url,body).then(responseBody),
    put : (url:string,body : {}) => axios.put(url,body).then(responseBody),
    delete : (url:string) => axios.get(url).then(responseBody),
}

const testErrors ={
    get400Error : () => requests.get("buggy/bad-request"),
    get401Error : () => requests.get("buggy/unauthorised"),
    get404Error : () => requests.get("buggy/not-found"),
    get500Error : () => requests.get("buggy/server-error"),
    getValidationErrorError : () => requests.get("buggy/validation-error")
}

const Catalog ={
    list : () => requests.get('products'),
    details : (id:any) => requests.get(`products/${id}`)
}

const agent={
    Catalog,
    testErrors
}

export default agent;

