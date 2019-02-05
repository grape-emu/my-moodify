import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
};

const WebcamComponent = () => {
  return (
    <div>
      <Webcam
        audio={false}
        height={350}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={videoConstraints}
      />
      <Button variant="contained" type="submit">
        Take Selfie!
      </Button>
    </div>
  );
};

export default WebcamComponent;
