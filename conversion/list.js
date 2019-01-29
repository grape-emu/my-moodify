(x,y) where

// translate each google axis to a score on each spotify axis and add them
// for each level of sorrow, add/subtract this much from the axis


function lagoda(val,min,max) {
  if(val < min) return min
  if(val > max) return max
  else return val
}

// treat all thing as 0-1, write func converting relevant one of those to whatever


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
