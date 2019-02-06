import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#6200ea' }, // deepPurple[a700]
		secondary: { main: '#3f51b5' }, // indigo[500]
		accent: { main: '#2196f3' } // blue[500]
	},
	typography: { useNextVariants: true }
});

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
