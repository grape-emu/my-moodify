import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import SpotifyDisplay from './SpotifyComponents/spotify-display';
import ImageForm from './ImageForm.js';

class App extends Component {
	state = {
		response: '',
		post: '',
		responseToPost: ''
	};

	// TODO: remove sample code
	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	handleSubmit = async e => {
		e.preventDefault();
		const response = await fetch('/api/world', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ post: this.state.post })
		});
		const body = await response.text();
		this.setState({ responseToPost: body });
	};

	// END TODO

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Navbar />
				</header>
				{/* TODO: Remove sample code */}
				<ImageForm />
				<p>{this.state.response}</p>
				<form onSubmit={this.handleSubmit}>
					<p>
						<strong>Post to Server:</strong>
					</p>
					<input
						type="text"
						value={this.state.post}
						onChange={e => this.setState({ post: e.target.value })}
					/>
					<button type="submit">Submit</button>
				</form>
				<p>{this.state.responseToPost}</p>
				{/* END TODO */}
				<SpotifyDisplay />
			</div>
		);
	}
}

export default App;
