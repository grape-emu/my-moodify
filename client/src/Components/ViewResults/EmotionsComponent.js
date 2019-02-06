import React from 'react';

function messageConverter(arr) {
  const arrLikely = ['VERY_LIKELY', 'LIKELY', 'POSSIBLE'];
  const strUnlikely = 'VERY_UNLIKELY';
  let mood = '';
  let moodNotIdentified = false;
  let feedback = '';

  if (
    arrLikely.includes(arr[0]) &&
    arr[1] === strUnlikely &&
    arr[2] === strUnlikely
  ) {
    mood = 'in a happy mood';
  } else if (
    arrLikely.includes(arr[1]) &&
    arr[0] === strUnlikely &&
    arr[2] === strUnlikely
  ) {
    mood = 'a bit upset';
  } else if (
    arrLikely.includes(arr[2]) &&
    arr[0] === strUnlikely &&
    arr[1] === strUnlikely
  ) {
    mood = 'sad';
  } else {
    moodNotIdentified = true;
  }
  feedback = `You seem to be ${mood} today.`;
  console.log(moodNotIdentified);
  return moodNotIdentified ? '' : feedback;
}

class Message extends React.Component {
  render() {
    const {
      joyLikelihood,
      angerLikelihood,
      sorrowLikelihood,
    } = this.props.feedback;

    return (
      <p>
        {messageConverter([joyLikelihood, angerLikelihood, sorrowLikelihood])}
      </p>
    );
  }
}

export default Message;
