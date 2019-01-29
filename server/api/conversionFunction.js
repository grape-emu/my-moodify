/* eslint-disable guard-for-in */
const convertToNums = selfieObj => {
  let newObj = {};
  for (let key in selfieObj) {
    if(selfieObj[key] === 'VERY_UNLIKELY') newObj[key] = -2;
    if(selfieObj[key] === 'UNLIKELY') newObj[key] = -1;
    if(selfieObj[key] === 'LIKELY') newObj[key] = 1;
    if(selfieObj[key] === 'VERY_LIKELY') newObj[key] = 2;
    if(selfieObj[key] === 'POSSIBLE' || selfieObj[key] === 'UNKNOWN') newObj[key] = 0;
  }
  return newObj;
}

const toRange = (center, width, rangeMin, rangeMax) => {
  const cheapRound = x => Math.round(x*10000) / 10000;
  return [
    cheapRound(Math.max(center - width / 2, rangeMin)),
    cheapRound(Math.min(center + width / 2, rangeMax))
  ]
}

const translator = (rangeMin, rangeMax, joyScale, sorrowScale, surpriseScale, angerScale) => {
  let rangeWidth = rangeMax - rangeMin;
  let scaledMax = 0;
  if (joyScale !== 0) scaledMax += Math.abs(joyScale);
  if (sorrowScale !== 0) scaledMax += Math.abs(sorrowScale);
  if (surpriseScale !== 0) scaledMax += Math.abs(surpriseScale);
  if (angerScale !== 0) scaledMax += Math.abs(angerScale);
  scaledMax *= 2
  let out = (joyVal, sorrowVal, surpriseVal, angerVal) => {
    let hold = 0;
    hold += (joyVal * joyScale);
    hold += (sorrowVal * sorrowScale);
    hold += (surpriseVal * surpriseScale);
    hold += (angerVal * angerScale);
    return rangeMin + (((hold + scaledMax) / (scaledMax * 2)) * rangeWidth);
  }
  return out
}

const newSelfie = obj => {
  const usefulObj = convertToNums(obj)
  if(usefulObj.blurredLikelihood === 2 || (usefulObj.joyLikelihood === 0 && usefulObj.sorrowLikelihood === 0 && usefulObj.surpriseLikelihood === 0 && usefulObj.angerLikelihood === 0)) {
    console.log('We need to throw an error here: "Image quality insufficient. Please try a different selfie."');
    return 'error'
  }
}

const energyFunc = obj => {
  const usefulObj = convertToNums(obj)
  let energyMid = translator(0, 1, 2, -1.5, 0, 1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(energyMid, 0.2, 0, 1);
  if(min === 0) return `&max_energy=${max}`;
  if(max === 1) return `&min_energy=${min}`;
  else return `&min_energy=${min}&max_energy=${max}`
}

const valenceFunc = obj => {
  const usefulObj = convertToNums(obj)
  let valenceMid = translator(0, 1, 2, -2, 1, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(valenceMid, 0.2, 0, 1);
  if(min === 0) return `&max_valence=${max}`;
  if(max === 1) return `&min_valence=${min}`;
  else return `&min_valence=${min}&max_valence=${max}`;
}

const danceabilityFunc = obj => {
  const usefulObj = convertToNums(obj)
  let danceabilityMid = translator(0, 1, 1, -1, 1, 0)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(danceabilityMid, 0.2, 0, 1);
  if(min === 0) return `&max_danceability=${max}`;
  if(max === 1) return `&min_danceability=${min}`;
  else return `&min_danceability=${min}&max_danceability=${max}`;
}

const acousticnessFunc = obj => {
  const usefulObj = convertToNums(obj)
  let acousticnessMid = translator(0, 1, 0, 1, 0, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(acousticnessMid, 0.2, 0, 1);
  if(min === 0) return `&max_acousticness=${max}`;
  if(max === 1) return `&min_acousticness=${min}`;
  else return `&min_acousticness=${min}&max_acousticness=${max}`;
}

const instrumentalnessFunc = obj => {
  const usefulObj = convertToNums(obj)
  let instrumentalnessMid = translator(0, 1, -1, 0, -1, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(instrumentalnessMid, 0.2, 0, 1);
  if(min === 0) return `&max_instrumentalness=${max}`;
  if(max === 1) return `&min_instrumentalness=${min}`;
  else return `&min_instrumentalness=${min}&max_instrumentalness=${max}`;
}

const popularityFunc = obj => {
  const usefulObj = convertToNums(obj)
  let popularityMid = translator(0, 1, 1, 0, 0, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(popularityMid, 0.2, 0, 1);
  if(min === 0) return `&max_popularity=${max}`;
  if(max === 1) return `&min_popularity=${min}`;
  else return `&min_popularity=${min}&max_popularity=${max}`;
}

const modeFunc = obj => {
  const usefulObj = convertToNums(obj)
  let modeMid = translator(0, 1, 2, -2, 0, 0)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  return `&mode=${Math.round(modeMid)}`;
}

// &min_loudness=-60&max_loudness=1 (-60,1,0,-1,0,2)
const loudnessFunc = obj => {
  const usefulObj = convertToNums(obj)
  let loudnessMid = translator(0, 1, 1, 0, 0, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(loudnessMid, 0.2, 0, 1);
  if(min === 0) return `&max_loudness=${max}`;
  if(max === 1) return `&min_loudness=${min}`;
  else return `&min_loudness=${min}&max_loudness=${max}`;
}

// &min_tempo=50&max_tempo=350 (50,350,1,-2,-1,2)
const tempoFunc = obj => {
  const usefulObj = convertToNums(obj)
  let tempoMid = translator(0, 1, 1, 0, 0, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(tempoMid, 0.2, 0, 1);
  if(min === 0) return `&max_tempo=${max}`;
  if(max === 1) return `&min_tempo=${min}`;
  else return `&min_tempo=${min}&max_tempo=${max}`;
}

const genreFunc = obj => {
  const usefulObj = convertToNums(obj)
  // let popularityMid = translator(0, 1, 1, 0, 0, -1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  // let [min, max] = toRange(popularityMid, 0.2, 0, 1);
  // if(min === 0) return `&max_popularity=${max}`;
  // if(max === 1) return `&min_popularity=${min}`;
  // else return `&min_popularity=${min}&max_popularity=${max}`;
}

const bigConversionFunc = obj => {
  if(newSelfie(obj) === 'error') return ''
  // if reject cases, throw alert on front end
  const sameForAll = 'max_liveness=0.75&min_speechiness=0.66';
  return energyFunc(obj)
  .concat(valenceFunc(obj))
  .concat(danceabilityFunc(obj))
  .concat(acousticnessFunc(obj))
  .concat(instrumentalnessFunc(obj))
  .concat(popularityFunc(obj))
  .concat(modeFunc(obj))
  .concat(sameForAll);
}

module.exports = bigConversionFunc;
