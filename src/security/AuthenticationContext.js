// 1. Create context
import {createContext, useState} from "react";
import {useContext} from "react";
export const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext)


// 2. Share the created context with other components
function AuthenticationProvider({children}) {
    // 3. create some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password) {
        if(username === 'George Tudor' && password === 'mypassword') {
            setAuthenticated(true)
            return true

        } else {
            setAuthenticated(false)
            return false
        }
    }


    function logout() {
        setAuthenticated(false)

    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthenticationProvider