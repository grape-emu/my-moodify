import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyContainer from '../Components/Authenticate/SpotifyContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpotifyContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
