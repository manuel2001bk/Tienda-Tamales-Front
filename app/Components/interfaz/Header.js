import React from 'react'
import Logo from "../../assets/Images/logo-tukisoft.jpeg"

class Header extends React.Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/Home">
                            <img src={Logo} alt="" width="40" height="40"/>
                        </a>
                        <a className="navbar-brand" href="/Home">INICIO</a>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ">
                                <a className="navbar-brand active" role="button"
                                   data-bs-toggle="dropdown" href="/cliente">Clientes
                                </a>
                            </ul>
                            <ul className="navbar-nav ">
                                <li className="nav-item dropdown">
                                    <a className="navbar-brand active" role="button"
                                       data-bs-toggle="dropdown" href="/tamales">Tamales
                                    </a>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="navbar-brand active" role="button"
                                       data-bs-toggle="dropdown" href="/pedidos">Pedidos
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="navbar-nav justify-content-md-end">
                            <a className="nav-link active"
                               aria-current="page" href="/Login" onClick={this.salir.bind(this)}>Salir</a>
                        </div>
                    </div>
                </nav>
            </div>

            /*
             <div className="navbar-nav justify-content-md-end">
                            <a className="nav-link active" aria-current="page" href="/Login">Login</a>
                        </div>
                            <div className="navbar-nav justify-content-md-end">
                                <a className="nav-link active" aria-current="page" href="/Login">Login</a>
                                <a className="nav-link active" href="/Register">Register</a>
                            </div>
             */
        )
    }
   salir(e){
        localStorage.removeItem('token')
       this.props.history.push('/')
   }
}
export default Header;