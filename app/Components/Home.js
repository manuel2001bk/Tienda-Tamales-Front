import React from "react";
import APIInvoker from "../utils/APIInvoker";
import update from "immutability-helper";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            idProducto : 0,
            cantidad : 0,
            total : 0,
            productosList : [],
            listaVentas : []
        }
        this.productosList = []
        this.listaVentas = []
        APIInvoker.invokeGET('/productos/getAllProductos',data => {
            this.setState({
                productosList : data.data
            })
            console.log('lista de productos')
            console.log(this.state.productosList)
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
    IngresarNuevaVenta(e){
        let listaDeVentas = this.state.listaVentas
        let idProducto = this.state.idProducto
        let producto
        APIInvoker.invokeGET(`/productos/getProductoId/${idProducto}`,data => {
            producto = data.body
            let venta = {
                idProducto : idProducto,
                cantidad : this.state.cantidad,
                total : this.state.cantidad * producto.precio
            }
            this.setState({
                total : (this.state.total)+(venta.total)
            })
            listaDeVentas.push(venta)
            this.setState({
                listaVentas : listaDeVentas
            })
            APIInvoker.invokePOST('/ventas/addVenta',venta, data =>{
                //alert(data.message)
            },error =>{
                alert(error.message + error.error)
            })
        }, error => {
            alert(error.message)
        })
        console.log(this.state.listaVentas)
    }
    realizarPago(e){
        alert("Se ha realizado el pago y registro de todas las ventas")
        this.setState({
            listaVentas : []
        })
        this.setState({
            total : 0
        })
        this.setState({
            idProducto : 0
        })
        this.setState({
            cantidad : 0
        })
    }
    render() {
        return(
            <div className="carta-Centro-Grande-Ventas">
                <h2> Realizar venta</h2>
                <div className="card">
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select"
                                                    id="idProducto"
                                                    name="idProducto"
                                                    value={this.state.idProducto}
                                                    aria-label="Floating label select example"
                                                    onChange={this.changeField.bind(this)}>
                                                <option value='0'>Elige Producto</option>
                                                <For each="item" index="idx" of={ this.state.productosList}>
                                                    <option key={idx} value={item.idProducto}>{item.nombre}</option>
                                                </For>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Producto</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="number"
                                                   className="form-control"
                                                   id="cantidad"
                                                   name="cantidad"
                                                   value={this.state.cantidad}
                                                   onChange={this.changeField.bind(this)}/>
                                            <label htmlFor="floatingInputGrid">Cantidad</label>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button type="button"
                                            className="btn btn-outline-info"
                                            onClick={this.IngresarNuevaVenta.bind(this)}>Ingresar</button>
                                </div>
                                <br/>
                                <div>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">SubTotal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <For each="item" index="idx" of={ this.state.listaVentas}>
                                                <tr key={idx}>
                                                    <th scope="row">{item.idProducto}</th>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.total}</td>
                                                </tr>
                                            </For>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="d-grid gap-2 d-md-flex mx-auto justify-content-md-end">
                                <label className="form-text text-dark fs-3">TOTAL: $ {this.state.total}</label>
                            </div>
                            <br/>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button type="button"
                                        className="btn btn-outline-success btn-lg"
                                        onClick={this.realizarPago.bind(this)}>PAGAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;