import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

//componentes
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import NotFound from "../Pages/NotFound";

class App extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/Home' component={Home}/>
                        <Route component={NotFound}/>git add
                    </Switch>
                </BrowserRouter>
                <Footer/>

            </div>
        )
    }
}
export default App;