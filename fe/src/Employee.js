import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Employee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueFirstname: "",
			valueLastname: "",
			valueLogin: "",
			valuePass: "",
			warningMessage: "",
			redirect: false,
			redirectPlace: "/"
		}
	}

	validate=()=>{
		const regexAlpha = /^[a-z]{3,15}$/i;
		if (!regexAlpha.test(this.state.valueFirstname)) {
			this.setState({
				warningMessage: "First name length must be more than 3 and must contains only letters!"
			})
			return false;
		}
		if (!regexAlpha.test(this.state.valueLastname)) {
			this.setState({
				warningMessage: "Last name length must be more than 3 and must contains only letters!"
			})
			return false;
		}
		if (this.state.valuePass.length < 8) {
			this.setState({
				warningMessage: "Password must be longer than 8 characters!"
			})
			return false;
		}
		return true;
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		let that = this;
		if (this.validate()){
			axios({
				header: {
					'Access-Control-Allow-Origin': '*'
				},
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/register_user',
				data: {
					firstname: that.state.valueFirstname,
					lastname: that.state.valueLastname,
					login: that.state.valueLogin,
					pass: that.state.valuePass,
				}
			}).then((data) => {
				switch (data.data){
					case "Bad firstname": 
						this.setState({redirect: false});
						break;
					case "Bad lastname": 
						this.setState({redirect: false});
						break;
					case "Bad pass": 
						this.setState({redirect: false});
						break;
					case "Login exist": 
						this.setState({
							warningMessage: "Login exist!"
						});
						this.setState({redirect: false});
						break;
					default:
						this.state.redirectPlace = '/login';
						this.setState({redirect: true});
						
				}
				console.log(data.data);
			})
		}
	}

	handleChange=(e)=>{
		let input =`value${e.target.name}`;
		this.state[input]=e.target.value;
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirectPlace}/>
		}
	return (
	<div>
		Tu je EMPLOYEE
		<form onSubmit={this.handleSubmit}>
			<h1>REGISTRATION</h1>
			<label>
				First name:<br/>
		    	<input type="text" name="Firstname" onChange={this.handleChange} /><br/>
			</label>
			<label>
				Last name:<br/>
		    	<input type="text" name="Lastname" onChange={this.handleChange} /><br/>
			</label>
			<label>
				Login:<br/>
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

export default Employee;