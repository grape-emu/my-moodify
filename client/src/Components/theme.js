import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#8c9eff' },
		secondary: { main: '#fafafa' },
		accent: { main: '#fafafa' }
	},
	typography: { useNextVariants: true }
});

export default theme;
