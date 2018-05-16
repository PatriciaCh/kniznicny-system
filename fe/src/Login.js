import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueLogin: "",
			valuePass: "",
			warningMessage: "",
			redirect: false,
			redirectPlace: "/"
		}
		console.log("som tu");
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		let that = this;
		axios({
			method: 'POST',
			url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/login_user',
			data: {
				login: that.state.valueLogin,
				pass: that.state.valuePass,
			}
		}).then((data) => {
			if (data.data) {
				sessionStorage.setItem("type", data.data); // admin / reader / employee

				sessionStorage.setItem('logged', true);
				sessionStorage.setItem("login", this.state.valueLogin);
				switch (data.data) {
					case 1: 
						this.state.redirectPlace = '/admin';
						break;
					case 2: 
						this.state.redirectPlace = '/reader';
						break;
					case 3: 
						this.state.redirectPlace = '/books';
						break;
					default:
						this.state.redirectPlace = '/books';
						break;
				}
				this.setState({redirect: true});
			} else {
				this.state.warningMessage = "Bad login or password!";
				this.setState({redirect: false});
			}
		})
	}

	logout=()=> {
		sessionStorage.removeItem('logged');
		sessionStorage.removeItem('login');
		sessionStorage.removeItem('type');
		this.setState({redirect: true});
	}

	handleChange=(e)=>{
		let input =`value${e.target.name}`;
		this.state[input]=e.target.value;
	}

	render() {
		console.log(this.state.redirectPlace);
		if (this.state.redirect) {
			return <Redirect to={this.state.redirectPlace}/>
		}
		if (sessionStorage.getItem('logged')) {
			return (<div> You are logged as <strong>{sessionStorage.getItem("login")}</strong>. <br/> 
					<input type="button" value="Logout" onClick={this.logout}/></div>)
		} else {
			return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h1>LOGIN</h1>
					<label>
						Login: <br/>
				    	<input type="text" name="Login" onChange={this.handleChange} /><br/>
					</label>
					<label>
				    	Password:<br/>
				    	<input type="password" name="Pass" onChange={this.handleChange} /><br/>
				 	</label>
			 		<span id="warning">{this.state.warningMessage}</span><br/>
					<input type="submit" value="Submit" />
				</form>
			</div>
			);
		}
  }
	
}

export default Login