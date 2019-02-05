import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';
import ImageLoad from 'image-preview-react';
import Webcam from 'react-webcam';

export default class RecommendationsButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: [],
			feedback: {},
			file: null,
			seedGenres: [],
			imageSrc: ''
		};
		this.submitFile = this.submitFile.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.mapTracks = this.mapTracks.bind(this);
		this.refButton = React.createRef();
		this.refImage = React.createRef();
	}

	componentDidMount() {
		ImageLoad({ button: this.refButton, image: this.refImage });
	}

	setRef = webcam => {
		this.webcam = webcam;
	};

	savePlaylist = async () => {
		const token = getHashParams();
		const { data } = await axios.post(
			`/api/playlist?token=${token.access_token}`
		);
		let uris = this.mapTracks();
		await axios.post(
			`/api/playlist/add?token=${token.access_token}&uris=${uris.join(
				','
			)}&playlistId=${data}`
		);
	};

	mapTracks = () => {
		return this.state.tracks.map(track => `spotify:track:${track.id}`);
	};

	submitFile = async event => {
		try {
			event.preventDefault();
			const formData = new FormData();
			formData.append('file', this.state.file[0]);
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
				);
				this.setState({
					tracks: data.tracks,
					seedGenres: data.seeds
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	savePlaylist = async () => {
		const token = getHashParams();
		const { data } = await axios.post(
			`/api/playlist?token=${token.access_token}`
		);
		let uris = this.mapTracks();
		await axios.post(
			`/api/playlist/add?token=${token.access_token}&uris=${uris.join(
				','
			)}&playlistId=${data}`
		);
	};

	mapTracks = () => {
		return this.state.tracks.map(track => `spotify:track:${track.id}`);
	};

	capture = async event => {
		try {
			event.preventDefault();
			const imageSrc = this.webcam.getScreenshot();
			const query = await axios.post('/api/s3/capture', { url: imageSrc });
			this.setState({
				feedback: query.data,
				imageSrc
			});
			// Passing query to Spotify to generate playlist:
			if (query.data.spotifyQuery) {
				console.log('hello');
				const token = getHashParams();
				const { data } = await axios.get(
					`/api/spotify/find?token=${token.access_token}${
						query.data.spotifyQuery
					}`
				);
				this.setState({
					tracks: data.tracks,
					seedGenres: data.seeds,
					feedback: query.data
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	handleFileUpload = event => {
		this.setState({ file: event.target.files });
	};

	render() {
		const genres = this.state.seedGenres;
		const videoConstraints = {
			width: 1280,
			height: 720,
			facingMode: 'user'
		};
		return (
			<div>
				<div id="container">
					<form onSubmit={this.submitFile}>
						<div>
							<input
								label="upload file"
								type="file"
								accept="image/*"
								name=""
								id=""
								ref={this.refButton}
								onChange={this.handleFileUpload}
							/>
						</div>
						<div>
							<img src={'' || this.state.imageSrc} alt="" ref={this.refImage} />
						</div>
						<Button variant="contained" type="submit">
							Moodify
						</Button>
					</form>
				</div>

				<form onSubmit={this.capture}>
					<div>
						<Webcam
							audio={false}
							height={350}
							ref={this.setRef}
							screenshotFormat="image/jpeg"
							width={350}
							videoConstraints={videoConstraints}
						/>
						<Button variant="contained" type="submit">
							Moodify
						</Button>
					</div>
				</form>

				<div id="not-form">
					<div id="error-handling">
						{this.state.feedback.hasOwnProperty('spotifyQuery') &&
							this.state.feedback.spotifyQuery === false && (
								<p>
									{
										"We're sorry, Google can't determine the emotions in this image. Please try a different selfie."
									}
								</p>
							)}
					</div>
					{this.state.tracks && this.state.tracks.length > 0 && (
						<div id="valid-photo-container">
							<div id="emotion-data">
								<p>Joy Likelihood: {this.state.feedback.joyLikelihood}</p>
								<p>Anger Likelihood: {this.state.feedback.angerLikelihood}</p>
								<p>Sorrow Likelihood: {this.state.feedback.sorrowLikelihood}</p>
								<p>
									Surprise Likelihood: {this.state.feedback.surpriseLikelihood}
								</p>
							</div>
							<div id="genre-data">
								{genres && (
									<p>
										This playlist draws from the Spotify genres {genres[0].id},{' '}
										{genres[1].id}, {genres[2].id}, {genres[3].id}, and{' '}
										{genres[4].id}.
									</p>
								)}
							</div>
							<div id="playlist">
								<RecommendationsView tracks={this.state.tracks} />
							</div>
							<div id="save-button">
								<Button type="button" onClick={this.savePlaylist}>
									Save Playlist
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
