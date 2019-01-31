class SpotifyUrlObject {
  // eslint-disable-next-line max-params
  constructor(name,joyScale,sorrowScale,surpriseScale,angerScale,minVal = 0,maxVal = 1,radius = 0.2) {
    this.name = name;
    this.joyScale = joyScale;
    this.sorrowScale = sorrowScale;
    this.surpriseScale = surpriseScale;
    this.angerScale = angerScale;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.radius = radius;
  }
  addEmotionKeys(obj) {
    /* eslint-disable guard-for-in */
    for(let key in obj) {
      if(obj[key] === 'VERY_LIKELY') this[key] = 2;
      if(obj[key] === 'LIKELY') this[key] = 1;
      if(obj[key] === 'UNLIKELY') this[key] = -1;
      if(obj[key] === 'VERY_UNLIKELY') this[key] = -2;
      if(obj[key] === 'POSSIBLE' || obj[key] === 'UNKNOWN') this[key] = 0;
    }
    return this;
  }
  translator() {
    const rangeWidth = this.maxVal - this.minVal;
    let scaledMax = 0;
    if(this.joyScale !== 0) scaledMax += Math.abs(this.joyScale);
    if(this.sorrowScale !== 0) scaledMax += Math.abs(this.sorrowScale);
    if(this.surpriseScale !== 0) scaledMax += Math.abs(this.surpriseScale);
    if(this.angerScale !== 0) scaledMax += Math.abs(this.angerScale);
    scaledMax *= 2;
    const fixedPoint = () => {
      let hold = 0;
      hold += (this.joyLikelihood * this.joyScale);
      hold += (this.sorrowLikelihood * this.sorrowScale);
      hold += (this.surpriseLikelihood * this.surpriseScale);
      hold += (this.angerLikelihood * this.angerScale);
      return this.minVal + (((hold + scaledMax) / (scaledMax * 2)) * rangeWidth);
    }
    return fixedPoint;
  }
  printString() {
    this.midpoint = this.translator()();
    const cheapRound = x => Math.round(x*100000) / 100000;
    const rangeMin = cheapRound(Math.max(this.midpoint - (this.radius / 2), this.minVal));
    const rangeMax = cheapRound(Math.min(this.midpoint + (this.radius / 2), this.maxVal));
    if(this.name === 'genre') {
      const genreSimple = Math.round(this.midpoint) === 1 ? 'happy' : 'sad';
      return `&seed_${this.name}s=${genreSimple}`;
    }
    if(this.name === 'mode') return `&${this.name}=${Math.round(this.midpoint)}`;
    else return `&min_${this.name}=${rangeMin}&max_${this.name}=${rangeMax}`;
  }
}

const genreUrlObj = new SpotifyUrlObject('genre',2,-2,0,0)
const energyUrlObj = new SpotifyUrlObject('energy',2,-1.5,0,1);
const valenceUrlObj = new SpotifyUrlObject('valence',2,-2,1,-1);
const danceabilityUrlObj = new SpotifyUrlObject('danceability',1,-1,1,0);
const acousticnessUrlObj = new SpotifyUrlObject('acousticness',0,1,0,-1);
const instrumentalnessUrlObj = new SpotifyUrlObject('instrumentalness',-1,0,-1,-1);
const popularityUrlObj = new SpotifyUrlObject('popularity',1,0,0,-1);
const modeUrlObj = new SpotifyUrlObject('mode',2,-2,0,0);
const loudnessUrlObj = new SpotifyUrlObject('loudness',0,-1,0,2,-60,1,15);
const tempoUrlObj = new SpotifyUrlObject('tempo',1,-2,-1,2,50,210,60);

const fullUrlObject = [genreUrlObj, energyUrlObj, valenceUrlObj, danceabilityUrlObj, acousticnessUrlObj, instrumentalnessUrlObj, popularityUrlObj, modeUrlObj, loudnessUrlObj, tempoUrlObj]

const convertGoogleCloudVisionObjToSpotifyString = selfieObj => {
  const failsTest = (arr, keyword) => {
    const hold = arr.filter(el => el === keyword);
    if(hold.length === arr.length) return 'error';
    else return 'good to go';
  }
  if(selfieObj.blurredLikelihood === 'VERY_LIKELY' ||
    (failsTest([selfieObj.joyLikelihood, selfieObj.sorrowLikelihood, selfieObj.surpriseLikelihood, selfieObj.angerLikelihood], 'UNKNOWN') === 'error') ||
    (failsTest([selfieObj.joyLikelihood, selfieObj.sorrowLikelihood, selfieObj.surpriseLikelihood, selfieObj.angerLikelihood], 'VERY_UNLIKELY') === 'error')) {
    console.log('We need to throw an error here on the front end: "Image quality insufficient. Please try a different selfie."');
    return 'error'
  }
  const specificPhotoObject = fullUrlObject.map(el => el.addEmotionKeys(selfieObj));
  const urlString = specificPhotoObject.map((el) => el.printString()).join('');
  return urlString;
}

module.exports = convertGoogleCloudVisionObjToSpotifyString;
