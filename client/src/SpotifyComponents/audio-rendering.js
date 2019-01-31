import React from 'react';
const audio = document.createElement('audio');

class AudioRendering extends React.Component {
	constructor(props) {
		super();
		this.start = this.start.bind(this);
	}
	start() {
		audio.src = 'https://api.spotify.com/v1/tracks/3gsoUGVpaV44R8BhO281m1';
		console.log(audio.src);
		audio.load();
		audio.play();
	}
	render() {
		return <button onClick={this.start}>Play Me</button>;
	}
}
export default AudioRendering;
