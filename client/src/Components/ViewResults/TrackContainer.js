import React from 'react';
import { TrackComponent } from '../index';

const TrackContainer = props => {
	return (
		<div>
			{props.tracks.map(track => {
				return <TrackComponent id={track.id} key={track.id} />;
			})}
		</div>
	);
};

export default TrackContainer;
