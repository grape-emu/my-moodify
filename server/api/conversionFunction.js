// Begin at convertGoogleCloudVisionObjToSpotifyString (line 128)

class SpotifyUrlObject {
  // eslint-disable-next-line max-params
  constructor(
    name,
    joyScale,
    sorrowScale,
    surpriseScale,
    angerScale,
    diameter = 0.4,
    minVal = 0,
    maxVal = 1
  ) {
    this.name = name;
    /* These scales indicate how each emotion relates to each spotify tag (this.name).
      Energy, for example: sorrow means low energy; joy and anger mean higher energy; surprise is irrelevant to energy. So surpriseScale is 0, and sorrowScale is a negative number. Joy and sorrow are more important to energy than anger, though, so anger is 1 but joy is 2. These are unique to each tag. */
    this.joyScale = joyScale;
    this.sorrowScale = sorrowScale;
    this.surpriseScale = surpriseScale;
    this.angerScale = angerScale;
    // In this.printString, we use a fixed point radius to give spotify two values (min and max) for each tag; this tells the function the diameter of that range
    this.diameter = diameter;
    // Most tags are ranged from 0-1, but some have other values, thus the defaults (for these and also this.diameter)
    this.minVal = minVal;
    this.maxVal = maxVal;
  }
  // Line 30 maps over the array of instances with this.addEmotionKeys, just below

  addEmotionKeys(obj) {
    // Then we take our selfieObj (from Google Cloud Vision) and add numeric values to our instance that correspond to the emotion values the selfieObj contains (like in ../../conversion/spotifyObjEmotions.js)
    /* eslint-disable guard-for-in */
    for (let key in obj) {
      if (obj[key] === 'VERY_LIKELY') this[key] = 2;
      if (obj[key] === 'LIKELY') this[key] = 1;
      if (obj[key] === 'UNLIKELY') this[key] = -1;
      if (obj[key] === 'VERY_UNLIKELY') this[key] = -2;
      if (obj[key] === 'POSSIBLE' || obj[key] === 'UNKNOWN') this[key] = 0;
    }
    return this;
  }
  // Return to line 165, which maps over the output of this method with this.printString, line 79

