import React from 'react';
import ConnectSpotify from './connect-spotify';
import RecommendationsButton from './RecommendationsButton';

const SpotifyDisplay = () => {
  return (
    <div>
      <ConnectSpotify />
      <RecommendationsButton />
    </div>
  );
};

export default SpotifyDisplay;
