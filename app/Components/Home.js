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

        APIInvoker.invokeGET('/pedidos/getAllPedidosPendientes', data => {
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
    cambiarEstado(e){
        let idpedido = e.target.value
        console.log(idpedido)
        if(idpedido != undefined){

            APIInvoker.invokeGET( `/pedidos/updatePedido/${idpedido}`, data => {
                alert("Estado del Pedido Actualizado");
                this.actualizarTabla();
            }, error => {
                alert(error.message + error.error)
            })
        }
        else {
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }
    }
    actualizarTabla(e){
        APIInvoker.invokeGET('/pedidos/getAllPedidosPendientes',data => {
            this.setState({
                listPedidos : data.data
            })
        }, error => {
            alert(error.message)
        })
    }

    render() {
        return(
            <div className="center bg-login">
                <div className="container ">
                    <div className="card overflow-hidden my-5 ">
                        <div className="row justify-content-around">
                            <div className="card overflow-hidden container">
                                <div className="card-body pt-5">
                                    <h1>Bienvenido al sistema de Control de tamales.</h1>
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
                                                        <td> {item.estado}
                                                            <button value={item.idpedido}
                                                                    className="btn btn-outline-success"
                                                                    onClick={this.cambiarEstado.bind(this)}>Entregar</button>
                                                        </td>
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