import axios from 'axios';
import {apiClient} from "./ApiClient";

export const retrieveAllApiService = (username, token) => apiClient.get(`/users/${username}/todos`, {
    headers: {
        Authorization: token
    }
})


export const executeBasicAuthenticationService = (token) => apiClient.get(`/users/${token}/todos`, {
    headers: {
        Authorization: token
    }
})

export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const createTodoApi = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)