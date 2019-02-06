import React from 'react';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';

const MoodifyCapture = props => {
	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: 'user'
	};
	return (
		<form onSubmit={props.submit}>
			<div>
				<Webcam
					audio={false}
					height={350}
					ref={props.setRef}
					screenshotFormat="image/jpeg"
					width={350}
					videoConstraints={videoConstraints}
				/>
				<Button variant="contained" type="submit">
					Moodify
				</Button>
			</div>
		</form>
	);
};

export default MoodifyCapture;
