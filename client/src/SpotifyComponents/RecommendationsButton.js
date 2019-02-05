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
      file: null,
      seedGenres: [],
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
          'Content-Type': 'multipart/form-data',
        },
      });

      this.setState({
        feedback: query.data,
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
        console.log(data);
        this.setState({
          tracks: data.tracks,
          seedGenres: data.seeds,
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
    // console.log(genres);
    return (
      <div id="container">
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
        <div id="not-form">
          <div id="error-handling">
            {this.state.feedback.hasOwnProperty('spotifyQuery') &&
              this.state.feedback.spotifyQuery === false && (
                <p>{"We're sorry, Google can't determine the emotions in this image. Please try a different selfie."}</p>
              )}
          </div>
          {this.state.tracks && this.state.tracks.length > 0 && (
            <div id="valid-photo-container">
              <div id="emotion-data">
                <p>Joy Likelihood: {this.state.feedback.joyLikelihood}</p>
                <p>Anger Likelihood: {this.state.feedback.angerLikelihood}</p>
                <p>Sorrow Likelihood: {this.state.feedback.sorrowLikelihood}</p>
                <p>Surprise Likelihood: {this.state.feedback.surpriseLikelihood}</p>
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
              <div id="save-button">
                <Button type="button" onClick={this.savePlaylist}>
                  Save Playlist
                </Button>
              </div>
              <div id="playlist">
                <RecommendationsView tracks={this.state.tracks} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
