import React from 'react';

function messageConverter(arr) {
  const strLikely = 'VERY_LIKELY';
  const strUnlikely = 'VERY_UNLIKELY';
  let mood = '';

  if (
    arr[0] === strLikely &&
    arr[1] === strUnlikely &&
    arr[2] === strUnlikely
  ) {
    console.log('in a happy mood', arr[0]);
    mood = 'in a happy mood';
  } else if (
    arr[1] === strLikely &&
    arr[0] === strUnlikely &&
    arr[2] === strUnlikely
  ) {
    mood = 'a bit upset';
  } else if (
    arr[2] === strLikely &&
    arr[0] === strUnlikely &&
    arr[1] === strUnlikely
  ) {
    mood = 'sad';
  } else {
    feedback = 'Here is a playlist that matches your mood:';
  }
  let feedback = `You seem to be ${mood} today. Here is your playlist:`;
  return feedback;
}

class Message extends React.Component {
  render() {
    const { joyLikelihood, angerLikelihood, sorrowLikelihood } = this.props;

    return (
      <p>
        {messageConverter([joyLikelihood, angerLikelihood, sorrowLikelihood])}
      </p>
    );
  }
}

export default Message;
