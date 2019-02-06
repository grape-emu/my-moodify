import React from 'react';
import ReactDOM from 'react-dom';
import RecommendationsButton from '../src/SpotifyComponents/RecommendationsButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecommendationsButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
