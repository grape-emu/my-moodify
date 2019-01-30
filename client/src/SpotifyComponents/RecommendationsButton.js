import React, { Component } from 'react';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';

const convertedFromFunction = '?seed_genres=blues&max_valence=0.5';

export default class RecommendationsButton extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      file: null,
    };
  }

  submitFile = async event => {
    try {
      console.log('submitFile working...');
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', this.state.file[0]);
      const query = await axios.post('/api/s3/test-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('query.data,', query.data);

      // Passing query to Spotify to generate playlist:
      const token = getHashParams();
      const { data } = await axios.get(
        `/api/spotify/find?token=${
          token.access_token
        }&recommendations=${convertedFromFunction}`
      );
      this.setState({
        tracks: data.tracks,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleFileUpload = event => {
    console.log('updating');
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
          <button type="submit">Send</button>
        </form>

        {this.state.tracks.length === 0 ? (
          <div />
        ) : (
          <RecommendationsView tracks={this.state.tracks} />
        )}
      </div>
    );
  }
}
