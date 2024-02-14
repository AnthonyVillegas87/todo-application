import './ToDoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from "react-router-dom";
export default function ToDoApp() {
    return (
        <div className="ToDoApp">
            <HeaderComponent/>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}></Route>
                    <Route path='/todos' element={<ListTodoComponent/>}></Route>
                    <Route path='/logout' element={<LogoutComponent/>}></Route>
                    <Route path='*' element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>

            <FooterComponent/>
        </div>
    )
}

function LoginComponent() {

    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()



    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }


    function handleSubmit() {
        if(username === 'George Tudor' && password === 'mypassword') {
            console.log('Success')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate(`/welcome/${username}`)
        } else {
            console.log('Failed')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }


    return (
        <div className="Login">

            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials.</div>}

            <div className="LoginForm">
                <div>
                    <label>User Name: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}




function WelcomeComponent() {
    const {username} = useParams()
    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>

            <div>
               Manage your list of to-dos - <Link to="/todos">Here</Link>
            </div>
        </div>
    )
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working very hard</h1>
            <div>404. We are working hard to fix this!</div>
        </div>
    )
}

function ListTodoComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const todoList = [
        {id: 1, description: "Morning affirmations reading.", done: false, targetDate: targetDate},
        {id: 2, description: "Get to morning gym session", done: false, targetDate: targetDate},
        {id: 3, description: "Get to work, complete daily stand-ups, and work on the next feature.", done: false, targetDate: targetDate},
        {id: 4, description: "Finish at work, head to grocery store.", done: false, targetDate: targetDate},
        {id: 5, description: "Prepare and cook dinner.", done: false, targetDate: targetDate}
    ]

    return (
        <div className="ListTodoComponent">
            <h1>Your agenda for the day!</h1>
            <div>
                Your List of To-Do items :

                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Completed?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todoList.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        </div>
    )
}


function HeaderComponent() {
    return (
        <div className="header">
            Header <hr/>
        </div>
    )
}

function FooterComponent() {
    return (
        <div className="footer">
            <hr/> Footer
        </div>
    )
}

function LogoutComponent() {
    return (
        <div className="LogoutComponent">
           <h1>You are logged out!</h1>
            <div>
                Thank You! Come back soon.
            </div>
        </div>
    )
}