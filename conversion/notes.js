from google:
detectionConfidence: Range[0,1]
landmarkingConfidence: Range[0,1]     // will be useful for AR-ing face
joyLikelihood: enum(Likelihood)
sorrowLikelihood: enum(Likelihood)
angerLikelihood: enum(Likelihood)
surpriseLikelihood: enum(Likelihood)
underexposedLikelihood: enum(Likelihood)
blurredLikelihood: enum(Likelihood)

enum(Likelihood):
  UNKNOWN
  VERY_UNLIKELY
  UNLIKELY
  POSSIBLE
  LIKELY
  VERY_LIKELY


case (detectionConfidence == close to 0) ||
  (blurredLikelihood === 'VERY_LIKELY') ||
  (joyLikelihood === 'UNKNOWN' && sorrowLikelihood === 'UNKNOWN' && angerLikelihood === 'UNKNOWN' && surpriseLikelihood === 'UNKNOWN') ||
  (joyLikelihood === 'VERY_UNLIKELY' && sorrowLikelihood === 'VERY_UNLIKELY' && angerLikelihood === 'VERY_UNLIKELY' && surpriseLikelihood === 'VERY_UNLIKELY'):
  return "Image quality insufficient. Please try a different selfie."


case ((joyLikelihood === VERY_LIKELY || joyLikelihood === LIKELY) && (sorrowLikelihood === VERY_LIKELY || sorrowLikelihood === LIKELY)):
  return


case default:
  return 'max_liveness=0.75&min_speechiness=0.66';

  const functionConversion = 'seed_genres=blues&max_valence=0.5';

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  to spotify:
  genre:
  energy:         // Float[0,1] where 1 === intensity/activity (death metal == 1; bach prelude == 0)
                            // Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy
  danceability:   // Float[0,1] where 1 === v easy to dance to
  loudness:       // Float[-60,1] // the higher the value (db), the louder the song
  liveness:       // Float[0,1], where >= 0.8 is probs a live recording
  valence:        // Float[0,1], the higher the value, the more positive mood for the song (where neg inc angry)        ********
  acousticness:   // Float[0,1] where 1 === def acoustic
  speechiness:    // Float[0,1] where <= 0.33 is music; where .33-.66 is music and speech (inc rap); where >= 0.66 is all words // probs just always > 0.66
  instrumentalness:   // Float[0,1], where values above 0.5 are probs instrumentalness	  ????
  popularity:     // Float[0,1], where the higher the value, the more popular the song
  tempo:          // bpm
  mode:           // major === 1, minor === 0
track_href:       //api endpoint w/full details on track


Encode spaces with the hex code %20 or +.
Operator: The operator NOT can be used to exclude results.
Similarly, the OR operator can be used to broaden the search.
Note: Operators must be specified in uppercase.



const reformatSpaces = arr => {
  return arr.map(genre => {
    let output = genre.slice()
    for (let i = 0; i < genre.length; i++) {
      if(genre[i] === ' ') output = genre.slice(0,i).concat('%20').concat(genre.slice(i+1))
    }
    return output;
  })
}





// const bigFunc = googleObj => {
//   if(newSelfie(obj) === 'error') return '';     // throw front-end error
//   const usefulObj = convertToNums(obj);
//   // ...
//   const sameForAll = '&max_liveness=0.75&max_speechiness=0.66';
// }
// midpoints obj: key tag, values max/min
// nested obj




// toRange = function() {
//   const cheapRound = x => Math.round(x*100000) / 100000;
//   return [
//     cheapRound(Math.max(this.midpoint - (this.radius / 2), this.minVal)),
//     cheapRound(Math.min(this.midpoint + (this.radius / 2), this.maxVal))
//   ]
// }

//*************/




// SpotifyTag.prototype.translator = function() {
//   const rangeWidth = this.maxVal - this.minVal;
//   let scaledMax = 0;
//   if(this.joyScale !== 0) scaledMax += Math.abs(this.joyScale);
//   if(this.sorrowScale !== 0) scaledMax += Math.abs(this.sorrowScale);
//   if(this.surpriseScale !== 0) scaledMax += Math.abs(this.surpriseScale);
//   if(this.angerScale !== 0) scaledMax += Math.abs(this.angerScale);
//   scaledMax *= 2;
//   const fixedPoint = (joyVal,sorrowVal,surpriseVal,angerVal) => {
//     let hold = 0;
//     hold += (joyVal * this.joyScale);
//     hold += (sorrowVal * this.sorrowScale);
//     hold += (surpriseVal * this.surpriseScale);
//     hold += (angerVal * this.angerScale);
//     return this.minVal + (((hold + scaledMax) / (scaledMax * 2)) * rangeWidth);
//   }
//   return fixedPoint;
// }

// SpotifyTag.prototype.printString = function() {
//   this.midpoint = this.translator()(this.joyLikelihood,this.sorrowLikelihood,this.surpriseLikelihood,this.angerLikelihood);
//   const cheapRound = x => Math.round(x*100000) / 100000;
//   const rangeMin = cheapRound(Math.max(this.midpoint - (this.radius / 2), this.minVal));
//   const rangeMax = cheapRound(Math.min(this.midpoint + (this.radius / 2), this.maxVal));
//   if(this.name === 'genre') {
//     const genreSimple = Math.round(this.midpoint) === 1 ? 'happy' : 'sad';
//     return `?seed_${this.name}=${genreSimple}`;
//   }
//   if(this.name === 'mode') return `&${this.name}=${Math.round(this.midpoint)}`;
//   else return `&min_${this.name}=${rangeMin}&max_${this.name}=${rangeMax}`;
// }
