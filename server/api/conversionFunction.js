// Begin at convertGoogleCloudVisionObjToSpotifyString (line 282)

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
  }
  // Line 311 maps over the array of instances with this.addEmotionKeys, just below

  addEmotionKeys(obj) {
    /* These arrays will be used for genre sorting below (genreStringComplex,
    line 54), to help determine which emotion(s) Google determined to be dominant. */
    this.veryLikelyMood = [];
    this.likelyMood = [];
    this.possibleMood = [];
    this.leastUnlikelyMood = [];
    /* Then we take our selfieObj (from Google Cloud Vision) and add numeric
    values to our instance to correspond with the emotion values the selfieObj
    contains (see example in ../../conversion/spotifyObjEmotions.js) */
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
      if (obj[key] === 'POSSIBLE') {
        this[key] = 0;
        this.possibleMood.push(key);
      }
      if (obj[key] === 'UNLIKELY') {
        this[key] = -1;
        this.leastUnlikelyMood.push(key);
      }
      if (obj[key] === 'VERY_UNLIKELY') this[key] = -2;
      if (obj[key] === 'UNKNOWN') this[key] = 0;
    }
    console.log(this);
    return this;
  }
  /* Return to line 320, which maps over the output of this method with
  this.printString, line 229 */

  genreStringComplex() {
    // First we initialize sets of genres for each dominant emotion
    const joyGenreSeeds = [
      'disney',
      'hip-hop',
      'jazz',
      'new-release',
      'pop',
      'power-pop',
      'r-n-b',
      'rock',
      'rock-n-roll',
      'summer',
    ];
    const sorrowGenreSeeds = [
      'bluegrass',
      'blues',
      'emo',
      'folk',
      'indie',
      'singer-songwriter',
    ];
    const surpriseGenreSeeds = [
      'bossanova',
      'funk',
      'honky-tonk',
      'j-pop',
      'pop-film',
      'rainy-day',
      'road-trip',
      'rockabilly',
      'show-tunes',
      'ska',
      'soul',
      'soundtracks',
    ];
    const angerGenreSeeds = [
      'alt-rock',
      'alternative',
      'black-metal',
      'goth',
      'grindcore',
      'grunge',
      'hardcore',
      'heavy-metal',
      'metal',
      'metal-misc',
      'metalcore',
      'progressive-house',
      'psych-rock',
      'punk',
      'punk-rock',
    ];
    // The action of this function actually begins on line 171

    /* This helper function gives us exactly five seed genres, the max that Spotify
    takes. The optional 'given' argument permits us to ensure that 'happy' is always
    included for a joyful photo and 'sad' for a sorrowful photo (see lines 173-175) */
    const getGenreSeeds = (arr, given) => {
      const output = given ? [given] : [];
      while (output.length < 5) {
        let idx = Math.floor(Math.random() * (arr.length - 1));
        if (!output.includes(arr[idx])) {
          output.push(arr[idx]);
        }
      }
      return output;
    };
    // Go to line 188

    const populateSeedArr = emotion => {
      /* Google Cloud Vision sometimes returns more than one emotion as the most
      dominant, so mapping this function, as we do below, permits us to make one
      array at each rank containing all the possibilities at each rank*/
      console.log('entering populateSeedArr', this.genrePossibilities);
      if (emotion === 'joyLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(joyGenreSeeds);
        console.log('if joy', this.genrePossibilities);
      }
      if (emotion === 'sorrowLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(
          sorrowGenreSeeds
        );
        console.log('if sorrow', this.genrePossibilities);
      }
      if (emotion === 'surpriseLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(
          surpriseGenreSeeds
        );
        console.log('if surprise', this.genrePossibilities);
      }
      if (emotion === 'angerLikelihood') {
        this.genrePossibilities = this.genrePossibilities.concat(
          angerGenreSeeds
        );
        console.log('if anger', this.genrePossibilities);
      }
      console.log('leaving populateSeedArr', this.genrePossibilities);
      return this.genrePossibilities;
    };

    /* This helper function tests, for each array below (lines 171-175), whether
		it contains anything; if it does, we populate the seed array (line 125); if
		not, we repeat the process for the next array */
    const grabGenres = moodArr => {
      /* We initialize genrePossibilities as an empty array (or empty it, if a
        request has already been run on this page), to hold all the genres that
        would be possible for this photo */
      this.genrePossibilities = [];
      console.log('possibilities entering grabGenres', this.genrePossibilities);
      if (moodArr.length < 1) return false;
      if (moodArr.length >= 1) {
        moodArr.map(mood => populateSeedArr(mood));
        return true;
      }
    };

    /* if Google Cloud Vision ranks any emotion(s) as Very Likely, let's use
    those genres for our seeds */
    let genresFound = grabGenres(this.veryLikelyMood);
    /* If no emotions were detected as Very Likely, we need to run the same check on those that were Likely. If Likely is also empty, then Possible; if Possible is also empty, then Unlikely. It's impossible for a playlist to be rendered and all these be empty (we'd throw an error). */
    if (!genresFound) genresFound = grabGenres(this.likelyMood);
    if (!genresFound) genresFound = grabGenres(this.possibleMood);
    if (!genresFound) genresFound = grabGenres(this.leastUnlikelyMood);

    // Now we need to skim down from possible genres to actual genres. Line 113.
    /* If joySeeds, which is the only set that includes 'disney', was added to
    genrePossibilities, then the first seed needs to be 'happy'. Likewise for
    sorrowSeeds, 'bluegrass', and 'sad'. */
    if (this.genrePossibilities.includes('disney'))
      this.genreSeeds = getGenreSeeds(this.genrePossibilities, 'happy');
    else if (this.genrePossibilities.includes('bluegrass'))
      this.genreSeeds = getGenreSeeds(this.genrePossibilities, 'sad');
    else this.genreSeeds = getGenreSeeds(this.genrePossibilities);

    // This joins the seed genres in the string Spotify needs. Return to printString, line 244.
    console.log('genreSeeds', this.genreSeeds);
    return `&seed_genres=${this.genreSeeds.join('%2C')}`;
  }

  translator() {
    /* rangeWidth holds the largest possible output range, based on what spotify
    permits. Since the tags we are using all have a minimum value of 0 and a
    maximum value of 1, this is a constant value, 1. */
    const rangeWidth = 1;
    /* scaledMax will hold the largest possible range of actual data, based on
    our weighted scale (before we convert it to the necessary range in lines 223) */
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
      /* The output below (line 223) marks the single point that maps most closely
      to the emotions Google Cloud Vision detected in the selfie.
      Here is a more granular rewrite of what the range function below is doing:
          const emotionTotalAbsoluteValue = emotionTotal - (-1 * scaledMax);
          const emotionTotalPercent = emotionTotalAbsoluteValue / (scaledMax * 2);
          const emotionTotalProportionFullSize = emotionTotalPercent * rangeWidth;
          const emotionTotalMovedBackToItsProperPlace = emotionTotalProportionFullSize + rangeMin;
          return emotionTotalMovedBackToItsProperPlace; */
      return ((emotionTotal + scaledMax) / (scaledMax * 2)) * rangeWidth;
    };
    return fixedPoint;
  }
  // Return to line 232

  printString() {
    // this.translator (line 191) will yield the midpoint for our fixed point radius
    // Note that we invoke it immediately, so we actually return the output of fixedPoint
    this.midpoint = this.translator()();
    const cheapRound = x => Math.round(x * 100000) / 100000;
    /* rangeMin and rangeMax are the ACTUAL limits of our measurement, based on
    emotion and scale
    As opposed to 0 and 1, which are the outer POSSIBLE limits of the range */
    const rangeMin = cheapRound(Math.max(this.midpoint - 0.2, 0));
    /* We set a radius of 0.2 for the fixed point radius, to give Spotify a
			fairly large range within each tag */
    const rangeMax = cheapRound(Math.min(this.midpoint + 0.2, 1));

    /* Genre comes first in the string, and also follows some different output
		rules, so it's got its own helper function, line 54 */
    if (this.name === 'genre') return this.genreStringComplex();
    // Mode is a boolean, so its output also follows a different format
    if (this.name === 'mode') {
      /* since Cloud Vision sometimes detects that an image is both very joyful
      and very sorrowful, and that result returns a net positive in our function,
      omit mode entirely in this case, to add variety in the output */
      if (this.joyLikelihood === 2 && this.sorrowLikelihood === 2) return ``;
      else return `&mode=${Math.round(this.midpoint)}`;
    } else {
      // We don't need to specify these when our numbers match spotify's defaults
      if (rangeMin === 0) return `&max_${this.name}=${rangeMax}`;
      if (rangeMax === 1) return `&min_${this.name}=${rangeMin}`;
      // Here is the basic string to print for each tag
      else return `&min_${this.name}=${rangeMin}&max_${this.name}=${rangeMax}`;
    }
  }
}
// Return to line 319

