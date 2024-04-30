// 1. Create context
import {createContext, useState} from "react";
import {useContext} from "react";
import { executeJwtAuthenticationService} from "../api/AuthenticationApiService";
import {apiClient} from "../api/ApiClient";


// 1: Create Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


// 2. Share the created context with other components
export default function AuthenticationProvider({children}) {


    // 3. create some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

   // async function login(username, password) {
   //      const basicAuthenticationToken = 'Basic ' + window.btoa(username + ":" + password);
   //
   //      try {
   //
   //          const response = await executeBasicAuthenticationService(basicAuthenticationToken)
   //
   //          if(response.status === 200) {
   //              setAuthenticated(true)
   //              setUsername(username)
   //              setToken(basicAuthenticationToken)
   //
   //              apiClient.interceptors.request.use(
   //                  (config) => {
   //                      console.log('intercepting and adding a token')
   //                      config.headers.Authorization=basicAuthenticationToken
   //                      return config
   //                  }
   //              )
   //              return true
   //
   //          } else {
   //              logout()
   //              return false
   //          }
   //
   //      }  catch(error) {
   //          logout()
   //          return false
   //
   //      }
   //
   //  }



    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password)

            if(response.status === 200) {

                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                    apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true

            } else {
                logout()
                return false
            }

        }  catch(error) {
            logout()
            return false

        }

    }



    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}


