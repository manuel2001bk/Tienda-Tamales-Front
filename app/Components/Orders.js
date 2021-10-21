import React from 'react'
import Header from "./Header";

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
            ordersList: [],
            quantityList: [],
            deliveryList: [],
            orderStateList: [],
            typePaymentList: [],

            
        }
        this.status = false
        this.ordersList = []
        this.quantityList = []
        this.deliveryList = []
        this.orderStateList = []
        this.typePaymentList = []


            //Extraer todos los pedidos
        APIInvoker.invokeGET('/pedidos/getAllPedidos', data => {  //Entrará acá cuando status = true
            this.setState({
                ordersList : data.data
            })
            console.log(this.state.ordersList)
        }, error => { //Entrará acá cuando status = false
        })

        /*
        //Extraer el catálogo de roles del backend
        APIInvoker.invokeGET('/',data => {  //Entrará acá cuando status = true
            this.setState({
                quantityList : data.data
            })
        }, error => { //Entrará acá cuando status = false
        })

        //Extraer el catálogo de roles del backend
        APIInvoker.invokeGET('/', data => {  //Entrará acá cuando status = true
            this.setState({
                deliveryList : data.data
            })
            console.log(this.state.deliveryList)
        }, error => { //Entrará acá cuando status = false
        })

        */

    }

    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field]: {$set: value}
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


                <div>

                    <label htmlFor='idPedido'> Producto a eliminar</label>
                    <select name="idPedido" id="idPedido" value={this.state.idPedido}
                            onChange={this.changeField.bind(this)}>
                        <For each="item" index="idx" of={this.state.ordersList}>
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
                            <For each="item" index="idx" of={this.state.ordersList}>
                                <li type="circle" key={idx} value={item.idPedido}>
                                    {item.idPedido}
                                </li>
                            </For>
                        </td>



                    </tr>
                    </tbody>
                </table>




            </div>

        )
    }
}
export default Orders;