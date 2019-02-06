import React from 'react';
import Button from '@material-ui/core/Button';

const MoodifyUpload = props => {
	return (
		<div id="container">
			<form onSubmit={props.submit}>
				<div>
					<input
						label="upload file"
						type="file"
						accept="image/*"
						name=""
						id=""
						ref={props.refButton}
						onChange={props.onChange}
					/>
				</div>
				<div>
					<img src={props.imageSrc} alt="" ref={props.refImage} />
				</div>
				<Button variant="contained" type="submit">
					Moodify
				</Button>
			</form>
		</div>
	);
};

export default MoodifyUpload;
