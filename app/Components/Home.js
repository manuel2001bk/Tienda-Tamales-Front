import React from "react";
import {Link} from "react-router-dom";
import update from "immutability-helper";
import css from "../assets/css/Login.css";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username:'',
            password:''
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
                <div className="centerRegister">
                    <div className="card">
                        <div className="card-body">
                            <div className="center-with-page">
                                <h4> Registrar </h4>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Login;