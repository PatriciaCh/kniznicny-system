import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddBook from './AddBook';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Book extends Component {
constructor(props) {
		super(props);
		this.state = {
			books: null
		}
	}

	deleteBook=(bk)=>{
		axios({
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/delete_book',
				data: {id: bk.id,
					   title: bk.title,
					   author: bk.author,
					   year: bk.year,
					   count: bk.count
				}
			}).then((data) => {
				this.viewBooks();
			});
	}

	viewBooks=()=>{
		axios({
				method: 'GET',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/get_all_books',
			}).then((data) => {
				let mapa = data.data.map((bk)=>
						(<tr>
							<td>{bk.title}</td>
							<td>{bk.author}</td>
							<td>{bk.year}</td>
							<td>{bk.genre}</td>
							<td>{bk.count}</td>
							<td><span className="delete" onClick={()=>{this.deleteBook(bk)}}>&times;</span></td>
						</tr>
						)
				);
				this.setState({books: mapa});
			});
	}
	
	componentDidMount() {
		this.viewBooks();
	}

	render() {
		let form = sessionStorage.getItem('type') == "3" ? (null) : (<div><AddBook viewBooks={this.viewBooks} /><hr/></div>) ;
		return (
		<div>
			{form}
		<h1>BOOKS</h1>
			<table>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Year</th>
					<th>Genre</th>
					<th>Count</th>
					<th></th>
				</tr>
				{this.state.books}
			</table>
		</div>);
  }
}

export default Book;