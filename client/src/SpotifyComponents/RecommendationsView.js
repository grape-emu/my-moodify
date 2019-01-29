import React from 'react';
import RecomendationsComponent from './RecomendationsComponent';

const RecommendationsView = props => {
	return (
		<div>
			{
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
					<RecomendationsComponent id={props.id} />
				</div>
			}
		</div>
	);
};

export default RecommendationsView;
