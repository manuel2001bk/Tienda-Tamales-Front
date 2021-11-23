import React from "react";
import update from "immutability-helper";
import APIInvoker from "../Utils/APIInvoker";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            listPedidos : [],
        }
        this.listPedidos = [];

        APIInvoker.invokeGET('/pedidos/getAllPedidosNombres', data => {
            this.setState({
                listPedidos : data.data,
            })
        }, error => {
            alert(error.message)
        })
    }
    componentDidMount() {
        if(!window.localStorage.getItem('token')){
            this.props.history.push('/Login')
        }
    }

    render() {
        return(
            <div className="center bg-login">
                <div className="container ">
                    <div className="card overflow-hidden my-5 ">
                        <div className="row justify-content-around">
                            <div className="card overflow-hidden container">
                                <div className="card-body pt-5">
                                    <h1>Bienvenido al sistema de Control de ventas de tamales.</h1>
                                    <div className="p-2">
                                        <br/>
                                        <div>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Cliente</th>
                                                    <th scope="col">Tamal</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Fecha de Entrega</th>
                                                    <th scope="col">Estado</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <For each="item" index="idx" of={ this.state.listPedidos}>
                                                    <tr key={idx}>
                                                        <td>{item.nombreCliente}</td>
                                                        <td>{item.nombre}</td>
                                                        <td>{item.cantidad}</td>
                                                        <td>{item.fechaEntrega}</td>
                                                        <td>{item.estado}</td>
                                                    </tr>
                                                </For>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;