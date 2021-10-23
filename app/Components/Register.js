import React from 'react'
import update from "immutability-helper";
import APIInvoker from "../Utils/APIInvoker";
import css from "../assets/css/Register.css";

class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            nombre: '',
            apellidoPaterno: '',
            userName:'',
            password:'',
            fechaNacimiento : ''
        }
        this.status = false
        this.usernameOk = false
    }

    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }

    usernameValidate(e){
        let userName = this.state.userName
        if (userName) {
            APIInvoker.invokeGET(`/users/usernameValidate/${userName}`,data => {
                this.username.innerHTML = '* El nombre de usuario no está disponible'
                this.usernameOk = false
            }, error => {
                this.username.innerHTML = ''
                this.usernameOk =  true
            })
        } else
            this.usernameOk = false
    }

    validarCampos(){
        let estado = true;

        if (this.state.nombre.length === 0) {
            this.nombre.innerHTML = '* Campo obligatorio'
            estado = false;
        } else{
            this.nombre.innerHTML = ''
        }

        if (this.state.apellidoPaterno.length === 0) {
            this.apellidoPaterno.innerHTML = '* Campo obligatorio'
            estado = false;
        } else
            this.apellidoPaterno.innerHTML = ''

        if (this.state.userName.length === 0) {
            this.username.innerHTML = '* Campo obligatorio'
            estado = false;
        }

        if (this.state.password.length === 0) {
            this.password.innerHTML = '* Campo obligatorio'
            estado = false;
        } else
            this.password.innerHTML = ''

        if (this.state.fechaNacimiento.length === 0) {
            this.fechaNacimiento.innerHTML = '* Campo obligatorio'
            estado = false;
        }else
            this.fechaNacimiento.innerHTML = ''


        if (estado === false)
            this.status = false
        else
            this.status = true

    }
    crearCuenta(e){
        this.messageError.innerHTML = ''
        this.validarCampos()

        if (this.status && this.usernameOk) {
            let user = {
                nombre: this.state.nombre,
                apellidoPaterno: this.state.apellidoPaterno,
                userName: this.state.userName,
                password: this.state.password,
                fechaNacimiento : this.state.fechaNacimiento
            }
            APIInvoker.invokePOST('/users/signup', user, data => {
                alert(data.message)
                this.usernameOk = false
                this.props.history.push('/')
            }, error => {
                alert(error.message + error.error)
            })
        }
        else {
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }

    }

    render() {
        return(
            <div>
                <div className="center">
                    <div className="container">
                        <div className="card overflow-hidden my-5 pt-sm-5">
                            <div className="bg-login-overlay"></div>
                            <div className="row justify-content-around">
                                <div className="col-5">
                                    <div className="card overflow-hidden container">
                                        <div className="bg-login text-center">
                                            <div className="position-relative">
                                                <h4 className="text-white ">Registro!</h4>
                                                <p className="text-white mb-0">Ingrese los datos requeridos.</p>

                                            </div>
                                        </div>
                                        <div className="card-body pt-5">
                                            <div className="p-2">
                                                <form className="form-horizontal">
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="text"
                                                               name="nombre"
                                                               id="nombre"
                                                               placeholder="Manuel"
                                                               value={this.state.nombre}
                                                               onChange={this.changeField.bind(this)}/>
                                                        <label htmlFor="Nombre">Nombre</label>
                                                    </div>
                                                    <label ref={self=> this.nombre = self} className="form-text text-danger"></label>
                                                    <br/>
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="text"
                                                               name="apellidoPaterno"
                                                               id="apellidoPaterno"
                                                               placeholder="Ballinas"
                                                               value={this.state.apellidoPaterno}
                                                               onChange={this.changeField.bind(this)}/>
                                                        <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                                                    </div>
                                                    <label ref={self=> this.apellidoPaterno = self} className="form-text text-danger"></label>
                                                    <br/>
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="text"
                                                               name="userName"
                                                               id="userName"
                                                               placeholder="manu"
                                                               value={this.state.username}
                                                               onChange={this.changeField.bind(this)}
                                                               onBlur={this.usernameValidate.bind(this)}/>
                                                        <label htmlFor="username">Nombre de usuario</label>
                                                    </div>
                                                    <label ref={self=> this.username = self} className="form-text text-danger"></label>
                                                    <br/>
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="password"
                                                               name="password"
                                                               id="password"
                                                               placeholder="1234"
                                                               value={this.state.password}
                                                               onChange={this.changeField.bind(this)}/>
                                                        <label htmlFor="password">Contraseña</label>
                                                    </div>
                                                    <label ref={self=> this.password = self} className="form-text text-danger"></label>
                                                    <br/>
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="date"
                                                               name="fechaNacimiento"
                                                               id="fechaNacimiento"
                                                               value={this.state.fechaNacimiento}
                                                               onChange={this.changeField.bind(this)}/>
                                                        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                                                    </div>
                                                    <label ref={self=> this.fechaNacimiento = self} className="form-text text-danger"></label>
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
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}
export default Register;