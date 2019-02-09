import React from 'react';
import { TrackComponent } from '../index';

const TrackContainer = props => {
	return (
		<div style={{ width: '80%', margin: 'auto' }}>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap'
					}}
				>
					{props.tracks.map(track => {
						return <TrackComponent id={track.id} key={track.id} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default TrackContainer;
