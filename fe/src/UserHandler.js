import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Employee from './Employee.js';
import Form from './Form.js';
import Book from './Book.js';
import Reader from './Reader.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class UserHandler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: false,
			content: ""
		}
	}

	getUserType=()=> {
		switch (sessionStorage.getItem('type')) {
			case "1": // admin
				this.setState({content: <Employee/>});
				break;
			case "2": // employee
				this.setState({content: <Form/>});
				break;
			case "3": // reader
				this.setState({content: <Book/>});
				break;
			}
	}

	componentDidMount() {
		this.getUserType();
	}

	render() {
		return (
			<div>{this.state.content}</div>
			);
  }
}

export default UserHandler;