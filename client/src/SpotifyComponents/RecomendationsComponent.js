import React from 'react';

const RecomendationsComponent = props => {
	return (
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
	);
};

export default RecomendationsComponent;
