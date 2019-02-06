import React from 'react';

const GenreComponent = props => (
	<p>
		This playlist draws from the Spotify genres {props.genres[0].id},{' '}
		{props.genres[1].id}, {props.genres[2].id}, {props.genres[3].id}, and{' '}
		{props.genres[4].id}.
	</p>
);

export default GenreComponent;
