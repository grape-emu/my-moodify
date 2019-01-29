import React from 'react';
import RecomendationsComponent from './RecomendationsComponent';

const RecommendationsView = props => {
	const { tracks } = props;
	return (
		<div>
			{
				<div>
					<div>
						<RecomendationsComponent id={tracks[0].id} />
					</div>
					<div>
						<RecomendationsComponent id={tracks[1].id} />
					</div>
					<div>
						<RecomendationsComponent id={tracks[2].id} />
					</div>
					<div>
						<RecomendationsComponent id={tracks[3].id} />
					</div>
				</div>
			}
		</div>
	);
};

export default RecommendationsView;
