// Begin at convertGoogleCloudVisionObjToSpotifyString (line 128)

class SpotifyUrlObject {
  constructor(name, joyScale, sorrowScale, surpriseScale, angerScale) {
    this.name = name;
    /* These scales indicate how each emotion relates to each spotify tag (this.name).
      Energy, for example: sorrow means low energy; joy and anger mean higher energy;
      surprise is irrelevant to energy. So surpriseScale is 0, and sorrowScale
      is a negative number. Joy and sorrow are more important to energy than
      anger, though, so anger is 1 but joy is 2. These are unique to each tag. */
    this.joyScale = joyScale;
    this.sorrowScale = sorrowScale;
    this.surpriseScale = surpriseScale;
    this.angerScale = angerScale;
    this.veryLikelyMood = [];
    this.likelyMood = [];
    this.leastUnlikelyMood = [];
  }
  // Line 30 maps over the array of instances with this.addEmotionKeys, just below

  addEmotionKeys(obj) {
    /* Then we take our selfieObj (from Google Cloud Vision) and add numeric
    values to our instance that correspond to the emotion values the selfieObj
    contains (like in ../../conversion/spotifyObjEmotions.js) */
    /* eslint-disable guard-for-in */
    for (let key in obj) {
      if (obj[key] === 'VERY_LIKELY') {
        this[key] = 2;
        this.veryLikelyMood.push(key);
      }
      if (obj[key] === 'LIKELY') {
        this[key] = 1;
        this.likelyMood.push(key);
      }
      if (obj[key] === 'POSSIBLE' || obj[key] === 'UNKNOWN') this[key] = 0;
      if (obj[key] === 'UNLIKELY') {
        this[key] = -1;
        this.leastUnlikelyMood.push(key);
      }
      if (obj[key] === 'VERY_UNLIKELY') this[key] = -2;
    }
    return this;
  }
  /* Return to line 165, which maps over the output of this method with
  this.printString, line 79 */

  genreStringComplex() {
    // First we initialize sets of genres for each dominant emotion
    const joyGenreSeeds = [
      'disney', 'hip-hop', 'jazz', 'new-release', 'pop', 'power-pop', 'r-n-b',
      'rainy-day', 'rock', 'rock-n-roll', 'summer']
      ;
    const sorrowGenreSeeds = [
      'bluegrass', 'blues', 'emo', 'folk', 'indie', 'singer-songwriter'
    ];
    const surpriseGenreSeeds = [
      'bossanova', 'funk', 'honky-tonk', 'j-pop', 'pop-film', 'rainy-day',
      'road-trip', 'rockabilly', 'show-tunes', 'ska', 'soul', 'soundtracks'
    ];
    const angerGenreSeeds = [
      'alt-rock', 'alternative', 'black-metal', 'goth', 'grindcore', 'grunge',
      'hardcore', 'heavy-metal', 'metal', 'metal-misc', 'metalcore',
      'progressive-house', 'psych-rock', 'punk', 'punk-rock'
    ];
    const populateSeedArr = emotion => {
      /* We initialize genrePossibilities as an empty array (or empty it, if a
      request has already been run on this page), to hold all the possible genres */
      this.genrePossibilities = [];
      /* Google Cloud Vision sometimes returns more than one emotion as the most
      dominant, so mapping this function, as we do below, permits us to make one
      array containing all the possibilities for each photo */
      if(emotion === 'joyLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(joyGenreSeeds);
      }
      if(emotion === 'sorrowLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(sorrowGenreSeeds);
      }
      if(emotion === 'surpriseLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(surpriseGenreSeeds);
      }
      if(emotion === 'angerLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(angerGenreSeeds);
      }
      return this.genrePossibilities;
    }
    /* This helper function gives us exactly five seed genres, the max that Spotify
    takes. The 'given' argument permits us to ensure that 'happy' is always included
    for a joyful photo and 'sad' for a sorrowful photo.*/
    const getGenreSeeds = (arr,given) => {
      const output = (given) ? [given] : [];
      while(output.length < 5) {
        let idx = Math.floor(Math.random() * (arr.length - 1))
        if(!output.includes(arr[idx])) {
          output.push(arr[idx])
        }
      }
      return output;
    }
    /* This helper function tests, for each array below,*/
    const grabGenres = moodArr => {
      if(moodArr.length < 1) return false;
      if(moodArr.length === 1) populateSeedArr(moodArr[0])
      if(moodArr.length > 1) moodArr.map(mood => populateSeedArr(mood));
    }
    grabGenres(this.veryLikelyMood);
    if(this.genrePossibilities) grabGenres(this.likelyMood);
    if(this.genrePossibilities) grabGenres(this.leastUnlikelyMood);

    if(this.genrePossibilities.includes('disney')) this.genreSeeds = getGenreSeeds(this.genrePossibilities,'happy');
    else if(this.genrePossibilities.includes('bluegrass')) this.genreSeeds = getGenreSeeds(this.genrePossibilities,'sad');
    else this.genreSeeds = getGenreSeeds(this.genrePossibilities);
    console.log('this.genreSeeds',this.genreSeeds)
    return `&seed_genres=${this.genreSeeds.join('%2C')}`;
  }

