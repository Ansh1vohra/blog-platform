import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
            <img src="https://cdn.vectorstock.com/i/500p/81/59/404-error-page-not-found-tiny-people-vector-51588159.jpg" alt="404 Not Found"></img>
            <Link to="/"><button className="btn btn-dark">Back to Home</button></Link>
        </div>
    )
}