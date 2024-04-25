import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllApiService} from "../api/ApiService";
import loginComponent from "./LoginComponent";



function ListTodoComponent() {

    const today = new Date();

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todoList,setTodoList] = useState([])

    const [message, setMessage] = useState([null])

    useEffect (() => refreshToDoList(), [])





    function refreshToDoList() {
        retrieveAllApiService('GeorgeTudor')
            .then(response => {
                setTodoList(response.data)
            }
            )
            .catch(error => console.log(error))

    }

    function deleteTodo(id) {
        console.log('clicked delete ' + id)
        deleteTodoApi('GeorgeTudor', id)
            .then(
                // Display message
                () => {
                    setMessage(`Deletetion of todo with ${id} successful`)
                    refreshToDoList()
                }
                // Update our list
            )
            .catch(error => console.log(error))
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
                                    <td> <button className="btn btn-outline-warning"
                                                 onClick={ () => deleteTodo(todo.id)}> Delete </button> </td>
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

export default ListTodoComponent