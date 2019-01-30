import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';

const convertedFromFunction = '?seed_genres=blues&max_valence=0.5';

export default class RecommendationsButton extends Component {
	constructor() {
		super();
		this.state = {
			tracks: []
		};
		this.handleRecommendations = this.handleRecommendations.bind(this);
	}
	handleRecommendations = async () => {
		try {
			const token = getHashParams();

			//make request to backend to fetch querry from Spotify API
			//using relative path because of proxy setup for create-react-app
			const { data } = await axios.get(
				`/api/spotify/find?token=${
					token.access_token
				}&recommendations=${convertedFromFunction}`
			);
			//update local state with URL
			this.setState({
				tracks: data.tracks
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
				{this.state.tracks.length === 0 ? (
					<div />
				) : (
					<RecommendationsView tracks={this.state.tracks} />
				)}
			</div>
		);
	}
}
