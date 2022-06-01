import React from "react";
import update from "immutability-helper";
import css from "../assets/css/Login.css";
import APIInvoker from "../Utils/APIInvoker";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username:'',
            password:''
        }
    }
    componentDidMount() {
        if(window.localStorage.getItem('token')){
            alert("Sesión ya iniciada")
            this.props.history.push('/home')
        }
    }
    changeField(e) {
        let field = e.target.name
        let value = e.target.value
        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    usernameValidate(e){
        let username = this.state.username
        if (this.state.username.length === 0) {
            this.label.innerHTML = '* Campo obligatorio'
        }
        APIInvoker.invokeGET(`/users/usernameValidate/${username}`,
            data => {
                this.label.innerHTML = ""
            },
            error => {
                this.label.innerHTML = "El usuario no existe."
            })
    }
    iniciarSesion(e){
        //Signup
        if (this.state.username.length === 0) {
            this.label.innerHTML = '* Campo obligatorio'
        }else{
            if (this.state.password.length === 0){
                this.pass.innerHTML = '* Campo obligatorio'
            }else{
                let user = {
                    userName: this.state.username,
                    password: this.state.password
                }
                APIInvoker.invokePOST('/users/login',user, data => {
                    //alert(data.message)
                    window.localStorage.setItem('token', data.token)
                    this.props.history.push('/Home')
                }, error => {
                    //alert(error.message)
                    this.pass.innerHTML = error.message
                })
                e.preventDefault();
            }
        }
    }
    render() {
        return(
            <div>        
                <div className="center">
                    <div className="container">
                        <div className="card overflow-hidden my-5 pt-sm-6">
                            <div className="bg-login-overlay"/>
                            <div className="center">
                                <div className="col">
                                    <div className="card overflow-hidden container">
                                        <div className="bg-login text-center">
                                            <div className="position-relative">
                                                <h4 className="amber-text text-lighten-4 mb-0">Bienvenido!</h4>
                                                <p className="amber-text text-lighten-4 mb-0">Ingrese los datos requeridos</p>

                                            </div>
                                        </div>
                                        <div className="card-body pt-5">
                                            <div className="p-2">
                                            <div className="row">
                                                <form className="mb-3">
                                                    <div className="d-grid gap-3 mt-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                id="username"
                                                                className="validate"
                                                                value={this.state.username}
                                                                onChange={this.changeField.bind(this)}
                                                                onBlur={this.usernameValidate.bind(this)}
                                                            />
                                                            <label>Nombre de Usuario</label>
                                                            <div id="usernameMessage"
                                                                 ref={self => this.label = self}
                                                                 className="form-text text-danger">
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                className="validate"
                                                                value={this.state.password}
                                                                onChange={this.changeField.bind(this)}
                                                            />
                                                            <label>Contraseña</label>
                                                            <div id="passwordHelp"
                                                                 ref={self => this.pass = self}
                                                                 className="form-text text-danger">
                                                            </div>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox"
                                                                   id="flexCheckDefault"/>
                                                            <label className="form-check-label"
                                                                   htmlFor="flexCheckDefault">
                                                                Recordar
                                                            </label>
                                                        </div>
                                                        <div className="d-grid gap-3 mt-4">
                                                            <button className=" amber lighten-2 btn btn-outline-primary btn-block waves-effect waves-light"
                                                                    type="button"
                                                                    onClick={this.iniciarSesion.bind(this)}>Iniciar sesión
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 input-field col s6">
                                                    </div>
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
            </div>
              
        )
    }
}
export default Login;