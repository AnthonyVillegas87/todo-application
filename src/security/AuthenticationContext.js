// 1. Create context
import {createContext, useState} from "react";
import {useContext} from "react";
export const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext)


// 2. Share the created context with other components
function AuthenticationProvider({children}) {
    // 3. create some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    function login(username, password) {
        if(username === 'GeorgeTudor' && password === 'mypassword') {
            setAuthenticated(true)
            setUsername(username)
            return true

        } else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }


    function logout() {
        setAuthenticated(false)

    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthenticationProvider