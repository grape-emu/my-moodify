import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const MoodifyUpload = props => {
	const theme = createMuiTheme({
		palette: {
			primary: { main: '#6200ea' }, // deepPurple[a700]
			secondary: { main: '#3f51b5' }, // indigo[500]
			accent: { main: '#2196f3' } // blue[500]
		},
		typography: { useNextVariants: true }
	});

	return (
		<div id="container">
			<form onSubmit={props.submit}>
				<MuiThemeProvider theme={theme}>
					<div>
						<input style={{backgroundColor: "#6200ea",
    color: "white",
    fontSize: "1rem",
    alignContent: "center",
    alignItems: "center", margin: "1em"}}
							variant="outlined"
							color="primary"
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

					<Button variant="contained" type="submit" color="primary">
						Moodify
					</Button>
				</MuiThemeProvider>
			</form>
		</div>
	);
};

export default MoodifyUpload;
