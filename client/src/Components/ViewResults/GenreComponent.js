import React from 'react';
import explainPlaylistData from './PlaylistDataAnalysis'

const GenreComponent = ({genres, spotifyQuery}) => (
	<p>
		{explainPlaylistData(spotifyQuery)}, from the genres {genres[0].id}, {genres[1].id}, {genres[2].id}, {genres[3].id}, and {genres[4].id}.
	</p>
);

export default GenreComponent;