  translator() {
    /* rangeWidth holds the largest possible output range, based on what spotify
    permits. Since the tags we are using all have a minimum value of 0 and a
    maximum value of 1, this is a constant value, 1. */
    const rangeWidth = 1;
    /* scaledMax will hold the largest possible range of actual data, based on
    our weighted scale (before we convert it to the necessary range in lines 61-63) */
    let scaledMax = 0;
    // For each scale that's relevant to this photo, add its absolute value to scaledMax
    if (this.joyScale !== 0) scaledMax += Math.abs(this.joyScale);
    if (this.sorrowScale !== 0) scaledMax += Math.abs(this.sorrowScale);
    if (this.surpriseScale !== 0) scaledMax += Math.abs(this.surpriseScale);
    if (this.angerScale !== 0) scaledMax += Math.abs(this.angerScale);
    /* double scaledMax, to account for the fact that our scale extends into
    both positive and negative */
    scaledMax *= 2;
    const fixedPoint = () => {
      /* emotionTotal will hold the number (relative to scaledMax) that measures how
      much of the given tag represents the emotion Cloud Vision read in this selfie */
      let emotionTotal = 0;
      emotionTotal += this.joyLikelihood * this.joyScale;
      emotionTotal += this.sorrowLikelihood * this.sorrowScale;
      emotionTotal += this.surpriseLikelihood * this.surpriseScale;
      emotionTotal += this.angerLikelihood * this.angerScale;
      /* The output below (line 70) marks the single point that maps most closely
      to the emotions Google Cloud Vision detected in the selfie.
      Here is a more granular rewrite of what the range function below is doing:
          const emotionTotalAbsoluteValue = emotionTotal - (-1 * scaledMax);
          const emotionTotalPercent = emotionTotalAbsoluteValue / (scaledMax * 2);
          const emotionTotalProportionFullSize = emotionTotalPercent * rangeWidth;
          const emotionTotalMovedBackToItsProperPlace = emotionTotalProportionFullSize + rangeMin;
          return emotionTotalMovedBackToItsProperPlace; */
      return (
        ((emotionTotal + scaledMax) / (scaledMax * 2)) * rangeWidth
      );
    };
    return fixedPoint;
  }
  // Return to line 82

  printString() {
    // this.translator (line 44) will yield the midpoint for our fixed point radius
    // Note that we invoke it immediately, so we actually return the output of fixedPoint
    this.midpoint = this.translator()();
    const cheapRound = x => Math.round(x * 100000) / 100000;
    /* rangeMin and rangeMax are the ACTUAL limits of our measurement, based on
    emotion and scale
    As opposed to 0 and 1, which are the outer POSSIBLE limits of the range */
    const rangeMin = cheapRound(
      /* We set a radius of 0.2 for the fixed point radius, to give Spotify a
      fairly large range within each tag */
      Math.max(this.midpoint - 0.2, 0)
    );
    const rangeMax = cheapRound(
      Math.min(this.midpoint + 0.2, 1)
    );
    // Genre comes first in the string, and also follows some different output rules
    if (this.name === 'genre') {
      // const genreSimple = Math.round(this.midpoint) === 1 ? 'happy' : 'sad';
      // return `&seed_genres=${genreSimple}`;
      return this.genreStringComplex()
      // genreStringComplex is nearly working, and will replace the two lines above, but for now, leaving them for testing purposes
    }
    // Mode is a boolean, so its output also follows a different format
    if (this.name === 'mode') {
      /* since Cloud Vision sometimes detects that an image is both very joyful
      and very sorrowful, and that result returns a net positive in our function,
      omit mode entirely in this case, to add variety in the output */
      if(this.joyLikelihood === 2 && this.sorrowLikelihood === 2) return ``;
      else return `&mode=${Math.round(this.midpoint)}`;
    }
    else {
      // We don't need to specify when our numbers match spotify's defaults
      if (rangeMin === 0) return `&max_${this.name}=${rangeMax}`;
      if (rangeMax === 1) return `&min_${this.name}=${rangeMin}`;
      // Here is the basic string to print for each tag
      else return `&min_${this.name}=${rangeMin}&max_${this.name}=${rangeMax}`;
    }
  }
}
// Return to line 171

/* For each spotify key that we intend to use, we need to initialize an instance
of the constructor (see details beginning at line 16) */
/* These number values correspond to the joyScale, sorrowScale, surpriseScale,
and angerScale. These scales indicate how each emotion relates to each spotify tag.
  Energy, for example: sorrow means low energy; joy and anger mean higher energy;
  surprise is irrelevant to energy. So surpriseScale is 0, and sorrowScale is a
  negative number. Joy and sorrow are more important to energy than anger, though,
  so anger is 1 but joy is 2. These are unique to each tag. */
/* const instanceName = newSpotifyUrlObject(name, joyScale, sorrowScale,
  surpriseScale, angerScale) */
