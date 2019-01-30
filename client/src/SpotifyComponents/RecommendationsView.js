import React from 'react';
import RecommendationsComponent from './RecommendationsComponent';

const RecommendationsView = props => {
	return (
		<div>
			{props.tracks.map(track => {
				return <RecommendationsComponent track={track.id} />;
			})}
		</div>
	);
};

export default RecommendationsView;
