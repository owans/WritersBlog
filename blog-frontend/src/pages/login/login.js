import React, {Component} from "react";
import axios from "axios";
import "./login.css";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.onChange = this.onChange.bind(this);
        this.doesFormHaveErrors = this.doesFormHaveErrors.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        const token = localStorage.getItem("blog-token");

        if(token) return this.props.history.push("/profile");
    }

    doesFormHaveErrors(){
        const required = ["email","password"]
        let emptyFields = 0;

        required.forEach(field => {
            if(this.state[field] === ""){
                return ++emptyFields;
            }
        })

        return emptyFields > 0 ? true : false;
    }

    async submitForm(){
        if(this.doesFormHaveErrors()) return;

        try{
            const res = await axios.post("http://localhost:2004/writer/login", this.state);

            const token = res.data.data.token;

            localStorage.setItem("blog-token", token);

            this.props.history.push("/profile");
        }catch(err){
            console.log("An error occured", err.response);
        }
        
    }

    render(){
        return(
            <div className="login">
                <h1>Login!</h1>
                <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                onChange={this.onChange}/>

                <input 
                type="password" 
                name="password" 
                placeholder="Password"  
                onChange={this.onChange}/>

                <input 
                type="submit" 
                value="login ✝" 
                onClick={this.submitForm} 
                disabled = {this.doesFormHaveErrors()}/>
            </div>
        )
    }
}