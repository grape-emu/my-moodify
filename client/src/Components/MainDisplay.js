import React from 'react';
import { Navbar, RecommendationsButton } from './index';

const MainDisplay = () => {
	return (
		<div>
			<header className="App-header">
				<Navbar className="App-header" />
			</header>
			<RecommendationsButton />
		</div>
	);
};

export default MainDisplay;
