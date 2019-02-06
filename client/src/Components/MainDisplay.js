import React, { Component } from 'react';
import { Navbar, SelectionDisplay } from './index';
import Button from '@material-ui/core/Button';
import Logout from './Authenticate/Logout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#6200ea' }, // deepPurple[a700]
		secondary: { main: '#3f51b5' }, // indigo[500]
		accent: { main: '#2196f3' } // blue[500]
	},
	typography: { useNextVariants: true }
});

export default class MainDisplay extends Component {
  constructor() {
    super();
    this.state = {
      option: false,
    };
    this.handleCapture = this.handleCapture.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleCapture() {
    this.setState({ option: 'capture' });
  }

  handleUpload() {
    this.setState({ option: 'upload' });
  }

  handleReset() {
    this.setState({ option: false });
  }

	render() {
		return (
			<div>
				<header className="App-header">
					<Navbar className="App-header" />
				</header>
				<div id="Content">
					{!this.state.option && (
						<div>
							<h2> Help us understand your mood!</h2>
							<MuiThemeProvider theme={theme}>
								<div>
									<Button
										type="button"
										variant="contained"
										color="primary"
										onClick={this.handleUpload}
									>
										Upload an image
									</Button>
								</div>
								<br />
								<div>
									<Button
										type="button"
										color="primary"
										variant="contained"
										onClick={this.handleCapture}
									>
										Take a selfie
									</Button>
								</div>
							</MuiThemeProvider>
						</div>
					)}

					{this.state.option && (
						<div>
            <SelectionDisplay option={this.state.option} />
							<MuiThemeProvider theme={theme}>
								<Button
									type="button"
									color="primary"
									onClick={this.handleReset}
									variant="contained"
								>
									Start Over?
								</Button>
							</MuiThemeProvider>
							<br />
							<SelectionDisplay option={this.state.option} />
						</div>
					)}
        {this.state.option && (
         <div>
          <Logout />
         </div>
        )}
			</div>
		);
	}
}
