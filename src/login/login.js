import React, { Component } from 'react';
import axios from 'axios';
import Register from "./register"


class Login extends Component {
  constructor() {
    super()
    this.state = {
        name: "",
        password: "",
        isRegister: true
    }
  }

  handleSelect = event => {
    const {value, name} = event.target;    
    this.setState({[name]: value})
  }

  login = async () =>{
    let info = await axios.get(`http://localhost:2011/login/${this.state.name}/${this.state.password}`)
    if (info){

    }else{
        alert("the username or the password is rong")
    }
    this.setState({
      name: "",
      password: ""
    })
  }

  registe = () =>{
      this.setState({isRegister : false})
  }

  render() {
    if (!isRegister){
        return(
            <Register />
        )
    }else{
        return (
            <div>
                <div>
                  <input id ="Name" value={this.state.amount} name="name" onChange={this.handleSelect}></input>
                  <input id ="password" value={this.state.vendor} name="password" onChange={this.handleSelect}></input>
                </div>
                <div>
                    <button onClick = {this.login}>Login</button>
                    <button onClick = {this.registe}>register</button>
                </div>
            </div>
          )
    }
    

  }
}

export default Login