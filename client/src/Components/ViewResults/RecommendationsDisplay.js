import React from 'react';
import { EmotionsComponent, TrackContainer, GenreComponent } from '../index';
import Button from '@material-ui/core/Button';

const RecommendationsDisplay = props => (
	<div id="Recommendations">
		<EmotionsComponent feedback={props.feedback} />

		<GenreComponent genres={props.genres} />

		<TrackContainer tracks={props.tracks} />

		<Button type="button" onClick={props.onClick}>
			Save Playlist
		</Button>
	</div>
);

export default RecommendationsDisplay;
