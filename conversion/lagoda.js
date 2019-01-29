const sentimentTranslator = {
  VERY_LIKELY: 2,
  LIKELY: 1,
  UNLIKELY: -1,
  VERY_UNLIKELY: -2,
  POSSIBLE: 0,
  UNKNOWN: 0
}

const toRange = (center, width, range_min, range_max) => {
  return [
      Math.max(center - width / 2, range_min),
      Math.min(center + width / 2, range_max)
    ]
}

const sentimentLevel = (sentiment, scale=1) => {
  return scale * sentimentTranslator[sentiment]
}

const translator = (range_min, range_max, joy_scale, sorrow_scale, surprise_scale, anger_scale) => {
  let range_width = range_max - range_min;
  let scaled_max = 0;
  if (joy_scale != 0) scaled_max += Math.abs(joy_scale);
  if (sorrow_scale != 0) scaled_max += Math.abs(sorrow_scale);
  if (surprise_scale != 0) scaled_max += Math.abs(surprise_scale);
  if (anger_scale != 0) scaled_max += Math.abs(anger_scale);
  scaled_max *= 2   // to account for half being negative
  let out = (j, so, su, a) => {
    let collect = 0;
    collect += sentimentLevel(j, joy_scale);
    collect += sentimentLevel(so, sorrow_scale);
    collect += sentimentLevel(su, surprise_scale);
    collect += sentimentLevel(a, anger_scale);

    let collectAbsoluteValue = collect - (-1 * scaled_max);
    let collectPercent = collectAbsoluteValue / (scaled_max * 2);
    let collectProportionFullSize = collectPercent * range_width;
    let collectMovedBackToItsProperPlace = collectProportionFullSize + range_min;
    return collectMovedBackToItsProperPlace;
    // return range_min + (((collect + scaled_max) / (scaled_max * 2)) * range_width);
  }
  return out
}


const energyFunc = (joy,sorrow,surprise,anger) => {
  let energy_mid = translator(0, 1, 2, -1, 0, 1)(joy, sorrow, surprise, anger);
  let [mi, ma] = toRange(energy_mid, 0.2, 0, 1);
  return `&energy_min=${mi}&energy_max=${ma}`
}

// for boolean, round

console.log(energyFunc('VERY_LIKELY', 'VERY_UNLIKELY', 'POSSIBLE', 'VERY_LIKELY'))

console.log(energyFunc('VERY_UNLIKELY', 'VERY_LIKELY', 'POSSIBLE', 'VERY_UNLIKELY'))

console.log(energyFunc('LIKELY', 'VERY_LIKELY', 'POSSIBLE', 'LIKELY'))
