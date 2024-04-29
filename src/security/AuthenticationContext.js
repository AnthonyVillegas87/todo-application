// 1. Create context
import {createContext, useState} from "react";
import {useContext} from "react";
import {executeBasicAuthenticationService} from "../api/ApiService";


// 1: Create Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


// 2. Share the created context with other components
function AuthenticationProvider({children}) {


    // 3. create some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username === 'GeorgeTudor' && password === 'mypassword') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

   async function login(username, password) {
        const basicAuthenticationToken = 'Basic ' + window.btoa(username + ":" + password);

        try {

            const response = await executeBasicAuthenticationService(basicAuthenticationToken)

            if(response.status === 200) {
                setAuthenticated(true)
                setUsername(username)
                setToken(basicAuthenticationToken)
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


export default AuthenticationProvider