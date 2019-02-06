import React from 'react';

const EmotionsComponent = props => (
	<div>
		<p>Joy Likelihood: {props.feedback.joyLikelihood}</p>
		<p>Anger Likelihood: {props.feedback.angerLikelihood}</p>
		<p>Sorrow Likelihood: {props.feedback.sorrowLikelihood}</p>
		<p>Surprise Likelihood: {props.feedback.surpriseLikelihood}</p>
	</div>
);

export default EmotionsComponent;
