const soFar = ['joyLikelihood: VERY_UNLIKELY',
'sorrowLikelihood: VERY_UNLIKELY', '********', 'joyLikelihood: UNLIKELY',
'sorrowLikelihood: VERY_UNLIKELY', '********', 'joyLikelihood: POSSIBLE',
'sorrowLikelihood: VERY_UNLIKELY', '********', 'joyLikelihood: LIKELY',
'sorrowLikelihood: VERY_UNLIKELY', '********', 'joyLikelihood: VERY_LIKELY',
'sorrowLikelihood: VERY_UNLIKELY', '********', 'joyLikelihood: VERY_UNLIKELY',
'sorrowLikelihood: UNLIKELY', '********', 'joyLikelihood: UNLIKELY',
'sorrowLikelihood: UNLIKELY', '********', 'joyLikelihood: POSSIBLE',
'sorrowLikelihood: UNLIKELY', '********', 'joyLikelihood: LIKELY',
'sorrowLikelihood: UNLIKELY', '********', 'joyLikelihood: VERY_LIKELY',
'sorrowLikelihood: UNLIKELY', '********', 'joyLikelihood: VERY_UNLIKELY',
'sorrowLikelihood: POSSIBLE', '********', 'joyLikelihood: UNLIKELY',
'sorrowLikelihood: POSSIBLE', '********', 'joyLikelihood: POSSIBLE',
'sorrowLikelihood: POSSIBLE', '********', 'joyLikelihood: LIKELY',
'sorrowLikelihood: POSSIBLE', '********', 'joyLikelihood: VERY_LIKELY',
'sorrowLikelihood: POSSIBLE', '********', 'joyLikelihood: VERY_UNLIKELY',
'sorrowLikelihood: LIKELY', '********', 'joyLikelihood: UNLIKELY',
'sorrowLikelihood: LIKELY', '********', 'joyLikelihood: POSSIBLE',
'sorrowLikelihood: LIKELY', '********', 'joyLikelihood: LIKELY',
'sorrowLikelihood: LIKELY', '********', 'joyLikelihood: VERY_LIKELY',
'sorrowLikelihood: LIKELY', '********', 'joyLikelihood: VERY_UNLIKELY',
'sorrowLikelihood: VERY_LIKELY', '********', 'joyLikelihood: UNLIKELY',
'sorrowLikelihood: VERY_LIKELY', '********', 'joyLikelihood: POSSIBLE',
'sorrowLikelihood: VERY_LIKELY', '********', 'joyLikelihood: LIKELY',
'sorrowLikelihood: VERY_LIKELY', '********', 'joyLikelihood: VERY_LIKELY',
'sorrowLikelihood: VERY_LIKELY', 'end'];


const anger = ['angerLikelihood: VERY_UNLIKELY', 'angerLikelihood: UNLIKELY', 'angerLikelihood: POSSIBLE', 'angerLikelihood: LIKELY', 'angerLikelihood: VERY_LIKELY'];

const surprise = ['surpriseLikelihood: VERY_UNLIKELY', 'surpriseLikelihood: UNLIKELY', 'surpriseLikelihood: POSSIBLE', 'surpriseLikelihood: LIKELY', 'surpriseLikelihood: VERY_LIKELY'];

const unknown = ['joyLikelihood: UNKNOWN', 'sorrowLikelihood: UNKNOWN', 'angerLikelihood: UNKNOWN', 'surpriseLikelihood: UNKNOWN'];

const variations = (output, input) => {
  const bigOut = []
  let hold = output.slice();
  for (let i = 0; i < input.length; i++) {
    hold.map(el => {
      if(el === '********') {
        el = input[i];
      }
      return el;
    })
    bigOut.concat(hold);
    hold = output.slice();
  }
  return bigOut;
}

console.log(variations(soFar,anger))





// const joy = ['joyLikelihood: VERY_LIKELY', 'joyLikelihood: LIKELY'];
// const sorrow = ['sorrowLikelihood: VERY_LIKELY', 'sorrowLikelihood: LIKELY'];
// const surprise = ['surpriseLikelihood: VERY_LIKELY', 'surpriseLikelihood: LIKELY'];
// const anger = ['angerLikelihood: VERY_LIKELY', 'angerLikelihood: LIKELY'];

// const printLazy = (a,b,c,d) => {
//   console.log(`${a[0]},\n ${b[0]},\n ${c[0]},\n ${d[0]}\n\n`);
//   console.log(`${a[0]},\n ${b[1]},\n ${c[0]},\n ${d[0]}\n\n`);
//   console.log(`${a[0]},\n ${b[0]},\n ${c[1]},\n ${d[0]}\n\n`);
//   console.log(`${a[0]},\n ${b[0]},\n ${c[0]},\n ${d[1]}\n\n`);
//   console.log(`${a[0]},\n ${b[1]},\n ${c[1]},\n ${d[0]}\n\n`);
//   console.log(`${a[0]},\n ${b[1]},\n ${c[0]},\n ${d[1]}\n\n`);
//   console.log(`${a[0]},\n ${b[1]},\n ${c[1]},\n ${d[1]}\n\n`);
//   console.log(`${a[1]},\n ${b[0]},\n ${c[0]},\n ${d[0]}\n\n`);
//   console.log(`${a[1]},\n ${b[1]},\n ${c[0]},\n ${d[0]}\n\n`);
//   console.log(`${a[1]},\n ${b[0]},\n ${c[1]},\n ${d[0]}\n\n`);
//   console.log(`${a[1]},\n ${b[0]},\n ${c[0]},\n ${d[1]}\n\n`);
//   console.log(`${a[1]},\n ${b[1]},\n ${c[1]},\n ${d[0]}\n\n`);
//   console.log(`${a[1]},\n ${b[1]},\n ${c[0]},\n ${d[1]}\n\n`);
//   console.log(`${a[1]},\n ${b[1]},\n ${c[1]},\n ${d[1]}\n\n`);
// }

// printLazy(joy,sorrow,surprise,anger);
