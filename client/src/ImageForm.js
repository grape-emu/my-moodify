import React, { Component } from 'react';
import axios from 'axios';

class ImageForm extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    };
  }

  submitFile = event => {
    console.log('submitFile working...');
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios
      .post('s3/test-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(error => {
        console.log('error');
      });
  };

  handleFileUpload = event => {
    console.log('updating');
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input
          label="upload file"
          type="file"
          onChange={this.handleFileUpload}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default ImageForm;
