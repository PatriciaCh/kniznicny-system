import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
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
		switch (localStorage.getItem('type')) {
			case 1: 
				this.setState({content: false});
				break;
			}
	}

	componentDidMount() {
		this.getUserType();
	}

	render() {
		return (null);
  }
}

export default UserHandler;