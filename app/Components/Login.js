import React from "react";
import update from "immutability-helper";
import css from "../assets/css/Login.css";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
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
    }
    iniciarSesion(e){
        //Signup
        let user = {
            userName: this.state.username,
            password: this.state.password
        }
    }
    render() {
        return(
            <div>
                <div className="center">
                    <div className="container">
                        <div className="card overflow-hidden my-5 pt-sm-5">
                            <div className="bg-login-overlay"/>
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
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control"
                                                               type="text"
                                                               name="username"
                                                               id="username"
                                                               placeholder="Manuel"
                                                               aria-describedby="usernameHelp"
                                                               value={this.state.username}
                                                               onChange={this.changeField.bind(this)}
                                                               onBlur={this.usernameValidate.bind(this)}/>
                                                        <label htmlFor="username">Nombre de usuario</label>
                                                        <div id="usernameMessage"
                                                             ref={self => this.label = self}
                                                             className="form-text text-black">
                                                        </div>
                                                    </div>
                                                    <div className="form-floating">
                                                        <input className="form-control"
                                                               type="password"
                                                               name="password"
                                                               id="password"
                                                               placeholder="1234"
                                                               aria-describedby="passwordHelp"
                                                               value={this.state.password}
                                                               onChange={this.changeField.bind(this)}/>
                                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                                        <div id="passwordHelp"
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
                                                        <button className="btn btn-outline-primary btn-block waves-effect waves-light"
                                                                type="button"
                                                                onClick={this.iniciarSesion.bind(this)}>Iniciar sesión
                                                        </button>
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <h4 className="font-size-20">Aun no tienes una cuenta?</h4>
                                                        <p><a href="/Register"
                                                              className="btn btn-outline-primary btn-sm"> Registrese ahora </a></p>
                                                    </div>
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
}
export default Login;