import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllApiService} from "../api/ApiService";
import loginComponent from "./LoginComponent";
import {useAuth} from "../security/AuthenticationContext";
import {useNavigate} from "react-router-dom";



function ListTodoComponent() {

    const today = new Date();

    const authContext = useAuth();

    const username = authContext.username;

    const navigate = useNavigate();

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todoList,setTodoList] = useState([])

    const [message, setMessage] = useState([null])

    useEffect (() => refreshToDoList(), [])





    function refreshToDoList() {

            retrieveAllApiService(username)
                .then(response => {
                        setTodoList(response.data)
                    }
                )
                .catch(error => console.log(error))



    }


    // UPDATE FUNCTION
    function updateTodo(id) {
        console.log('clicked update ' + id)
        navigate(`/todo/${id}`)

    }



    // DELETE FUNCTION
    function deleteTodo(id) {
        console.log('clicked delete ' + id)
        deleteTodoApi(username, id)
            .then(
                // Display message
                () => {
                    setMessage(`Deletion of todo with id = ${id} successful`)
                    refreshToDoList()
                }
                // Update our list
            )
            .catch(error => console.log(error))
    }

    // CREATE TODO FUNCTION
    function createNewTodo() {
        navigate(`/todo/-1`)
    }


    return (
        <div className="container">
            <h1>Your List of To-Do items :</h1>
            {message && <div className="alert alert-warning">{message}</div>}

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Completed?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                        todoList.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td>
                                        <button className="btn btn-outline-warning"
                                                onClick={() => deleteTodo(todo.id)}> Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-success"
                                                onClick={() => updateTodo(todo.id)}> Update
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-outline-info m-5" onClick={createNewTodo}>Create New Todo</div>
        </div>
    )
}

export default ListTodoComponent