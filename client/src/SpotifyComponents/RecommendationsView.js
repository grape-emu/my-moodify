import React from 'react';
import RecommendationsComponent from './RecommendationsComponent';

const RecommendationsView = props => {
	return (
		<div>
			{props.tracks.map(track => {
				return <RecommendationsComponent id={track.id} key={track.id} />;
			})}
		</div>
	);
};

export default RecommendationsView;
