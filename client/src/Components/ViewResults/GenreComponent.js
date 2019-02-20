import React from 'react';
import explainPlaylistData from './PlaylistDataAnalysis';

const parseResult = (result) => {
 
  return result.replace('_', ' ')
}
const GenreComponent = ({ genres, spotifyQuery, feedback }) => (
  <div className="inline-component">
  <h2>Your Results</h2>
    <p>Happiness: {parseResult(feedback.joyLikelihood)} </p>
    <p>Surprise:{parseResult(feedback.surpriseLikelihood)} </p>
    <p>Sorrow:{parseResult(feedback.sorrowLikelihood)} </p>
    <p>Anger: {parseResult(feedback.angerLikelihood)}</p>
    <p>
      {explainPlaylistData(spotifyQuery)}, from the genres {genres[0].id},{' '}
      {genres[1].id}, {genres[2].id}, {genres[3].id}, and {genres[4].id}.
    </p>
  </div>
);

export default GenreComponent;
