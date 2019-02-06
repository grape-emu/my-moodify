import React from 'react';
import { Navbar, SelectionDisplay } from './index';

const MainDisplay = () => {
	return (
		<div>
			<header className="App-header">
				<Navbar className="App-header" />
			</header>
			<SelectionDisplay />
		</div>
	);
};

export default MainDisplay;
