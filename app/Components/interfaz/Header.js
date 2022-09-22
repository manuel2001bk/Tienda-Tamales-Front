import React from 'react'
import Logo from "../../assets/Images/logo-tukisoft.jpeg"

class Header extends React.Component {
    salir(e){
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    render() {
        return(
            <div>
                <nav  className= "amber lighten-2">
                    <div className="navbar-fixed">
                    <div className="nav-wrapper">
                    <a href={Logo} className="brand-logo right"></a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        
                        <li><a href="/Home">Inicio</a></li>
                        <li><a href="/cliente">Clientes</a></li>
                        <li><a href="/tamales">Tamales</a></li>
                        <li><a href="/pedidos">Pedidos</a></li>
                        <li><a onClick={this.salir.bind(this)} href="/Login">Salir</a></li>
                    </ul>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;