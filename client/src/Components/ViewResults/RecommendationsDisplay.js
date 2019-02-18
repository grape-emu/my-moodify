import React from 'react';
import { TrackContainer, GenreComponent } from '../index';
import Button from '@material-ui/core/Button';

const RecommendationsDisplay = props => (
  <div>
    <GenreComponent
      feedback={props.feedback}
      genres={props.genres}
      spotifyQuery={props.feedback.spotifyQuery}
    />

    <TrackContainer tracks={props.tracks} />

    <Button type="button" onClick={props.onClick}>
      Save Playlist
    </Button>
  </div>
);

export default RecommendationsDisplay;
