import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {retrieveAllApiService} from "../api/ApiService";
import {useAuth} from "../security/AuthenticationContext";
function WelcomeComponent() {
    const {username} = useParams()

    const [message,setMessage] = useState(null)

    const authContext = useAuth()

    function callRestApi() {
        retrieveAllApiService(authContext.token)
            .then( (response) => successResponse(response) )
            .catch( (error) => failedResponse(error))
            .finally( () => console.log('cleanup') )

    }

    function successResponse(response) {
        console.log(response)
        setMessage(response.data)
    }

    function failedResponse(error) {
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>

            <div>
               Manage your list of to-dos - <Link to="/todos">Here</Link>
            </div>
            <div>
                <button className="btn btn-info m-5" onClick={callRestApi}>
                    Call back end REST API!
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}


export default WelcomeComponent