import React, { Component } from 'react';

export default class ReccomendationsView extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div>
				{
					<iframe
						src="https://open.spotify.com/embed/track/72po8JKu6e1hLtQ7kGJPg3"
						width="300"
						height="380"
						frameBorder="0"
						// allowtransparency="true"
						allow="encrypted-media"
					/>
				}
			</div>
		);
	}
}
