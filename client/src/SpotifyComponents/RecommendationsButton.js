import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';

export default class RecommendationsButton extends Component {
	constructor() {
		super();
		this.state = {
			tracks: [],
			feedback: {},
			file: null
		};
		this.submitFile = this.submitFile.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.mapTracks = this.mapTracks.bind(this);
	}

	savePlaylist = async () => {
		const token = getHashParams();
		const { data } = await axios.post(
			`/api/playlist?token=${token.access_token}`
		);
		let uris = this.mapTracks();
		const response = await axios.post(
			`/api/playlist/add?token=${token.access_token}&uris=${uris.join(
				','
			)}&playlistId=${data}`
		);
		console.log(response);
	};

	mapTracks = () => {
		return this.state.tracks.map(track => `spotify:track:${track.id}`);
	};

	submitFile = async event => {
		try {
			event.preventDefault();
			const formData = new FormData();
			formData.append('file', this.state.file[0]);
			// Query.data holds information about the query we pass to Spotify
			const query = await axios.post('/api/s3/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			this.setState({
				feedback: query.data
			});

			/* The URL will always begin in an '&' for a successfully read photo.
			If Google doesn't render useful emotion data, our function returns false.*/
			if (query.data.spotifyQuery) {
				// Passing query to Spotify to generate playlist:
			const token = getHashParams();

			const { data } = await axios.get(
				`/api/spotify/find?token=${token.access_token}${
					query.data.spotifyQuery
				}`
			)
			this.setState({
				tracks: data.tracks,
			})
		}
		} catch(err) {
			console.error(err)
	}
	}

	handleFileUpload = event => {
		this.setState({ file: event.target.files });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.submitFile}>
					<input
						label="upload file"
						type="file"
						onChange={this.handleFileUpload}
					/>
					<Button variant="contained" type="submit">
						Moodify
					</Button>
				</form>

				{this.state.feedback.hasOwnProperty('spotifyQuery') && this.state.feedback.spotifyQuery === false && (<p>{"We're sorry, Google can't determine the emotions in this image. Please try a different selfie."}</p>)}

				{this.state.tracks && this.state.tracks.length > 0 && (
					<div>
						<p>Joy Likelihood: {this.state.feedback.joyLikelihood}</p>
						<p>Anger Likelihood: {this.state.feedback.angerLikelihood}</p>
						<p>Sorrow Likelihood: {this.state.feedback.sorrowLikelihood}</p>
						<p>Surprise Likelihood: {this.state.feedback.surpriseLikelihood}</p>
						<Button type="button" onClick={this.savePlaylist}>
							Save Playlist
						</Button>
						<RecommendationsView tracks={this.state.tracks} />
					</div>
				)}
			</div>
		);
	}
}
