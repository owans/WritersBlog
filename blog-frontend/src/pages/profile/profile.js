import React, {Component} from "react";
import axios from "axios";

export default class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            user: null
        }

        this.logOut = this.logOut.bind(this);
    }
    async componentDidMount(){
        try{
            const token = localStorage.getItem("blog-token");

            if(!token) return this.props.history.push("/");

            const res = await axios.get("http://localhost:2004/writer/profile", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            this.setState({loading: false, user: res.data.data});
        }catch(err){
            console.log(err);
            this.props.history.push("/");
        }
    }

    logOut(){
        localStorage.removeItem("blog-token");

        this.props.history.push("/");
    }
    render(){
        if(this.state.loading) return <p>Loading...</p>
        return(
            <div>
                <p>First name: {this.state.user.first_name}</p>
                <p>Email: {this.state.user.email}</p>
                <p>Gender: {this.state.user.gender}</p>

                <button type="submit" name="submit" onClick={this.logOut}>Logout</button>
            </div>
        )
    }
}