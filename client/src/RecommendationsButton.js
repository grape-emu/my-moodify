import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';

// function converting from google to spotify will have to convert to string before output: key=value.join('&')
// will be importing output of function here (likewise ../../server/api/spotify)
// currently using dummy hard-coding query string for a sad song
const convertedFromFunction = 'seed_genres=blues&max_valence=0.5';

export default class RecommendationsButton extends Component {
	constructor() {
		super();
		this.state = {
			receivedRequest: false,
			url: ''
		};
		this.handleRecommendations = this.handleRecommendations.bind(this);
	}
	handleRecommendations = async () => {
		try {
			const token = getHashParams();
			// console.log returns the url to the Spotify Play link to be used in future
			console.log(
				`localhost:8080/api/spotify/find?token=${
					token.access_token
				}&recommendations?${convertedFromFunction}`
			);

			//make request to backend to fetch querry from Spotify API
			//using relative path because of proxy setup for create-react-app
			const { data } = await axios.get(
				`/api/spotify/find?token=${
					token.access_token
				}&recomendations?${convertedFromFunction}`
			);

			//update local state with URL
			this.setState({
				receivedRequest: true,
				url: data.tracks[0].external_urls.spotify
			});
		} catch (err) {
			console.error(err);
		}
	};
	render() {
		return (
			<div>
				<button type="button" onClick={this.handleRecommendations}>
					Get Recommendations
				</button>
				{this.state.receivedRequest ? (
					<RecommendationsView url={this.state.url} />
				) : (
					<div />
				)}
			</div>
		);
	}
}
