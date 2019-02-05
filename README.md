This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Moodify

This app allows a user to upload a selfie and retrieve a playlist that matches the mood expressed in the image. The uploaded image is processed for detection of facial features and expressions by Google Cloud Vision. The resulting mood is then mapped to a range of values of one or more characteristics that Spotify uses to classify tracks. The app calls the Spotify API with the mapped values and returns a suggested playlist. The user can choose to listen to that playlist or request one to improve the user's mood.
