import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";
import update from "immutability-helper";

class pedidos extends React.Component {
    constructor() {
        super();
        this.state = {
            idPedido: '',
            idCliente: '',
            idTamal: '',
            cantidad: '',
            fechaEntrega:'',
            estado: '',
            metodoPago: '',
            listPedidos : [],
            oculto : true,
        }
        this.listPedidos = []
        APIInvoker.invokeGET('/pedidos/getAllPedidosNombres', data => {
            this.setState({
                listPedidos : data.data,
            })
        }, error => {
            alert(error.message)
        })
    }
    changeField(e) {
        let field = e.target.name
        let value = e.target.value
        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    actualizarTabla(e){
        APIInvoker.invokeGET('/pedidos/getAllPedidosNombres',data => {
            this.setState({
                listPedidos : data.data
            })
        }, error => {
            alert(error.message)
        })
    }
    mostrar(e){
        if(this.state.oculto === true){
            this.addPedido.style.display = 'block'
            this.state.oculto = false
        }else{
            this.addPedido.style.display = 'none'
            this.state.oculto = true
        }
    }
    registrarPedido(e){

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
                                            <div className="row justify-content-end">
                                                <div className="col-10">
                                                    <button type="button"
                                                            className="btn btn-outline-primary btn-lg"
                                                            onClick={this.mostrar.bind(this)}>Agregar</button>
                                                </div>
                                                <div className="col align-self-end">
                                                    <button type="button"
                                                            className="btn btn-outline-primary btn-lg"
                                                            onClick={this.actualizarTabla.bind(this)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             width="16"
                                                             height="16"
                                                             fill="currentColor"
                                                             className="bi bi-arrow-clockwise"
                                                             viewBox="0 0 16 16">
                                                            <path fill="evenodd"
                                                                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div id="addPedido"
                                                 className="ocultar"
                                                 ref={self => this.addPedido = self}>
                                                <div className="card overflow-hidden container">
                                                    <div className="card-body pt-5">
                                                        <h4>Añadir Tamales</h4>
                                                        <form className="form-horizontal">
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="text"
                                                                       name="idCliente"
                                                                       id="idCliente"
                                                                       placeholder="Manuel"
                                                                       value={this.state.idCliente}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="idCliente">Nombre</label>
                                                            </div>
                                                            <label ref={self=> this.idCliente = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="number"
                                                                       name="idTamal"
                                                                       id="idTamal"
                                                                       placeholder="idTamal"
                                                                       value={this.state.idTamal}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="idTamal">Id Tamal</label>
                                                            </div>
                                                            <label ref={self=> this.idTamal = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="text"
                                                                       name="cantidad"
                                                                       id="cantidad"
                                                                       placeholder="50"
                                                                       value={this.state.cantidad}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="cantidad">Cantidad</label>
                                                            </div>
                                                            <label ref={self=> this.cantidad = self}
                                                                   className="form-text text-danger"></label>
                                                            <br/>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="date"
                                                                       name="fechaEntrega"
                                                                       id="fechaEntrega"
                                                                       placeholder="13/03/2000"
                                                                       value={this.state.fechaEntrega}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="fechaEntrega">Fecha de Entrega</label>
                                                            </div>
                                                            <label ref={self=> this.fechaNacimiento = self} className="form-text text-danger"></label>
                                                            <div className="d-grid gap-2">
                                                                <button className="btn btn-outline-success"
                                                                        type="button"
                                                                        onClick={this.registrarPedido.bind(this)}>Registrar
                                                                </button>
                                                            </div>
                                                            <div ref={self => this.messageError = self}></div>
                                                        </form>
                                                    </div>
                                                </div>
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
                                                        <th scope="col"></th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <For each="item" index="idx" of={ this.state.listPedidos}>
                                                        <tr key={idx}>
                                                            <th>{item.idpedido}</th>
                                                            <td>{item.nombreCliente}</td>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.cantidad}</td>
                                                            <td>{item.fechaEntrega}</td>
                                                            <td>{item.estado}</td>
                                                            <td>{item.metodoPago}</td>
                                                            <td>
                                                                <button className="btn btn-light">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="16"
                                                                         height="16"
                                                                         fill="currentColor"
                                                                         className="bi bi-trash"
                                                                         viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                        <path fill="evenodd"
                                                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                    </svg>
                                                                </button>
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
            </div>
        )
    }
}
export default pedidos;