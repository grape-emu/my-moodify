import React from 'react';

const RecommendationsComponent = props => {
	console.log(props);
	return (
		<iframe
			id="iFrame"
			title="myTitle"
			sandbox="allow-scripts allow-same-origin"
			src={`https://open.spotify.com/embed/track/${props.track}`}
			width="300"
			height="80"
			frameBorder="0"
			allow="encrypted-media"
		/>
	);
};

export default RecommendationsComponent;
