import React, {Component} from "react";
import axios from 'axios';
import "./register.css";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            age: "",
            gender: "",
            email: "",
            password: ""
        }

        this.onChange = this.onChange.bind(this);
        this.doesFormHaveErrors = this.doesFormHaveErrors.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("blog-token");

        if(token) return this.props.history.push("/profile");
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    doesFormHaveErrors(){
        const required = ["first_name","last_name","gender","email","password"]
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
            const res = await axios.post("http://localhost:2004/writer", this.state);

            const token = res.data.data.token;

            localStorage.setItem("blog-token", token);

            this.props.history.push("/profile");
        }catch(err){
            console.log("An error occured", err.response);
        }
        
    }

    render(){
        return(
            <div className="register">
                <h1>Register to be a Writer</h1>
                <input type="text" name="first_name" placeholder="First name" onChange={this.onChange}/>
                <input type="text" name="last_name" placeholder="Last name" onChange={this.onChange}/>
                <input type="text" name="age" placeholder="Age" onChange={this.onChange}/>
                <select name="gender" onChange={this.onChange}>
                    <option>gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input type="email" name="email" placeholder="Email" onChange={this.onChange}/>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>

                <input type="submit" value="Register ✝" onClick={this.submitForm} disabled = {this.doesFormHaveErrors()}/>
            </div>
        )
    }


}