  translator() {
    // rangeWidth holds the largest possible output range, based on what spotify permits
    const rangeWidth = this.maxVal - this.minVal;
    // scaledMax will hold the largest possible range, based on our weighted scale
    let scaledMax = 0;
    // For each scale that's relevant to this photo, add its absolute value to scaledMax
    if (this.joyScale !== 0) scaledMax += Math.abs(this.joyScale);
    if (this.sorrowScale !== 0) scaledMax += Math.abs(this.sorrowScale);
    if (this.surpriseScale !== 0) scaledMax += Math.abs(this.surpriseScale);
    if (this.angerScale !== 0) scaledMax += Math.abs(this.angerScale);
    // double scaledMax, to account for the fact that our scale extends into both positive and negative
    scaledMax *= 2;
    const fixedPoint = () => {
      // emotionTotal will hold the number (relative to scaledMax) that measures how much of the given tag represents the emotion Cloud Vision read in this selfie
      let emotionTotal = 0;
      emotionTotal += this.joyLikelihood * this.joyScale;
      emotionTotal += this.sorrowLikelihood * this.sorrowScale;
      emotionTotal += this.surpriseLikelihood * this.surpriseScale;
      emotionTotal += this.angerLikelihood * this.angerScale;
      /* The output below (line 70) marks the single point that maps most closely to the emotions Google Cloud Vision detected in the selfie.
      Here is a more granular rewrite of what the range function below is doing:
          const emotionTotalAbsoluteValue = emotionTotal - (-1 * scaledMax);
          const emotionTotalPercent = emotionTotalAbsoluteValue / (scaledMax * 2);
          const emotionTotalProportionFullSize = emotionTotalPercent * rangeWidth;
          const emotionTotalMovedBackToItsProperPlace = emotionTotalProportionFullSize + rangeMin;
          return emotionTotalMovedBackToItsProperPlace; */
      return (
        this.minVal +
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
    /* rangeMin and rangeMax are the ACTUAL limits of our measurement, based on emotion and scale
    As opposed to this.minVal and this.maxVal, which are the outer POSSIBLE limits of the range */
    const rangeMin = cheapRound(
      Math.max(this.midpoint - this.diameter / 2, this.minVal)
    );
    const rangeMax = cheapRound(
      Math.min(this.midpoint + this.diameter / 2, this.maxVal)
    );
    // Genre comes first in the string, and also follows some different output rules
    if (this.name === 'genre') {
      const genreSimple = Math.round(this.midpoint) === 1 ? 'happy' : 'sad';
      return `&seed_${this.name}s=${genreSimple}`;
    }
    // Mode is a boolean, so its output is also a different format
    if (this.name === 'mode')
      return `&${this.name}=${Math.round(this.midpoint)}`;
    else {
      // We don't need to specify when our numbers match spotify's defaults
      if (rangeMin === this.minVal) return `&max_${this.name}=${rangeMax}`;
      if (rangeMax === this.maxVal) return `&min_${this.name}=${rangeMin}`;
      // Here is the basic string to print for each tag
      else return `&min_${this.name}=${rangeMin}&max_${this.name}=${rangeMax}`;
    }
  }
}
// Return to line 171

// For each spotify key that we intend to use, we need to initialize an instance of the constructor (see details begin at line 16)
const genreUrlObj = new SpotifyUrlObject('genre', 2, -2, 0, 0);
const modeUrlObj = new SpotifyUrlObject('mode', 2, -2, 0, 0);
const valenceUrlObj = new SpotifyUrlObject('valence', 2, -2, 1, -1);
const energyUrlObj = new SpotifyUrlObject('energy', 2, -1.5, 0, 1);

// Before we can act, we need an array that contains the instances for all the spotify keys we care about (see just above, line 112)
const fullUrlObject = [
  genreUrlObj,
  modeUrlObj,
  valenceUrlObj,
  energyUrlObj
];

// Here is where the function begins -- it takes the object that Google Cloud Vision gives to us
const convertGoogleCloudVisionObjToSpotifyString = selfieObj => {
  const failsTest = (arr, keyword) => {
    const hold = arr.filter(el => el === keyword);
    if (hold.length === arr.length) return 'error';
    else return 'good to go';
  };
  // First, we test to confirm that Cloud Vision has detected emotions in the photo
  if (
    selfieObj.blurredLikelihood === 'VERY_LIKELY' ||
    failsTest(
      [
        selfieObj.joyLikelihood,
        selfieObj.sorrowLikelihood,
        selfieObj.surpriseLikelihood,
        selfieObj.angerLikelihood,
      ],
      'UNKNOWN'
    ) === 'error' ||
    failsTest(
      [
        selfieObj.joyLikelihood,
        selfieObj.sorrowLikelihood,
        selfieObj.surpriseLikelihood,
        selfieObj.angerLikelihood,
      ],
      'VERY_UNLIKELY'
    ) === 'error'
  ) {
    // This isn't just a console log; we need to build this error in on the front end still...
    console.log(
      'We need to throw an error here on the front end: "Image quality insufficient. Please try a different selfie."'
    );
    return 'error';
  }

  // Before we can process the selfie's emotions, we need to initialize our instance of the constructor (fullUrlObject, line 118), which will look a lot like the one in ../../conversion/spotifyObjDefault.js
  // Then we run addEmotionKeys (line 30) to customize the instance with Google's emotion analysis data
  const specificPhotoObject = fullUrlObject.map(el =>
    el.addEmotionKeys(selfieObj)
  );
  /* now that we have all the data we need in the object, it's time to get the url string spotify needs
    Note that this.printString returns the string for each key in turn, so they need to be joined
    Then these four things are static to every query, so we concat them onto the end */
  let urlString =
    specificPhotoObject.map(el => el.printString()).join('') +
    '&max_liveness=0.75&max_speechiness=0.66&market=US&explicit=false';
  console.log('urlString from the conversion function', urlString);
  return urlString;
};

// Retaining this for easy testing purposes:
// console.log(convertGoogleCloudVisionObjToSpotifyString({
//   joyLikelihood: 'VERY_UNLIKELY',
//   sorrowLikelihood: 'VERY_LIKELY',
//   angerLikelihood: 'POSSIBLE',
//   surpriseLikelihood: 'VERY_UNLIKELY'}))

module.exports = convertGoogleCloudVisionObjToSpotifyString;
