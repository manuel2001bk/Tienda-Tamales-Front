import React from 'react'
import {Link} from 'react-router-dom'

class NotFound extends React.Component {
    render() {
        return(
            <div>
                <h1>Pagina no encontrada.</h1>
                <Link to='/'>
                    <button class="btn btn-outline-dark" >Pagina principal</button>
                </Link>
            </div>
        )
    }
}
export default NotFound;