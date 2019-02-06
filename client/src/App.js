import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LandingPage, MainDisplay } from './Components';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/callback" component={MainDisplay} />
				</div>
			</Router>
		);
	}
}

export default App;
