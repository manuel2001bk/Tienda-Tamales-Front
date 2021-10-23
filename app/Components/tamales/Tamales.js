import React from 'react';
import APIInvoker from "../../Utils/APIInvoker";
class tamales extends React.Component {
    constructor() {
        super();
        this.state = {
            listTamales : []
        }
        this.listTamales = []
        APIInvoker.invokeGET('/tamales/getAllTamales', data => {
            this.setState({
                listTamales : data.data,
            })
            console.log("Lista de cliente"+this.state.listTamales)
        }, error => {
            alert(error.message)
        })
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
                                            <div>

                                            </div>
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
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Existencias</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <For each="item" index="idx" of={ this.state.listTamales}>
                                                        <tr key={idx}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.precio}</td>
                                                            <td> {item.existencias}</td>
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
export default tamales;