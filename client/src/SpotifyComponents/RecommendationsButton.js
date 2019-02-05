import React, { Component, createElement } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getHashParams } from './spotify-functions';
import RecommendationsView from './RecommendationsView';
import ImageLoad from 'image-preview-react';
import Webcam from 'react-webcam';
import Message from './Message';

export default class RecommendationsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      feedback: {},
      file: null,
      imageSrc: '',
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
        this.setState({
          tracks: data.tracks,
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
    const response = await axios.post(
      `/api/playlist/add?token=${token.access_token}&uris=${uris.join(
        ','
      )}&playlistId=${data}`
    );
    // console.log(response);
  };

  mapTracks = () => {
    return this.state.tracks.map(track => `spotify:track:${track.id}`);
  };

  capture = async event => {
    try {
      event.preventDefault();
      const imageSrc = this.webcam.getScreenshot();
      const query = await axios.post('/api/s3/capture', { url: imageSrc });
      // Passing query to Spotify to generate playlist:
      const token = getHashParams();

      const { data } = await axios.get(
        `/api/spotify/find?token=${token.access_token}${
          query.data.spotifyQuery
        }`
      );
      this.setState({
        tracks: data.tracks,
        feedback: query.data,
        imageSrc,
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
    const { joyLikelihood, sorrowLikelihood, angerLikelihood } =
      this.state.feedback || '';
    console.log('this.state.feedback', this.state.feedback);

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

        {this.state.feedback.hasOwnProperty('spotifyQuery') &&
          this.state.feedback.spotifyQuery === false && (
            <p>
              {
                "We're sorry, Google can't determine the emotions in this image. Please try a different selfie."
              }
            </p>
          )}
        {joyLikelihood && (
          <Message
            joyLikelihood={joyLikelihood}
            sorrowLikelihood={sorrowLikelihood}
            angerLikelihood={angerLikelihood}
          />
        )}
        {this.state.tracks && this.state.tracks.length > 0 && (
          <div>
            <h3>Here is the playlist that matches your mood:</h3>
            <RecommendationsView tracks={this.state.tracks} />
            <Button
              variant="contained"
              type="button"
              onClick={this.savePlaylist}
            >
              Save Playlist
            </Button>
          </div>
        )}
      </div>
    );
  }
}
