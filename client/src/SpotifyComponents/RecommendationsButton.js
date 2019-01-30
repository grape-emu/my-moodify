import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';

export default class RecommendationsButton extends Component {
	constructor() {
		super();
		this.state = {
			tracks: [],
			playlist: []
		};
		this.fetchRequests = this.fetchRequests.bind(this);
		this.makePlaylist = this.makePlaylist.bind(this);
	}
	fetchRequests = async () => {
		try {
			const token = getHashParams();
			const { data } = await axios.get(
				`/api/spotify/find?token=${token.access_token}`
			);
			this.setState({
				tracks: data.tracks
			});
		} catch (err) {
			console.error(err);
		}
	};

	makeAndFetchPlaylist() {
		this.fetchRequests();
		if (this.state.tracks) console.log(this.state.tracks);
	}

	render() {
		return (
			<div>
				<button type="button" onClick={this.fetchRequests}>
					Get Recommendations
				</button>
				{this.state.tracks.length > 0 && (
					<div>
						<button type="button" onClick={this.makeAndFetchPlaylist}>
							Make Playlist
						</button>
						<RecommendationsView tracks={this.state.tracks} />
					</div>
				)}
			</div>
		);
	}
}
