import React from 'react';
import { EmotionsComponent, TrackContainer, GenreComponent } from '../index';
import Button from '@material-ui/core/Button';

class RecommendationsDisplay extends React.Component {
  render(props) {
    const { joyLikelihood } = this.props.feedback || '';
    return (
      <div>
        {joyLikelihood && <EmotionsComponent feedback={this.props.feedback} />}

        <GenreComponent
          genres={this.props.genres}
          spotifyQuery={this.props.feedback.spotifyQuery}
        />

        <TrackContainer tracks={this.props.tracks} />

        <Button type="button" onClick={this.props.onClick}>
          Save Playlist
        </Button>
      </div>
    );
  }
}

export default RecommendationsDisplay;
