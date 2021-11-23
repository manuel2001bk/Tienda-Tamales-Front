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
            listClientes : [],
            listTamales : [],
            oculto : true,
        }
        this.listPedidos = []
        this.listClientes = []
        this.listTamales = []
        APIInvoker.invokeGET('/cliente/getAllClientes', data => {
            this.setState({
                listClientes : data.data,
            })
        }, error => {
            alert(error.message)
        })

        APIInvoker.invokeGET('/pedidos/getAllPedidosNombres', data => {
            this.setState({
                listPedidos : data.data,
            })
        }, error => {
            alert(error.message)
        })
        APIInvoker.invokeGET('/tamales/getAllTamales', data => {
            this.setState({
                listTamales : data.data,
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
        this.messageError.innerHTML = ''
        this.validarCampos()

        if (this.status) {
            var pedido = {
                idCliente :  this.state.idCliente,
                idTamal :  this.state.idTamal,
                cantidad :  this.state.cantidad,
                fechaEntrega : this.state.fechaEntrega,
                estado :  'Pendiente',
                metodoPago :  this.state.metodoPago
            }

            APIInvoker.invokePOST('/pedidos/addPedido', pedido, data => {
                alert(data.message)
                this.status = false
                this.addPedido.style.display = 'none'
                this.state.oculto = true
                this.actualizarTabla();
            }, error => {
                alert(error.message + error.error)
            })
        }
        else {
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }
    }
    validarCampos(){
        let estado = true;

        if (this.state.idCliente.length === 0) {
            this.idCliente.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.idCliente.innerHTML = ''
        }
        if (this.state.idTamal.length === 0) {
            this.idTamal.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.idTamal.innerHTML = ''
        }
        if (this.state.cantidad.length === 0) {
            this.cantidad.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.cantidad.innerHTML = ''
        }
        if (this.state.fechaEntrega.length === 0) {
            this.fechaEntrega.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.fechaEntrega.innerHTML = ''
        }
        if (this.state.metodoPago.length === 0) {
            this.metodoPago.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.metodoPago.innerHTML = ''
        }
        if (estado === false){
            this.status = false
        } else{
            this.status = true
        }
    }
    cambiarEstado(e){
        let idpedido = e.target.value
        console.log(idpedido)
        if(idpedido != undefined){
            var pedido = {
                idpedido :  idpedido,
                estado :  'Entregado',
            }
            APIInvoker.invokePOST('/pedidos/updatePedido', pedido, data => {
                alert(data.message)
                this.actualizarTabla();
            }, error => {
                alert(error.message + error.error)
            })
            }
            else {
                this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
            }
    }
    eliminarPedido(e){
        let idpedido = e.target.value
        if(idpedido != undefined){
            console.log(idpedido)
            APIInvoker.invokeDELETE(`/pedidos/deletePedido/${idpedido}`,
                data => {
                    alert(data.message)
                },
                error => {
                    alert(error.message + error.error)
                })
        }


    }
    render() {
        return(
            <div>
                <div className="center bg-login">
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
                                                                <select className="form-select"
                                                                        id="idCliente"
                                                                        name="idCliente"
                                                                        value={this.state.idCliente}
                                                                        aria-label="Floating label select example"
                                                                        onChange={this.changeField.bind(this)}>
                                                                    <option >Elige el Cliente</option>
                                                                    <For each="item" index="idx" of={ this.state.listClientes}>
                                                                        <option key={idx} value={item.idCliente}>{item.nombre}</option>
                                                                    </For>
                                                                </select>
                                                                <label htmlFor="floatingSelectGrid">Cliente</label>
                                                            </div>
                                                            <label ref={self=> this.idCliente = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <select className="form-select"
                                                                        id="idTamal"
                                                                        name="idTamal"
                                                                        value={this.state.idTamal}
                                                                        aria-label="Floating label select example"
                                                                        onChange={this.changeField.bind(this)}>
                                                                    <option >Elige el Tamal</option>
                                                                    <For each="item" index="idx" of={ this.state.listTamales}>
                                                                        <option key={idx} value={item.idTamal}>{item.nombre}</option>
                                                                    </For>
                                                                </select>
                                                                <label htmlFor="floatingSelectGrid">Cliente</label>
                                                            </div>
                                                            <label ref={self=> this.idTamal = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="number"
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
                                                            <label ref={self=> this.fechaEntrega = self} className="form-text text-danger"></label>
                                                            <br/>
                                                            <div className="form-floating">
                                                                <select className="form-select"
                                                                        id="metodoPago"
                                                                        name="metodoPago"
                                                                        value={this.state.metodoPago}
                                                                        aria-label="Floating label select example"
                                                                        onChange={this.changeField.bind(this)}>
                                                                    <option value="Efectivo">Efectivo</option>
                                                                    <option value="Tarjeta">Tarjeta</option>
                                                                </select>
                                                                <label htmlFor="floatingSelectGrid">Metodo de Pago</label>
                                                            </div>
                                                            <label ref={self=> this.metodoPago = self} className="form-text text-danger"></label>
                                                            <br/>
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
                                                                <button className="btn btn-light"
                                                                        value={item.idpedido}
                                                                        onClick={this.eliminarPedido.bind(this)}>
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