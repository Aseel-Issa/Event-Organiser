import React, { Component } from 'react';
import axios from 'axios';
import Login from "./login"


class Register extends Component {
  constructor() {
    super()
    this.state = {
        name: "",
        password: "",
        confirmPassword:"",
        phone:"",
        email:"",
        addres:"",
        userType: "Client"
    }
  }

  handleSelect = event => {
    const {value, name} = event.target;    
    this.setState({[name]: value})
  }

  login = async () =>{
    if(this.password != this.confirmPassword){
        alert("your password dose not match")
        this.setState({
            password:"",
            confirmPassword:""
        })
        return
    }
    let info = await axios.get(`http://localhost:2011/register` , this.state)
    if (info){

    }else{
        alert("the username or the password is rong")
    }
    this.setState({
      name: "",
      password: "",
      confirmPassword:"",
      phone:"",
      email:"",
      addres:""
    })
  }

  
  changeType =() =>{
    if(this.state.userType == ("Client")){
        this.setState({userType : "Manger"})
    }
    if(this.state.userType == ("Manger")){
        this.setState({userType : "Client"})
    }
   
  }

  render() {
   
    return (
        <div>
            <div>
                <input id ="Name" value={this.state.amount} name="name" onChange={this.handleSelect}></input>
                <input id ="password" value={this.state.vendor} name="password" onChange={this.handleSelect}></input>
                <input id ="confirmPassword" value={this.state.amount} name="confirmPassword" onChange={this.handleSelect}></input>
                <input id ="phone" value={this.state.amount} name="phone" onChange={this.handleSelect}></input>
                <input id ="email" value={this.state.amount} name="email" onChange={this.handleSelect}></input>
                <input id ="addres" value={this.state.amount} name="addres" onChange={this.handleSelect}></input>

            </div>
            <div>
                <button onClick = {this.changeType}>{this.state.userType}</button>
                <button onClick = {this.registe}>register</button>
            </div>
        </div>
        )

    

  }
}

export default Register