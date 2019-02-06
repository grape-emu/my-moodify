import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#673ab7' }, // deepPurple[500]
    secondary: { main: '#3f51b5' }, // indigo[500]
    accent: { main: '#2196f3' }, // blue[500]
  },
  typography: { useNextVariants: true },
});

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function LoadingSpinner(props) {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CircularProgress className={classes.progress} color="primary" />
      </MuiThemeProvider>
    </div>
  );
}

export default withStyles(styles)(LoadingSpinner);
