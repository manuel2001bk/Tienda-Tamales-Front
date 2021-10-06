import React from 'react'
import update from "immutability-helper";
import APIInvoker from "../utils/APIInvoker";
import css from "../assets/css/Register.css";

class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            idRol: '1',
            nombre: '',
            apellidoPaterno: '',
            userName:'',
            password:'',
            rolList: []
        }
        this.status = false
        this.usernameOk = false
        this.rolList = []

        //Extraer el catálogo de roles del backend

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

        } else
            this.usernameOk = false
    }

    validarCampos(){
        let estado = true;

        if (this.state.idRol.length === 0) {
            this.idrRol.innerHTML = '* Campo obligatorio'
            estado = false;
        } else
            this.idrRol.innerHTML = ''

        if (this.state.nombre.length === 0) {
            this.nombre.innerHTML = '* Campo obligatorio'
            estado = false;
        } else
            this.nombre.innerHTML = ''

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

        if (estado === false)
            this.status = false
        else
            this.status = true

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
                                                <h4 className="text-white ">Bienvenido!</h4>
                                                <p className="text-white-50 mb-0">Ingrese los datos requeridos.</p>

                                            </div>
                                        </div>
                                        <div className="card-body pt-5">
                                            <div className="p-2">
                                                <form className="form-horizontal">
                                                        <div>
                                                            <select className="form-select form-select-lg"
                                                                    name="idRol"
                                                                    id="idRol"
                                                                    value={this.state.idRol}
                                                                    onChange={this.changeField.bind(this)}>
                                                                <option value='0'>Elige Rol</option>

                                                            </select>
                                                        </div>
                                                        <label ref={self=> this.idrRol = self} className="form-text text-danger"></label>
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
                        <p className="row justify-content-center">© 2021 Tukisoft</p>
                    </div>
                </div>
            </div>
        )
    }
    crearCuenta(e){
        this.messageError.innerHTML = ''
        this.validarCampos()

        if (this.status && this.usernameOk) {
            //register
            let user = {
                idRol: 2,
                nombre: this.state.nombre,
                apellidoPaterno: this.state.apellidoPaterno,
                userName: this.state.userName,
                password: this.state.password
            }

        }
        else {
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }

    }
}
export default Register;