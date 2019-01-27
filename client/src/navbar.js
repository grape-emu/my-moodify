import React from 'react';
import SpotifyContainer from './unclient/spotify-container';
import RecommendationsButton from './unclient/RecommendationsButton';

const Navbar = () => (
  <div>
    <nav>
      <h1>MOODIFY</h1>
      <SpotifyContainer />
      <RecommendationsButton />
    </nav>
    <hr />
  </div>
);

export default Navbar;
