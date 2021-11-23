import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";
import update from "immutability-helper";
import css from "../../assets/css/tamal.css"

class tamal extends React.Component {
    constructor() {
        super();
        this.state = {
            nombre : '',
            precio : 0,
            existencias : 0,
            listTamales : [],
            oculto : true,
            status: false
        }
        this.listTamales = []

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
        APIInvoker.invokeGET('/tamales/getAllTamales',data => {
            this.setState({
                listTamales : data.data
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

    registrarTamal(e){
        this.messageError.innerHTML = ''
        this.validarCampos()

        if (this.status) {
            let tamales = {
                nombre: this.state.nombre,
                precio: this.state.precio,
                existencias : this.state.existencias
            }
            APIInvoker.invokePOST('/tamales/addTamal', tamales, data => {
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
        if (this.state.precio.length === 0) {
            this.precio.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.precio.innerHTML = ''
        }
        if (this.state.existencias.length === 0) {
            this.existencias.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.existencias.innerHTML = ''
        }
        if (estado === false){
            this.status = false
        } else{
            this.status = true
        }
    }
    eliminarTamal(e){
        let idTamal = e.target.value
        if(idTamal != undefined){
            console.log(idTamal)
            APIInvoker.invokeDELETE(`/tamales/deletetamal/${idTamal}`,
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
                                            <div id="addCliente"
                                                 className="ocultar"
                                                 ref={self => this.addCliente = self}>
                                                <div className="card overflow-hidden container">
                                                    <div className="card-body pt-5">
                                                        <h4>Añadir Tamales</h4>
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
                                                                       type="number"
                                                                       name="precio"
                                                                       id="precio"
                                                                       placeholder="precio"
                                                                       value={this.state.precio}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="precio">Precio</label>
                                                            </div>
                                                            <label ref={self=> this.precio = self}
                                                                   className="form-text text-danger"></label>
                                                            <div className="form-floating">
                                                                <input className="form-control"
                                                                       type="number"
                                                                       name="existencias"
                                                                       id="existencias"
                                                                       placeholder="50"
                                                                       value={this.state.existencias}
                                                                       onChange={this.changeField.bind(this)}/>
                                                                <label htmlFor="existencias">Existencias</label>
                                                            </div>
                                                            <label ref={self=> this.existencias = self}
                                                                   className="form-text text-danger"></label>
                                                            <br/>
                                                            <div className="d-grid gap-2">
                                                                <button className="btn btn-outline-success"
                                                                        type="button"
                                                                        onClick={this.registrarTamal.bind(this)}>Registrar
                                                                </button>
                                                            </div>
                                                            <div ref={self => this.messageError = self}></div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <table className="table ">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Existencias</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <For each="item"
                                                         index="idx"
                                                         of={ this.state.listTamales}>
                                                        <tr key={idx}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.precio}</td>
                                                            <td> {item.existencias}</td>
                                                            <td >
                                                                <button className="btn btn-light"
                                                                        value={item.idTamal}
                                                                        onClick={this.eliminarTamal.bind(this)}>
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
export default tamal;