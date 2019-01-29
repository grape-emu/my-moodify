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

const energyFunc = obj => {
  const usefulObj = convertToNums(obj)
  let energyMid = translator(0, 1, 2, -1.5, 0, 1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(energyMid, 0.2, 0, 1);
  if(min === 0) return `&energyMax=${max}`;
  if(max === 1) return `&energyMin=${min}`;
  else return `&energyMin=${min}&energyMax=${max}`
}

const valenceFunc = obj => {
  const usefulObj = convertToNums(obj)
  let valenceMid = translator(0, 1, 2, -2, 1, 1)(usefulObj.joyLikelihood, usefulObj.sorrowLikelihood, usefulObj.surpriseLikelihood, usefulObj.angerLikelihood)
  let [min, max] = toRange(valenceMid, 0.2, 0, 1);
  if(min === 0) return `&valenceMax=${max}`;
  if(max === 1) return `&valenceMin=${min}`;
  else return `&valenceMin=${min}&valenceMax=${max}`;
}


const bigConversionFunc = obj => {
  return energyFunc(obj).concat(valenceFunc(obj));
}

module.exports = bigConversionFunc;
