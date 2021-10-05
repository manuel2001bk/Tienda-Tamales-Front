import React from 'react'

class Header extends React.Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/Home">INICIO</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" role="button"
                                       data-bs-toggle="dropdown" >Productos
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/Productos">Lista de Productos</a></li>
                                        <li><a className="dropdown-item" href="/AddProducto">Agregar Nuevo Producto</a></li>
                                        <li><a className="dropdown-item" href="/DeleteProducto">Eliminar Producto</a></li>
                                        <li><a className="dropdown-item" href="/UpdateProducto">Modificar Producto</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="navbar-nav ">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" role="button"
                                       data-bs-toggle="dropdown" >Proveedores
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/Proveedores">Lista de Proveedores</a></li>
                                        <li><a className="dropdown-item" href="/AddProveedor">Agregar Nuevo Proveedor</a></li>
                                        <li><a className="dropdown-item" href="/DeleteProveedor">Eliminar Proveedor</a></li>
                                        <li><a className="dropdown-item" href="/UpdateProveedor">Modificar Proveedor</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" role="button"
                                       data-bs-toggle="dropdown" >Ventas
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/Ventas">Lista de Ventas</a></li>
                                    </ul>
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