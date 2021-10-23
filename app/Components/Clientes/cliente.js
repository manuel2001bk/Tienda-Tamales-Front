import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";
import update from "immutability-helper";


class cliente extends React.Component {
    constructor() {
        super();
        this.state = {
            listClientes : []
        }
        this.listClientes = []
        APIInvoker.invokeGET('/cliente/getAllClientes', data => {
            this.setState({
                listClientes : data.data,
            })
            console.log("Lista de cliente"+this.state.listClientes)
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
        APIInvoker.invokeGET('/cliente/getAllClientes',data => {
            this.setState({
                listClientes : data.data
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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Direccion</th>
                                                        <th scope="col">Numero de telefono</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <For each="item" index="idx" of={ this.state.listClientes}>
                                                        <tr key={idx}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.direccion}</td>
                                                            <td> {item.numeroTelefono}</td>
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