import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

//componentes
//import Header from "./Header";
import Footer from "./Footer";
import NotFound from "../Pages/NotFound";
import Hola from "./Hola";
import Login from "./Login";
import Register from "./Register";

class App extends React.Component{
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Hola}/>
                        <Route exact path='/Login' component={Login}/>
                        <Route exact path='/Register' component={Register}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>

            </div>
        )
    }
}
export default App;