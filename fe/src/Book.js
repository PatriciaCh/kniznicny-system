import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Book extends Component {
	render() {
	return (
	<div>
		<h1>BOOKS</h1>
		<p>Tu budú books!</p>
	</div>
	);
  }
}

export default Book;