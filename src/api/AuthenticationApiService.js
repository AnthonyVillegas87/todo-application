import {apiClient} from "./ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/users/${token}/todos`, {
    headers: {
        Authorization: token
    }
})

export const executeJwtAuthenticationService = (username, password) => apiClient.post(`/authenticate`, {username, password})