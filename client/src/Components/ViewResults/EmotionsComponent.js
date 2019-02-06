import React from 'react';

const EmotionsComponent = props => {
	if (props.feedback)
		return (
			<div>
				<p>Joy Likelihood: {props.feedback.joyLikelihood}</p>
				<p>Anger Likelihood: {props.feedback.angerLikelihood}</p>
				<p>Sorrow Likelihood: {props.feedback.sorrowLikelihood}</p>
				<p>Surprise Likelihood: {props.feedback.surpriseLikelihood}</p>
			</div>
		);
	return null;
};

export default EmotionsComponent;
