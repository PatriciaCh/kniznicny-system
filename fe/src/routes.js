import Form from './Form.js';
import Employee from './Employee.js';
import Login from './Login.js';
import Book from './Book.js';
import Reader from './Reader.js';
import Admin from './Admin.js';
import Auth from './Auth.js';
import Reservation from './Reservation.js';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import React,{Component} from 'react';


const defaultNav = function(children) {
	return (
		<div>
			<ul>
	        	<li>
		          <Link to="/login">Login</Link>
		        </li>
		    </ul>
		    <hr/>
		    {children}
		</div>
	);
}

const navSwitch = function(children) {
	console.log(sessionStorage.getItem('type'));
	switch(sessionStorage.getItem('type')) {
		case "1":
			return adminNav(children);
		case "2":
			return employeeNav(children);
		case "3":
			return readerNav(children);
		default:
			console.log("som v defaulte");
			return defaultNav(children);
	}
}

const adminNav = function(children) {
	console.log(sessionStorage.getItem('type'), "fjdfhjdshfjkdhjfksdhjkf");
	return (
		<div>
			<ul>
				<li>
		          <Link to="/login">Login</Link>
		        </li>
				<li>
		          <Link to="/admin">Employees</Link>
		        </li>
	        	<li>
		          <Link to="/reader">Readers</Link>
		        </li>
		        <li>
		          <Link to="/books">Books</Link>
		        </li>
		    </ul>
		    <hr/>
		    {children}
		</div>
	);
}

const employeeNav = function(children) {
	return (
		<div>
			<ul>
				<li>
		          <Link to="/login">Login</Link>
		        </li>
	        	<li>
		          <Link to="/reader">Readers</Link>
		        </li>
		        <li>
		          <Link to="/books">Books</Link>
		        </li>
		        <li>
		          <Link to="/reservations">Reservations</Link>
		        </li>
		    </ul>
		    <hr/>
		    {children}
		</div>
	);
}

const readerNav = function(children) {
	return (
		<div>
			<ul>
				<li>
		          <Link to="/login">Login</Link>
		        </li>
		        <li>
		          <Link to="/books">Books</Link>
		        </li>
		    </ul>
		    <hr/>
		    {children}
		</div>
	);
}


const registration = function() {
	return (<Auth><Form/></Auth>);
}



export default (
	<Router>
	  <Switch>
	  	  <Route exact path="/" render={()=>{ return defaultNav(<Auth><Book/></Auth>) }} />
	      <Route path="/registration" component={registration} />
	      <Route path="/login" render={()=>{ return navSwitch(<Login/>) }} />
	      <Route path="/books" render={()=>{ return navSwitch(<Auth><Book/></Auth>) }} />

	      <Route path="/employee" render={()=>{ return navSwitch(<Auth><Reader/></Auth>) }} />
	      <Route path="/admin" render={()=>{ return navSwitch(<Auth><Admin/></Auth>) }} />
	      <Route path="/reader" render={()=>{ return navSwitch(<Auth><Reader/></Auth>) }} />
	      <Route path="/reservations" render={()=>{ return navSwitch(<Auth><Reservation/></Auth>) }} />
	   </Switch>
	</Router>
);