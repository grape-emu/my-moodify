import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { theme, Logout } from './index';

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 0.5
	}
};

const TopNav = props => {
	const { classes } = props;
	return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar
					position="static"
					style={{ background: 'transparent', boxShadow: 'none' }}
				>
					<Toolbar>
						<Logout />
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
	);
};

TopNav.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopNav);
