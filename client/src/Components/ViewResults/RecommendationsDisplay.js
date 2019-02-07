import React from 'react';
import { TrackContainer, GenreComponent } from '../index';
import Button from '@material-ui/core/Button';

const RecommendationsDisplay = props => {
	console.log('logging props');
	console.log(props);
	return (
		<div>
			<GenreComponent
				genres={props.genres}
				spotifyQuery={props.feedback.spotifyQuery}
			/>

			<TrackContainer tracks={props.tracks} />

			<Button type="button" onClick={props.onClick}>
				Save Playlist
			</Button>
		</div>
	);
};

export default RecommendationsDisplay;
