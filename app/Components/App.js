import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

//componentes
//import Header from "./Header";
import Footer from "./Footer";
import NotFound from "../Pages/NotFound";
import Hola from "./Hola";

class App extends React.Component{
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Hola}/>y
                        <Route component={NotFound}/>git add
                    </Switch>
                </BrowserRouter>
                <Footer/>

            </div>
        )
    }
}
export default App;