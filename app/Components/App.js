import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

//componentes
//import Header from "./Header";
import Footer from "./interfaz/Footer";
import NotFound from "../Pages/NotFound";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

//Pedidos
import Orders from "./Pedidos/Orders";
import pedidos from "./Pedidos/pedidos";

//Clientes
import cliente from "./Clientes/cliente";

//Tamales
import tamales from "./tamales/Tamales";

class App extends React.Component{
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/Login' component={Login}/>
                        <Route exact path='/Register' component={Register}/>
                        <Route exact path='/Home' component={Home}/>

                        <Route exact path='/Orders' component={Orders}/>
                        <Route exact path='/cliente' component={cliente}/>
                        <Route exact path='/tamales' component={tamales}/>
                        <Route exact path='/pedidos' component={pedidos}/>

                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}
export default App;