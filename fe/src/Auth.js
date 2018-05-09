import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserHandler from './UserHandler.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: false
		}
	}

	isLogged=()=> {
		if (sessionStorage.getItem('logged')) {
			this.setState({ logged: true});
		} else {
			this.setState({ logged: false});
		}
	}

	didComponentMount() {
		this.isLogged();
	}

	render() {
		if (this.state.logged) {
			return (<UserHandler>{this.props.children}</UserHandler>);
		}
		return (<Redirect to="/login"/>);
  }
}

export default Auth;