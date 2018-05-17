import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isClick: false,
		}
	}

	clicked() {
		this.setState({isClick: true});
	}

	render() {
		if (this.state.isClick) {
			return (<button disabled={true} className="disabled">Reserve</button>)
		} else {
			return (<button disabled={false} onClick={()=>{this.clicked();this.props.addReservation(this.props.bk)}}>Reserve</button>)
		}
	}
}

class SearchBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueTitle: "",
			valueAuthor: "",
			valueYear: "",
			valueGenre: "",
			warningMessage: "",
			redirect: false,
			redirectPlace: "/",
			books: null
		}
	}

	addReservation=(bk)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/add_reservation',
				data: {reader_id: sessionStorage.getItem('user_id'),
					   book_id: bk.id,
					   approved: false
				}
			});
	}

	searchBooks=(e)=>{
		e.preventDefault();
		axios({
			header: {
				'Access-Control-Allow-Origin': '*'
			},
			method: 'POST',
			url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/search_books',
			data: {
				title: this.state.valueTitle,
				author: this.state.valueAuthor,
				year: this.state.valueYear,
				genre: this.state.valueGenre
			}
		}).then((data) => {
				
				let mapa = data.data.map((bk)=>
						(	<tr>
								<td><Button addReservation={this.addReservation} bk={bk}/></td>
								<td>{bk.title}</td>
								<td>{bk.author}</td>
								<td>{bk.year}</td>
								<td>{bk.genre}</td>
								<td>{bk.count}</td>
							</tr>
						)
				);
				this.setState({books: mapa});
			}); 
	}

	handleChange=(e)=>{
		let input =`value${e.target.name}`;
		this.state[input]=e.target.value;
	}

	render() {
	return (
	<div>
		<form onSubmit={this.searchBooks}>
			<h1>SEARCH BOOK</h1>
			<label>
				Title:<br/>
		    	<input type="text" name="Title" onChange={this.handleChange} /><br/>
			</label>
			<label>
				Author:<br/>
		    	<input type="text" name="Author" onChange={this.handleChange} /><br/>
			</label>
			<label>
				Year:<br/>
		    	<input type="text" name="Year" onChange={this.handleChange} /><br/>
			</label>
			<label>
		    	Genre:<br/>
		    	<input type="text" name="Genre" onChange={this.handleChange} /><br/>
		 	</label>
		 	<span id="warning">{this.state.warningMessage}</span><br/>
			<input type="submit" value="Search" />
		</form>

		<hr/>
		<h1>FOUND BOOKS</h1>

		<table>
			<tr>
				<th>Reserve</th>
				<th>Title</th>
				<th>Author</th>
				<th>Year</th>
				<th>Genre</th>
				<th>Count</th>
				<th></th>
			</tr>
			{this.state.books}
		</table>

	</div>
	);
  }
}

export default SearchBook;