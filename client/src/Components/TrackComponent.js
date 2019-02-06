import React from 'react';

const TrackComponent = props => {
	return (
		<div>
			<iframe
				id="iFrame"
				title={props.id}
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

export default TrackComponent;
