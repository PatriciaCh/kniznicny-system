import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: null
		}
	}

	deleteEmployee=(id)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/delete_employee',
				data: {id: id}
			}).then((data) => {
				this.viewEmployees();
			});
	}

	viewEmployees=()=>{
		axios({
				method: 'GET',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/get_all_employees',
			}).then((data) => {
				let mapa = data.data.map((emp)=>
						(<tr>
							<td>{emp.firstname}</td>
							<td>{emp.lastname}</td>
							<td>{emp.login}</td>
							<td>{emp.password}</td>
							<td><span className="delete" onClick={()=>{this.deleteEmployee(emp.id)}}>&times;</span></td>
						</tr>
						)
				);
				this.setState({employees: mapa});
			});
	}
	
	componentDidMount() {
		this.viewEmployees();
	}

	render() {
		return (
		<div>
		<AddEmployee viewEmployees={this.viewEmployees} />
		<hr/>
		<h1>EMPLOYEES</h1>
			<table>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Login</th>
					<th>Password</th>
					<th></th>
				</tr>
				{this.state.employees}
			</table>
		
		</div>);
  }
}

export default Admin;