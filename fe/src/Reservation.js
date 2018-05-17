import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserHandler from './UserHandler.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Reservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: null
		}
	}

	deleteReservation=(rs)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/delete_reservation',
				data: {id: rs.id
				}
			}).then((data) => {
				this.viewReservations();
			});
	}

	approveReservation=(rs)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/approve_reservation',
				data: {id: rs.id
				}
			}).then((data) => {
				this.viewReservations();
			});
	}

	viewReservations=()=>{
		axios({
				method: 'GET',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/get_all_reservations',
			}).then((data) => {			
				console.log(data.data);
				let mapa = data.data.map((rs)=>{
					let approved= rs.approved == 0 ? (<button onClick={()=>{this.approveReservation(rs)}}>Approved</button>) : (<span className="delete" onClick={()=>{this.deleteReservation(rs)}}>&times;</span>);
					return (<tr>
								<td>{rs.firstname} {rs.lastname}</td>
								<td>{rs.title}, {rs.author}</td>
								<td>{rs.date_of_booking}</td>
								<td>{approved}</td>
							</tr>
					)}
			);
				this.setState({reservations: mapa});
			});
	}

	componentDidMount() {
		this.viewReservations();
	}

	render() {
		return (
			<div>
				<h1>RESERVATIONS</h1>
				<table>
					<tr>
						<th>Reader</th>
						<th>Book</th>
						<th>Date</th>
						<th></th>
					</tr>
					{this.state.reservations}
				</table>
			</div>
			);
  }
}

export default Reservation;