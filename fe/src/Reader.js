import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Form from './Form';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Reader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			readers: null
		}
	}

	deleteReader=(id)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/delete_reader',
				data: {id: id}
			}).then((data) => {
				this.viewReaders();
			});
	}

	viewReaders=()=>{
		axios({
				method: 'GET',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/get_all_readers',
			}).then((data) => {
				let mapa = data.data.map((read)=>
						(<tr>
							<td>{read.firstname}</td>
							<td>{read.lastname}</td>
							<td>{read.address}</td>
							<td>{read.contact}</td>
							<td>{read.login}</td>
							<td>{read.password}</td>
							<td><span className="delete" onClick={()=>{this.deleteReader(read.id)}}>&times;</span></td>
						</tr>
						)
				);
				this.setState({readers: mapa});
			});
	}
	
	componentDidMount() {
		this.viewReaders();
	}
	

	render() {
		return (<div>
			<Form />
			<hr/>
			<h1>READERS</h1>
			<table>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Address</th>
					<th>Contact</th>
					<th>Login</th>
					<th>Password</th>
					<th></th>
				</tr>
				{this.state.readers}
			</table>
		</div>);
  	}
}

export default Reader;