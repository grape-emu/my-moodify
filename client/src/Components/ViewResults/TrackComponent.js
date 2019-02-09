import React from 'react';

const TrackComponent = props => {
	return (
		<div style={{ margin: '10px' }}>
			<iframe
				id="iFrame"
				title={props.id}
				sandbox="allow-scripts allow-same-origin"
				src={`https://open.spotify.com/embed/track/${props.id}&theme=white`}
				width="300"
				height="380"
				frameBorder="0"
				allow="encrypted-media"
			/>
		</div>
	);
};

export default TrackComponent;
