import React from 'react';
import { ConnectSpotify, LandingNavbar} from './index';

const LandingPage = () => (
	<div id="landing-page">
		<LandingNavbar />
		<ConnectSpotify />
	</div>
);

export default LandingPage;
