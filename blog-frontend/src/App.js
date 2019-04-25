import React, {Component} from "react";
import {Route} from "react-router-dom";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";

export default class App extends Component{
    render(){
        return(
            <div>
                <Route exact path="/" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/login" component={Login}/>
            </div>
        )
    }
}