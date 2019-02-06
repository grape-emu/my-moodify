<h2>Manual Test Script</h2>
To confirm that new changes have not broken the code, before making a pull request.

	1. Connect to Spotify
	2. Choose Upload
		2a. Upload non-selfie image. Confirm error message renders.
		2b. Upload selfie image. Confirm that moodifiers, genres, tracks render, tracks can play.
		2c. Add to spotify. Confirm in your spotify that new playlist was created.
		2d. Start over. Click and confirm that you go back to options view.
	3. Choose Selfie
		3a. Take a bad picture. Confirm error message renders.
		3b. Take a good picture. Confirm that moodifiers, genres, tracks render, tracks can play.
		3c. Add to spotify
		3d. Start over
	4. Navigate to both options. Test log out. Should take user back to landing page.
