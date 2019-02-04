import React, { Component, createElement } from 'react';
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

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log('imageSrc', imageSrc);
  };

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
      }); // Passing query to Spotify to generate playlist:
      const token = getHashParams();

      const { data } = await axios.get(
        `/api/spotify/find?token=${token.access_token}${
          query.data.spotifyQuery
        }`
      );
      this.setState({
        tracks: data.tracks,
        feedback: query.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <div>
        <div className="container">
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
              <img src="" alt="" ref={this.refImage} />
            </div>
            <Button variant="contained" type="submit">
              Moodify
            </Button>
          </form>
        </div>

        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </div>

        {this.state.tracks && this.state.tracks.length > 0 && (
          <div>
            <p>Joy Likelihood: {this.state.feedback.joyLikelihood}</p>
            <p> Anger Likelihood: {this.state.feedback.angerLikelihood}</p>
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
