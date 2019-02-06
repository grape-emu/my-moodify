import React from 'react';
import explainPlaylistData from './PlaylistDataAnalysis';
import emotionsAnalysis from './EmotionsAnalysis';

const GenreComponent = ({ genres, spotifyQuery }) => (
  <div>
    <p>{emotionsAnalysis(spotifyQuery)}.</p>
    <p>
      {explainPlaylistData(spotifyQuery)}, from the genres {genres[0].id},{' '}
      {genres[1].id}, {genres[2].id}, {genres[3].id}, and {genres[4].id}.
    </p>
  </div>
);

export default GenreComponent;
