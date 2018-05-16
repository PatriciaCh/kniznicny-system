import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddBook from './AddBook';
import SearchBook from './SearchBook';
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
				let times=(bk)=>{
					if (sessionStorage.getItem('type') == "3") {
						return (null);
					} 
					return (<span className="delete" onClick={()=>{this.deleteBook(bk)}}>&times;</span>);
				}
				let checkbox = sessionStorage.getItem('type') == "3" ? (<td><input type="submit" value="Reserve"/></td>) : (null);
				let mapa = data.data.map((bk)=>
						(	<tr>
								{checkbox}
								<td>{bk.title}</td>
								<td>{bk.author}</td>
								<td>{bk.year}</td>
								<td>{bk.genre}</td>
								<td>{bk.count}</td>
								<td>{times(bk)}</td>
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
		let form = sessionStorage.getItem('type') == "3" ? (<div><SearchBook/></div>) : (<div><AddBook viewBooks={this.viewBooks} /></div>) ;
		let search = sessionStorage.getItem('type') == "3" ? (null) :
															(<div>
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

		return (
		<div>
			{form}
			{search}
		</div>);
  }
}

export default Book;