import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Logout extends Component {
	constructor() {
		super();
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(e) {
		e.preventDefault();
		window.open('https://accounts.spotify.com/logout');
		window.location.replace('/');
	}

	render() {
		return (
			<Button
				variant="text"
				color="inherit"
				type="button"
				onClick={this.handleLogout}
			>
				Disconnect Spotify
			</Button>
		);
	}
}

export default Logout;
