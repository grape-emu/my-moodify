const emotionsAnalysis = urlString => {
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
  // these are the same lists of genre seeds that we used in the conversion function
  const joyGenreSeeds = [
    'happy',
    'disney',
    'hip-hop',
    'jazz',
    'new-release',
    'pop',
    'power-pop',
    'r-n-b',
    'rainy-day',
    'rock',
    'rock-n-roll',
    'summer',
  ];
  const sorrowGenreSeeds = [
    'sad',
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

  // this main function interprets the values of each key into nice words for our user to enjoy
  const emotePhoto = obj => {
    let emotionHold = [];
    /* this helper function works backwords from the genres chosen to assess the
    dominant emotions detected in the photo (tested just below for each emotion) */
    const genreTest = (seedArr, emotionName) => {
      const urlMatches = seedArr.filter(seed => obj.seed_genres.includes(seed));
      if (urlMatches.length >= 1) emotionHold = [...emotionHold, emotionName];
      return emotionHold;
    };
    genreTest(joyGenreSeeds, 'happy');
    genreTest(sorrowGenreSeeds, 'sad');
    genreTest(surpriseGenreSeeds, 'surprised');
    genreTest(angerGenreSeeds, 'angry');

    obj.output = 'You seem to be ';
    obj.output += emotionHold.join(' and ');
    return (obj.output += ' today');
  };
  return emotePhoto(convert(urlString));
};

export default emotionsAnalysis;
