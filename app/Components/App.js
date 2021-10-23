import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

//componentes
//import Header from "./Header";
import Footer from "./Footer";
import NotFound from "../Pages/NotFound";
import Hola from "./Hola";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Orders from  "./Orders";

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
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>

            </div>
        )
    }
}
export default App;