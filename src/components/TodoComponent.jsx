import {isRouteErrorResponse, useParams} from 'react-router-dom';
import {retrieveTodoApi} from "../api/ApiService";
import {useAuth} from "../security/AuthenticationContext";
import {useEffect, useState} from "react";


export default function TodoComponent(){
    const {id} = useParams()

    const [description, setDescription] = useState('')

    const authContext = useAuth()

    const username = authContext.username;

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos() {
        retrieveTodoApi(username, id)
            .then(response => {
               setDescription(response.data.description)

            })
            .catch(error => console.log(error))

    }


    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                description : {description}
            </div>
        </div>

    )
}