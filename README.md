## Moodify

[Moodify](my-moodify.herokuapp.com) allows a user to upload an image or take a selfie and retrieve a playlist that matches the mood expressed in the image. The image is processed for detection of facial features and expressions by Google Cloud Vision. The app then maps the returned mood to a range of values of several characteristics that Spotify uses to classify tracks (via a custom function found in server/api/). The app calls the Spotify API with the mapped values and returns a suggested playlist. The user can choose to listen to individual tracks, save the playlist in Spotify, or start over.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
