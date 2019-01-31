// REPLACED BY CONVERSION.JS -- COMMITTED ONCE FOR REFERENCE



// /* eslint-disable guard-for-in */
// const convertToNums = selfieObj => {
//   let newObj = {};
//   for (let key in selfieObj) {
//     if(selfieObj[key] === 'VERY_LIKELY') newObj[key] = 2;
//     if(selfieObj[key] === 'LIKELY') newObj[key] = 1;
//     if(selfieObj[key] === 'UNLIKELY') newObj[key] = -1;
//     if(selfieObj[key] === 'VERY_UNLIKELY') newObj[key] = -2;
//     if(selfieObj[key] === 'POSSIBLE' || selfieObj[key] === 'UNKNOWN') newObj[key] = 0;
//   }
//   return newObj;
// }

// const toRange = (center, width, rangeMin, rangeMax) => {
//   const cheapRound = x => Math.round(x*10000) / 10000;
//   return [
//     cheapRound(Math.max(center - (width / 2), rangeMin)),
//     cheapRound(Math.min(center + (width / 2), rangeMax))
//   ]
// }

// const translator = (rangeMin, rangeMax, joyScale, sorrowScale, surpriseScale, angerScale) => {
//   let rangeWidth = rangeMax - rangeMin;
//   let scaledMax = 0;
//   if (joyScale !== 0) scaledMax += Math.abs(joyScale);
//   if (sorrowScale !== 0) scaledMax += Math.abs(sorrowScale);
//   if (surpriseScale !== 0) scaledMax += Math.abs(surpriseScale);
//   if (angerScale !== 0) scaledMax += Math.abs(angerScale);
//   scaledMax *= 2;
//   let output = (joyVal, sorrowVal, surpriseVal, angerVal) => {
//     let hold = 0;
//     hold += (joyVal * joyScale);
//     hold += (sorrowVal * sorrowScale);
//     hold += (surpriseVal * surpriseScale);
//     hold += (angerVal * angerScale);
//     return rangeMin + (((hold + scaledMax) / (scaledMax * 2)) * rangeWidth);
//   }
//   return output
// }

// const newSelfie = obj => {
//   const failsTest = (arr, keyword) => {
//     const hold = arr.filter(el => el === keyword);
//     if(hold.length === arr.length) return 'error';
//     else return 'good to go';
//   }
//   if(obj.blurredLikelihood === 'VERY_LIKELY' ||
//     (failsTest([obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood], 'UNKNOWN') === 'error') ||
//     (failsTest([obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood], 'VERY_UNLIKELY') === 'error')) {
//     console.log('We need to throw an error here on the front end: "Image quality insufficient. Please try a different selfie."');
//     return 'error'
//   }
// }

// const genreFunc = obj => {
//   let genreMid = translator(0, 1, 2, -2, 0, 0)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   const genreSimple = Math.round(genreMid) === 1 ? 'happy' : 'sad';
//   return `?seed_genre=${genreSimple}`;
// }

// const energyFunc = obj => {
//   let energyMid = translator(0, 1, 2, -1.5, 0, 1)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(energyMid, 0.2, 0, 1);
//   return `&min_energy=${min}&max_energy=${max}`
// }

// const valenceFunc = obj => {
//   let valenceMid = translator(0, 1, 2, -2, 1, -1)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(valenceMid, 0.2, 0, 1);
//   return `&min_valence=${min}&max_valence=${max}`;
// }

// const danceabilityFunc = obj => {
//   let danceabilityMid = translator(0, 1, 1, -1, 1, 0)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(danceabilityMid, 0.2, 0, 1);
//   return `&min_danceability=${min}&max_danceability=${max}`;
// }

// const acousticnessFunc = obj => {
//   let acousticnessMid = translator(0, 1, 0, 1, 0, -1)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(acousticnessMid, 0.2, 0, 1);
//   return `&min_acousticness=${min}&max_acousticness=${max}`;
// }

// const instrumentalnessFunc = obj => {
//   let instrumentalnessMid = translator(0, 1, -1, 0, -1, -1)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(instrumentalnessMid, 0.2, 0, 1);
//   return `&min_instrumentalness=${min}&max_instrumentalness=${max}`;
// }

// const popularityFunc = obj => {
//   let popularityMid = translator(0, 1, 1, 0, 0, -1)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(popularityMid, 0.2, 0, 1);
//   return `&min_popularity=${min}&max_popularity=${max}`;
// }

// const modeFunc = obj => {
//   let modeMid = translator(0, 1, 2, -2, 0, 0)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   return `&mode=${Math.round(modeMid)}`;
// }

// const loudnessFunc = obj => {
//   let loudnessMid = translator(-60,1,0,-1,0,2)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(loudnessMid, 15, -60, 1);
//   return `&min_loudness=${min}&max_loudness=${max}`;
// }

// const tempoFunc = obj => {
//   let tempoMid = translator(50,210,1,-2,-1,2)(obj.joyLikelihood, obj.sorrowLikelihood, obj.surpriseLikelihood, obj.angerLikelihood)
//   let [min, max] = toRange(tempoMid, 60, 50, 210);
//   return `&min_tempo=${min}&max_tempo=${max}`;
// }

// const bigConversionFunc = obj => {
//   if(newSelfie(obj) === 'error') return '';
//   const usefulObj = convertToNums(obj);
//   // if reject cases, throw alert on front end
//   // if(newSelfie.improveMyMood) newSelfie.joyLikelihood += 1.5;
//   const sameForAll = '&max_liveness=0.75&max_speechiness=0.66'; // to eliminate live tracks, speeches
//   return genreFunc(usefulObj)
//   .concat(energyFunc(usefulObj))
//   .concat(valenceFunc(usefulObj))
//   .concat(danceabilityFunc(usefulObj))
//   .concat(acousticnessFunc(usefulObj))
//   .concat(instrumentalnessFunc(usefulObj))
//   .concat(popularityFunc(usefulObj))
//   .concat(modeFunc(usefulObj))
//   .concat(loudnessFunc(usefulObj))
//   .concat(tempoFunc(usefulObj))
//   .concat(sameForAll);
// }

// module.exports = bigConversionFunc;
