// translate each google axis to a score on each spotify axis and add them
// for each level of sorrow, add/subtract this much from the axis

function lagoda(val,min,max) {
  if(val < min) return min;
  if(val > max) return max;
  else return val;
}
// treat all things as 0-1, write func converting relevant one of those to whatever


const convertToNums = selfieObj => {
  let newObj = {};
  for (let key in selfieObj) {
    if(selfieObj[key] === 'VERY_UNLIKELY') newObj[key] = -2;
    if(selfieObj[key] === 'UNLIKELY') newObj[key] = -1;
    if(selfieObj[key] === 'LIKELY') newObj[key] = 1;
    if(selfieObj[key] === 'VERY_LIKELY') newObj[key] = 2;
  }
  return newObj;
}

const sample = {
  joyLikelihood: 'VERY_LIKELY',
  sorrowLikelihood: 'UNLIKELY',
  angerLikelihood: 'LIKELY',
  surpriseLikelihood: 'VERY_UNLIKELY'
  }

  const energyLevel = (sentiment, scale=1) => {
    return scale * energyTranslator[sentiment]
  }

  const energyFunc = sentimentObj => {
    const total = sentimentObj.joyLikelihood - sentimentObj.sorrowLikelihood + sentimentObj.angerLikelihood;
    if(total >= 0) return '&min_energy=0.5'
    if(total <= -2) return '&max_energy=0.5'
  }

  console.log(energyFunc(convertToNums(sample)));


joyLikelihood:
sorrowLikelihood:
angerLikelihood:
surpriseLikelihood:

enum(Likelihood):
  UNKNOWN
  VERY_UNLIKELY
  UNLIKELY
  POSSIBLE
  LIKELY
  VERY_LIKELY