const genreUrlObj = new SpotifyUrlObject('genre', 2, -2, 0, 0);
const modeUrlObj = new SpotifyUrlObject('mode', 2, -2, 0, 0);
const valenceUrlObj = new SpotifyUrlObject('valence', 2, -2, 1, -1);
const energyUrlObj = new SpotifyUrlObject('energy', 2, -1.5, 0, 1);

/* Geoff had suggested that we move these numbers into a different, hard-coded object, but I don't see a good way to do that, because we need to keep the constructor or else (I think?) completely rework how the particular image's emotion is added to the object. Below are my attempts, which I retain for discussion purposes. */

const genreData = {
  name: 'genre',
  joyScale: 2,
  sorrowScale: -2,
  surpriseScale: 0,
  angerScale: 0
}

const modeData = {
  name: 'mode',
  joyScale: 2,
  sorrowScale: -2,
  surpriseScale: 0,
  angerScale: 0
}

const valenceData = {
  name: 'valence',
  joyScale: 2,
  sorrowScale: -2,
  surpriseScale: 1,
  angerScale: -1
}

const energyData = {
  name: 'energy',
  joyScale: 2,
  sorrowScale: -1.5,
  surpriseScale: 0,
  angerScale: 1
}

/* Before we can act, we need an array that contains the instances for all the
spotify keys we care about (see just above, line 112) */
const fullUrlObject = [
  genreUrlObj,
  modeUrlObj,
  valenceUrlObj,
  energyUrlObj
];

// *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
//
/* Here is where the function begins -- it takes the object that Google Cloud Vision
gives to us */
const convertGoogleCloudVisionObjToSpotifyString = selfieObj => {
  /* First, we set up some variables that will help us confirm that Cloud Vision
  has detected emotions in the photo */
  const allUnknown = currentEmotion => currentEmotion === 'UNKNOWN';
  const allVeryUnlikely = currentEmotion => currentEmotion === 'VERY_UNLIKELY';
  const tooBlurry = selfieObj.blurredLikelihood === 'VERY_LIKELY';
  const selfieObjEmotions = [selfieObj.joyLikelihood, selfieObj.sorrowLikelihood, selfieObj.surpriseLikelihood, selfieObj.angerLikelihood];
  // Then we run those tests, confirming that we have emotion data to work with
  if (tooBlurry || selfieObjEmotions.every(allUnknown) || selfieObjEmotions.every(allVeryUnlikely)) {
    // This isn't just a console log; we need to build this error in on the front end still...
    return false;
    // throw new Error;
  }

  /* Before we can process the selfie's emotions, we need to initialize our
  instance of the constructor (fullUrlObject, line 118), which will look a lot
  like the one in ../../conversion/spotifyObjDefault.js */
  /* Then we run addEmotionKeys (line 30) to customize the instance with Google's
  emotion analysis data */
  const specificPhotoObject = fullUrlObject.map(tag =>
    tag.addEmotionKeys(selfieObj)
  );
  /* now that we have all the data we need in the object, it's time to get the
  url string Spotify needs.
  Note that this.printString returns the strings for each key as an array,
  so they need to be joined.
  Then, these four things are static to every query, so we concat them onto the end */
  let urlString =
    specificPhotoObject.map(tag => tag.printString()).join('') +
    '&max_liveness=0.75&max_speechiness=0.66&market=US&explicit=false';
  console.log('urlString from the conversion function', urlString);
  return urlString;
};

// Can we pass this the same object we've already processed? Or do we need to run the whole thing anew?
// const improveMyMood = (processedSelfieObj) => {
//   if(this.joyLikelihood <= 1) this.joyLikelihood += 1;
//   else this.joyScale += 1;
//   let urlString =
//     processedSelfieObj.map(tag => tag.printString()).join('') +
//     '&max_liveness=0.75&max_speechiness=0.66&market=US&explicit=false';
//   console.log('urlString from the conversion function', urlString);
//   return urlString;
// }


// Retaining this for easy testing purposes:
// console.log(convertGoogleCloudVisionObjToSpotifyString({
//   joyLikelihood: 'VERY_UNLIKELY',
//   sorrowLikelihood: 'VERY_LIKELY',
//   angerLikelihood: 'POSSIBLE',
//   surpriseLikelihood: 'VERY_UNLIKELY'}))

  // console.log(improveMyMood({
  //   joyLikelihood: 'VERY_UNLIKELY',
  //   sorrowLikelihood: 'VERY_LIKELY',
  //   angerLikelihood: 'POSSIBLE',
  //   surpriseLikelihood: 'VERY_UNLIKELY'}))


module.exports = convertGoogleCloudVisionObjToSpotifyString;




// According to Google Cloud Vision, this face is definitely (joyful, sorrowful, surprised, angry), probably (ibid.), probably not (ibid.), and definitely not (ibid.).
/*


mode:
  in a major key === 1
  in a minor key === 0

valence:
  with a very positive mood
  with a comparatively positive mood
  with a comparatively negative mood
  with a very negative mood

energy:
  with high energy
  with medium energy
  with low energy

genre:



  */
