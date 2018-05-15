import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes.js';


class App extends Component {
  render() {
    return (
    	<div>
    		<h1 id="title">ONLINE LIBRARY SYSTEM</h1>
    		{routes}
    	</div>
    );
  }
}

export default App;
