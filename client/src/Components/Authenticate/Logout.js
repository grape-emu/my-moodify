import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#6200ea' }, // deepPurple[a700]
    secondary: { main: '#3f51b5' }, // indigo[500]
    accent: { main: '#2196f3' }, // blue[500]
  },
  typography: { useNextVariants: true },
});

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
      <div className="logout">
        <MuiThemeProvider theme={theme}>
        <br />
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={this.handleLogout}
          >
            Logout from Spotify
          </Button>
        <br />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Logout;
