import axios from "axios";


export function retrieveApiService() {
    return axios.get('http://localhost:8080/hello-world')
}

