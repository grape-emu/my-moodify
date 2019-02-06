module.exports = urlString => {
  /* this helper function separates the tags we want from out of the url and
  converts them to key-value pairs on a new object */
  const convert = str => {
    let hold = str.split('&');
    let pairs = hold.map(pair => pair.split('='));
    let holdObj = {};
    pairs.map(pair => {
      holdObj[pair[0]] = pair[1];
    });
    return holdObj;
  };
  // this main function interprets the values of each key into nice words for our user to enjoy
  const prosify = obj => {
    obj.output = 'Spotify has built you a playlist of songs ';

    if (obj.mode) {
      obj.output +=
        Number(obj.mode) === 1 ? 'in a major key ' : 'in a minor key ';
    }

    if (!obj.max_valence) obj.output += 'with a very positive mood ';
    if (!obj.min_valence) obj.output += 'with a very negative mood ';
    if (Number(obj.max_valence) >= 0.7) {
      obj.output += 'with a comparatively positive mood ';
    }
    if (Number(obj.max_valence) < 0.7) {
      obj.output += 'with a comparatively negative mood ';
    }

    if (!obj.max_energy || obj.max_energy >= 0.75) {
      obj.output += 'and high energy';
    }
    if (!obj.min_energy || obj.min_energy <= 0.25) {
      obj.output += 'and low energy';
    }
    if (obj.max_energy < 0.75 && obj.min_energy > 0.25) {
      obj.output += 'and medium energy';
    }
    return obj.output;
  };
  return prosify(convert(urlString));
};
