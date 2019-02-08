import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#1a237e' }, // deepPurple[a700]
		secondary: { main: '#3f51b5' }, // indigo[500]
		accent: { main: '#2196f3' } // blue[500]
	},
	typography: { useNextVariants: true }
});

export default theme;
