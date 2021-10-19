import React from 'react'
import Header from "./Header";
class Orders extends React.Component{

    constructor() {
        super()
        this.state = {
            idOrder: '',
            idClient:'',
            idTamal:'',
            quantity:'',
            dateOfDelivery: '',
            orderState: '',
            typePayment: '',
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


            //Extraer el catálogo de roles del backend
        APIInvoker.invokeGET('/', data => {  //Entrará acá cuando status = true
            this.setState({
                ordersList : data.data
            })
            console.log(this.state.ordersList)
        }, error => { //Entrará acá cuando status = false
        })

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
        let idProducto = this.state.idProducto
        if (idProducto) {
            APIInvoker.invokePOST(`/products/deleteProduct/${idProducto}`, data => {  //Entrará acá cuando status = true
                alert(data.message)
            }, error => {
                alert(error.message )
            })
        }

    }


    render() {
        return(

            <div>


                <h2 id="HeaderAdmin"><Header/></h2>


                <div>

                    <label htmlFor='idProducto'> Producto a eliminar</label>
                    <select name="idProducto" id="idProducto" value={this.state.idOrder}
                            onChange={this.changeField.bind(this)}>
                        <For each="item" index="idx" of={this.state.ordersList}>
                            <option key={idx} value={item.idProducto}>{item.nameProduct}</option>
                        </For>

                    </select>


                </div>


                <table className="table" name="idProducto" id="idProducto" value={this.state.idOrder}
                       onChange={this.changeField.bind(this)}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="table-info">
                            <For each="item" index="idx" of={this.state.ordersList}>
                                <li type="circle" key={idx} value={item.idOrder}>
                                    {item.idProducto}
                                </li>
                            </For>
                        </td>

                        <td className="table-primary">
                            <For each="item" index="idx" of={this.state.ordersList}>
                                <li type="circle" key={idx} value={item.idOrder}>
                                    {item.quantity}
                                </li>
                            </For>
                        </td>

                        <td className="table-info">
                           <For each="item" index="idx" of={this.state.ordersList}>
                                <li type="circle" key={idx} value={item.idOrder}>
                                    {item.nameProduct}
                                </li>
                            </For>
                        </td>

                        <td className="table-primary">
                            <For each="item" index="idx" of={this.state.ordersList}>
                                <li type="circle" key={idx} value={item.idOrder}>
                                    {item.price}
                                </li>
                            </For>
                        </td>

                    </tr>
                    </tbody>
                </table>

                <button type="button" className="btn btn-warning" id="textcolor"
                        onClick={this.deleteProduct.bind(this)}> ELIMINAR
                </button>

            </div>

        )
    }
}