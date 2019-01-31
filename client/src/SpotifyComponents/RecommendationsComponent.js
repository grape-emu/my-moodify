import React from 'react';

const RecommendationsComponent = props => {
	return (
		<div>
			<iframe
				id="iFrame"
				title="myTitle"
				sandbox="allow-scripts allow-same-origin"
				src={`https://open.spotify.com/embed/track/${props.id}`}
				width="300"
				height="80"
				frameBorder="0"
				allow="encrypted-media"
			/>
		</div>
	);
};

export default RecommendationsComponent;