/* For each spotify key that we intend to use, we need to initialize an instance
of the constructor (see details beginning at line 6) */
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

/* Before we can act, we need an array that contains the instances for all the
spotify keys we care about (see just above, line 273) */
const fullUrlObject = [genreUrlObj, modeUrlObj, valenceUrlObj, energyUrlObj];

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
  const selfieObjEmotions = [
    selfieObj.joyLikelihood,
    selfieObj.sorrowLikelihood,
    selfieObj.surpriseLikelihood,
    selfieObj.angerLikelihood,
  ];
  // Then we run those tests, confirming that we have emotion data to work with
  if (
    tooBlurry ||
    selfieObjEmotions.every(allUnknown) ||
    selfieObjEmotions.every(allVeryUnlikely)
  ) {
    return false;
  }

  /* Before we can process the selfie's emotions, we need to initialize our
  instance of the constructor (fullUrlObject, line 280), which will look a lot
  like the one in ../../conversion/spotifyObjDefault.js */
  /* Then we run addEmotionKeys (line 24) to customize the instance with Google's
  emotion analysis data */
  const specificPhotoObject = fullUrlObject.map(tag =>
    tag.addEmotionKeys(selfieObj)
  );
  /* Now that we have all the data we need in the object, it's time to get the
  url string Spotify needs.
	Note that this.printString (line 229) returns the strings for each key as an
	array, so they need to be joined.
	Then, these four hard-coded things are static to every query, so we concat
	them onto the end */
  let urlString =
    specificPhotoObject.map(tag => tag.printString()).join('') +
    '&max_liveness=0.75&max_speechiness=0.66&market=US&explicit=false';
  console.log('urlString from the conversion function', urlString);
  return urlString;
};

module.exports = convertGoogleCloudVisionObjToSpotifyString;
