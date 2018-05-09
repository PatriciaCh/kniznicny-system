import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Employee from './Employee.js';
import Login from './Login.js';
import Book from './Book.js';
import Auth from './Auth.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const books = function() {
	return (<Auth><Book/></Auth>);
}

class App extends Component {
  render() {
    return (
	  <Router>
	    <div>
	      <ul>
	        <li>
	          <Link to="/registration">Registration</Link>
	        </li>
	        <li>
	          <Link to="/login">Login</Link>
	        </li>
	         <li>
	          <Link to="/books">Books</Link>
	        </li>
	        <li>
	          <Link to="/employee">Employee</Link>
	        </li>
	      </ul>

	      <hr />
	      <Route path="/registration" component={Form} />
	      <Route path="/login" component={Login} />
	      <Route path="/books" component={books} />
	      <Route path="/employee" component={employee} />
	    </div>
	  </Router>
    );
  }
}

export default App;
