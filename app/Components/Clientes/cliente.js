import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";
import update from "immutability-helper";
import Modal from "../Modal";
class cliente extends React.Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            direccion: '',
            numeroTelefono:'',
            listClientes : [],
            oculto : true,
            status: false,
            show: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.listClientes = []

        APIInvoker.invokeGET('/cliente/getAllClientes', data => {
            this.setState({
                listClientes : data.data,
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
        APIInvoker.invokeGET('/cliente/getAllClientes',data => {
            this.setState({
                listClientes : data.data
            })
        }, error => {
            alert(error.message)
        })
    }

    mostrar(e){
        if(this.state.oculto === true){
            this.addCliente.style.display = 'block'
            this.state.oculto = false
        }else{
            this.addCliente.style.display = 'none'
            this.state.oculto = true
        }
    }

    crearCuenta(e){
        this.messageError.innerHTML = ''
        this.validarCampos()

        if (this.status) {
            let cliente = {
                nombre: this.state.nombre,
                direccion: this.state.direccion,
                numeroTelefono : this.state.numeroTelefono
            }
            APIInvoker.invokePOST('/cliente/addCliente', cliente, data => {
                alert(data.message)
                this.status = false
                this.addCliente.style.display = 'none'
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

        if (this.state.nombre.length === 0) {
            this.nombre.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.nombre.innerHTML = ''
        }
        if (this.state.direccion.length === 0) {
            this.direccion.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.direccion.innerHTML = ''
        }
        if (this.state.numeroTelefono.length === 0) {
            this.numeroTelefono.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.numeroTelefono.innerHTML = ''
        }
        if (estado === false){
            this.status = false

        } else{
            this.status = true
        }
    }
    eliminarCliente(e){
        let idCliente = e.target.value
        if(idCliente != undefined){
            console.log(idCliente)
            APIInvoker.invokeDELETE(`/cliente/deleteCliente/${idCliente}`,
                data => {
                    alert(data.message)
                },
                error => {
                    alert(error.message + error.error)
                })
        }else{
            alert("Error al eliminar intente de nuevo")
        }
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


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
                                                <div className="col-10 ">
                                                    <button type="button"
                                                            className="btn btn-outline-primary btn-lg"
                                                            onClick={this.mostrar.bind(this)}>Agregar
                                                    </button>
                                                </div>
                                                <Modal show={this.state.show} handleClose={this.hideModal}>
                                                    <div id="addCliente"
                                                         ref={self => this.addCliente = self}>
                                                        <div className="card overflow-hidden container">
                                                            <div className="card-body pt-5">
                                                                <h4>Editar cliente</h4>
                                                                <form className="form-horizontal">
                                                                    <div className="form-floating">
                                                                        <input className="form-control"
                                                                               type="text"
                                                                               name="nombre"
                                                                               id="nombre"
                                                                               placeholder="Manuel"
                                                                               value={this.state.nombre}
                                                                               onChange={this.changeField.bind(this)}/>
                                                                        <label htmlFor="nombre">Nombre</label>
                                                                    </div>
                                                                    <label ref={self=> this.nombre = self}
                                                                           className="form-text text-danger"></label>
                                                                    <div className="form-floating">
                                                                        <input className="form-control"
                                                                               type="text"
                                                                               name="direccion"
                                                                               id="direccion"
                                                                               placeholder="Calle"
                                                                               value={this.state.direccion}
                                                                               onChange={this.changeField.bind(this)}/>
                                                                        <label htmlFor="direccion">Dirección</label>
                                                                    </div>
                                                                    <label ref={self=> this.direccion = self}
                                                                           className="form-text text-danger"></label>
                                                                    <div className="form-floating">
                                                                        <input className="form-control"
                                                                               type="text"
                                                                               name="numeroTelefono"
                                                                               id="numeroTelefono"
                                                                               placeholder="968-855-96-74"
                                                                               value={this.state.numeroTelefono}
                                                                               onChange={this.changeField.bind(this)}/>
                                                                        <label htmlFor="numeroTelefono">Numero de Telefono</label>
                                                                    </div>
                                                                    <label ref={self=> this.numeroTelefono = self}
                                                                           className="form-text text-danger"></label>
                                                                    <br/>
                                                                    <div className="d-grid gap-2">
                                                                        <button className="btn btn-outline-success"
                                                                                type="button"
                                                                                onClick={this.crearCuenta.bind(this)}>Registrar
                                                                        </button>
                                                                        <button className="btn btn-outline-danger"
                                                                                type="button"
                                                                                onClick={this.hideModal}>Cancelar
                                                                        </button>
                                                                    </div>
                                                                    <div ref={self => this.messageError = self}></div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>

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
                                                        </svg></button>
                                                </div>
                                            </div>
                                            <div id="addCliente"
                                                 className="ocultar"
                                                 ref={self => this.addCliente = self}>
                                                <div className="card overflow-hidden container">
                                                    <div className="card-body pt-5">
                                                        <h4>Agregar nuevo cliente</h4>
                                                        <form className="form-horizontal">
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="text"
                                                                       name="nombre"
                                                                       id="nombre"
                                                                       placeholder="Manuel"
                                                                       value={this.state.nombre}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="nombre">Nombre</label>
                                                            </div>
                                                            <label ref={self=> this.nombre = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="text"
                                                                       name="direccion"
                                                                       id="direccion"
                                                                       placeholder="Calle"
                                                                       value={this.state.direccion}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="direccion">Dirección</label>
                                                            </div>
                                                            <label ref={self=> this.direccion = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="text"
                                                                       name="numeroTelefono"
                                                                       id="numeroTelefono"
                                                                       placeholder="968-855-96-74"
                                                                       value={this.state.numeroTelefono}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="numeroTelefono">Numero de Telefono</label>
                                                            </div>
                                                            <label ref={self=> this.numeroTelefono = self}
                                                                   className="form-text text-danger"></label>
                                                            <br/>
                                                            <div className="d-grid gap-2">
                                                                <button className="btn btn-outline-success"
                                                                        type="button"
                                                                        onClick={this.crearCuenta.bind(this)}>Registrar
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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Direccion</th>
                                                        <th scope="col">Numero de telefono</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <For each="item"
                                                             index="idx"
                                                             of={ this.state.listClientes}>
                                                            <tr key={idx}>
                                                                <td>{item.nombre}</td>
                                                                <td>{item.direccion}</td>
                                                                <td> {item.numeroTelefono}</td>
                                                                <td>
                                                                    <button className="btn btn-light"
                                                                            value={item.idCliente}
                                                                            onClick={this.eliminarCliente.bind(this)}>
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
                                                                <td>
                                                                    <button className="btn btn-light"
                                                                            value={item.idCliente}
                                                                            onClick={this.showModal}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="16" height="16" fill="currentColor"
                                                                             className="bi bi-pencil-fill"
                                                                             viewBox="0 0 16 16">
                                                                            <path
                                                                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
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
export default cliente;