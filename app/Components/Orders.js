import React from 'react'
import APIInvoker from "../utils/APIInvoker";
import update from "immutability-helper";

class Orders extends React.Component{

    constructor() {
        super()
        this.state = {
            idPedido: '',
            idCliente: '',
            idTamal: '',
            cantidad: '',
            fechaEntrega:'',
            estado: '',
            metodoPago: '',
            orderList: [],
            quantityList: [],
            deliveryList: [],
            orderStateList: [],
            typePaymentList: [],

            
        }
        this.status = false
        this.orderList = []
        this.quantityList = []
        this.deliveryList = []
        this.orderStateList = []
        this.typePaymentList = []

            //Extraer todos los pedidos
        APIInvoker.invokeGET('/pedidos/getAllPedidos', data => {  //Entrará acá cuando status = true
            this.setState({
                orderList : data.data,

            })
            console.log("Lista de pedidos"+this.state.orderList)
        }, error => {
            //Entrará acá cuando status = false
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

    updateData(e){

    }

    deleteProduct(e){
        //Extraer el catálogo de roles del backend
        let idPedido = this.state.idPedido
        if (idPedido) {
            APIInvoker.invokePOST(`/pedidos/deletePedido/${idPedido}`, data => {  //Entrará acá cuando status = true
                alert(data.message)
            }, error => {
                alert(error.message )
            })
        }
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
                                            <div >
                                                <div>
                                                    <label htmlFor='idPedido'> Producto a eliminar</label>
                                                    <select className="form-select"
                                                            id="idPedido"
                                                            name="idPedido"
                                                            value={this.state.idPedido}
                                                            aria-label="Floating label select example"
                                                            onChange={this.changeField.bind(this)}>
                                                        <option value='0'>Elige Producto</option>
                                                        <For each="item" index="idx" of={ this.state.orderList}>
                                                            <option key={idx} value={item.idPedido}>{item.idTamal}</option>
                                                        </For>
                                                    </select>
                                                </div>
                                                <table className="table" name="idPedido" id="idPedido" value={this.state.idPedido}
                                                       onChange={this.changeField.bind(this)}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Tamal</th>
                                                        <th scope="col">Stock</th>
                                                        <th scope="col">Estado</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="table-info">
                                                            <For each="item" index="idx" of={this.state.orderList}>
                                                                <li type="circle" key={idx} value={item.idPedido}>
                                                                    {item.idPedido}
                                                                </li>
                                                            </For>
                                                        </td>
                                                    </tr>
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
export default Orders;