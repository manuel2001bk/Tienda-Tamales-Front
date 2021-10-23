import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";

class pedidos extends React.Component {
    constructor() {
        super();
        this.state = {
            listPedidos : []
        }
        this.listPedidos = []
        APIInvoker.invokeGET('/pedidos/getAllPedidos', data => {
            this.setState({
                listPedidos : data.data,
            })
            console.log("Lista de cliente"+this.state.listPedidos)
        }, error => {
            alert(error.message)
        })
    }
    actualizarTabla(e){
        APIInvoker.invokeGET('/tamales/getAllTamales',data => {
            this.setState({
                listPedidos : data.data
            })
        }, error => {
            alert(error.message)
        })
    }
    render() {
        return(
            <div>
                <div className="center">
                    <div className="container">
                        <div className="card overflow-hidden my-5 ">
                            <div className="row justify-content-around">
                                <div className="card overflow-hidden container">
                                    <div className="card-body pt-5">
                                        <div className="p-2">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <button type="button"
                                                        className="btn btn-outline-primary"
                                                        onClick={this.actualizarTabla.bind(this)}>Actualizar</button>
                                            </div>
                                            <div>
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Pedido</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Tamal</th>
                                                        <th scope="col">Cantidad</th>
                                                        <th scope="col">Fecha de Entrega</th>
                                                        <th scope="col">Estado</th>
                                                        <th scope="col">Metodo de Pago</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <For each="item" index="idx" of={ this.state.listPedidos}>
                                                        <tr key={idx}>
                                                            <th>{item.idpedido}</th>
                                                            <td>{item.idCliente}</td>
                                                            <td>{item.idTamal}</td>
                                                            <td>{item.cantidad}</td>
                                                            <td>{item.fechaEntrega}</td>
                                                            <td>{item.estado}</td>
                                                            <td>{item.metodoPago}</td>
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
            </div>
        )
    }
}
export default pedidos;