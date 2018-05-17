import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueTitle: "",
			valueAuthor: "",
			valueYear: "",
			valueGenre: "",
			warningMessage: "",
			redirect: false,
			redirectPlace: "/"
		}
	}

	validate=()=>{
		const regexAlpha = /^[a-zA-Z]{3,15}$/i;
		const regexNumeric = /^[0-9\b]+$/;
		if (this.state.valueTitle.length == 0) {
			this.setState({
				warningMessage: "Title cannot be empty!"
			})
			return false;
		}
		if (this.state.valueAuthor.length == 0) {
			this.setState({
				warningMessage: "Author cannot be empty!"
			})
			return false;
		}
		if(!regexNumeric.test(this.state.valueYear)) {
			this.setState({
				warningMessage: "Year must be a number!"
			})
			return false;
		}
		if (this.state.valueYear > 2018 || this.state.valueYear < 1800) {
			this.setState({
				warningMessage: "Incorrect year!"
			})
			return false;
		}
		if (this.state.valueGenre.length == 0) {
			this.setState({
				warningMessage: "Genre cannot be empty!"
			})
			return false;
		}
		return true;
	}


	handleSubmit=(e)=>{
		e.preventDefault();
		let that = this;
		if (this.validate()){
			axios({
				header: {
					'Access-Control-Allow-Origin': '*'
				},
				method: 'POST',
				url: 'http:/' + '/127.0.0.1/kniznicny-system/be/User/add_book',
				data: {
					title: that.state.valueTitle,
					author: that.state.valueAuthor,
					year: that.state.valueYear,
					genre: that.state.valueGenre
				}
			}).then((data) => {
					this.props.viewBooks();
					this.state.valueTitle = "";
					this.state.valueAuthor = "";
					this.state.valueYear = "";
					this.setState({valueGenre: ""})
				});
		}
	}

	handleChange=(e)=>{
		let input =`value${e.target.name}`;
		this.setState({[input]: e.target.value});
	}

	render() {
	return (
	<div>
		<form onSubmit={this.handleSubmit}>
			<h1>ADD BOOK</h1>
			<label>
				Title:<br/>
		    	<input type="text" name="Title" value={this.state.valueTitle} onChange={this.handleChange} /><br/>
			</label>
			<label>
				Author:<br/>
		    	<input type="text" name="Author" value={this.state.valueAuthor} onChange={this.handleChange} /><br/>
			</label>
			<label>
				Year:<br/>
		    	<input type="text" name="Year" value={this.state.valueYear} onChange={this.handleChange} /><br/>
			</label>
			<label>
		    	Genre:<br/>
		    	<input type="text" name="Genre" value={this.state.valueGenre} onChange={this.handleChange} /><br/>
		 	</label>
		 	<span id="warning">{this.state.warningMessage}</span><br/>
			<input type="submit" value="Submit" />
		</form>
	</div>
	);
  }
}

export default AddBook;