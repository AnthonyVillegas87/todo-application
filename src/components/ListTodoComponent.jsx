import {useEffect, useState} from "react";
import {retrieveApiService} from "../api/ApiService";
import loginComponent from "./LoginComponent";

function ListTodoComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())


    const [todoList,setTodoList] = useState([])


    useEffect (() => refreshToDoList(), [])



    
    function refreshToDoList() {
        retrieveApiService('George Tudor')
            .then(response => {

                setTodoList(response.data)
            }
            )
            .catch(error => console.log(error))

    }

    return (
        <div className="container">
            <h1>Your agenda for the day!</h1>
            <div>
                Your List of To-Do items :

                <table className="table">
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
                                    <td>{todo.targetDate.toString()}</td>
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