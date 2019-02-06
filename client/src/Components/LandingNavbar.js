import React from 'react';
import Typography from '@material-ui/core/Typography';
import Typing from 'react-typing-animation';

const LandingNavbar = () => (
	<nav>
		<Typography variant="h1" gutterBottom color="inherit">
			<Typing speed={250}>moodify</Typing>
		</Typography>
	</nav>
);

export default LandingNavbar;
