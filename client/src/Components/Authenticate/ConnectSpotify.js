import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as SpotifyFunctions from './utils.js';
import { theme } from '../index';

class ConnectSpotify extends Component {
	render() {
		return (
			<div className="ConnectSpotify">
				<MuiThemeProvider theme={theme}>
					<a href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
						<Button variant="contained" type="button" color="primary">
							Connect to Spotify
						</Button>
					</a>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default ConnectSpotify;
