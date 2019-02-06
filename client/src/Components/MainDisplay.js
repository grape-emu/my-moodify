import React, { Component } from 'react';
import { Navbar, SelectionDisplay } from './index';
import Button from '@material-ui/core/Button';

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
				{!this.state.option && (
					<div>
						<p>Help us understand your mood!</p>
						<Button type="button" onClick={this.handleUpload}>
							Upload an image
						</Button>
						<Button type="button" onClick={this.handleCapture}>
							Take a selfie
						</Button>
					</div>
				)}

				{this.state.option && (
					<div>
						<header className="App-header">
							<Navbar className="App-header" />
						</header>
						<SelectionDisplay option={this.state.option} />
						<Button type="button" onClick={this.handleReset}>
							Start Over?
						</Button>
					</div>
				)}
			</div>
		);
	}
}
