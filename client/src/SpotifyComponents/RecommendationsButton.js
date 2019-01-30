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
        tracks: data.tracks,
      });
    } catch (err) {
      console.error(err);
    }
  };

  submitFile = event => {
    console.log('submitFile working...');
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios
      .post('/api/s3/test-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(result => console.log('result.data,', result.data))
      .catch(error => {
        console.log('error');
      });
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
