import React, { Component } from 'react';
import { Navbar, SelectionDisplay, theme } from './index';
import Button from '@material-ui/core/Button';
import Logout from './Authenticate/Logout';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default class MainDisplay extends Component {
	constructor() {
		super();
		this.state = {
			option: false
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
				<Navbar />

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

							<br />
							<div id="dictionary-entry">
								<h3>mood·i·fy /ˈmuːdɪˌfaɪ/</h3>
								<p>
									<em>Verb.</em>
									<br />
									<strong>
										To transform an image of a face into a playlist matching
										that image's mood.
									</strong>
								</p>
								<p>
									<em>Noun.</em>
									<br />
									<strong>
										Web app that moodifies a selfie or uploaded photo.
										<br />
										Designed by Claire Gilligan, Guli Kholmatova, Kimberley
										Elcess, and Sher-Min Yang in 2019.
									</strong>
								</p>
							</div>
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
						</div>
					)}
					{this.state.option && (
						<div>
							<Logout />
						</div>
					)}
				</div>
			</div>
		);
	}
}
