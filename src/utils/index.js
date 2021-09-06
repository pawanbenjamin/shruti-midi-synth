// includeing 21 to including 108

// root key is midi key number, freq is HZ of that note, scale is the proportions
// export const makeFreqTable = (rootKey, rootFreq, scale) => {
//   let freqTable = {};

//     freqTable[rootKey] = rootFreq

//   for (let ratio of scale) {
//     let [numer, denom] = ratio.split("/");
//     numer = parseInt(numer);
//     denom = parseInt(denom);
//   }
// };

// function parseNoteValues(note, rootKey, scale, rootFreq) {
//   //if root key is 58 (D)
//   //the frequency for 58:rootFreq
//   //createFrequency Table to use for note generation
//   let copy = rootKey;
//   let scaleDegree = 0;
//   let oct = 1;
//   let idx = 0 % 12;
//   const freqTable = {
//     rootKey: rootFreq,
//   };
//   while (copy < 128) {
//     let ratio = scale[scaleDegree % 12];
//     let [numer, denom] = ratio.split("/");
//     numer = parseInt(numer);
//     denom = parseInt(denom);
//     console.log({
//       numer,
//       denom,
//     });
//     //   const [numerator, denominator] = scale[scaleDegree % 11].split("/");
//     //   freqTable[copy] = (rootFreq * +numerator) / +denominator;
//     copy++;
//     scaleDegree++;
//     idx++;
//     if (idx === 0) {
//       oct++;
//     }
//   }
//   let copy2 = rootFreq;
//   let scaleDeg2 = 0;
//   let idx2 = 0 % 12;
//   while (copy2 >= 0) {
//     let ratio = scale[scaleDeg2 % 12];
//     let [numer, denom] = ratio.split("/");
//     numer = parseInt(numer);
//     denom = parseInt(denom);
//     console.log({
//       numer,
//       denom,
//     });
//     //   const [numerator, denominator] = scale[scaleDegree % 11].split("/");
//     //   freqTable[copy] = (rootFreq * +numerator) / +denominator;
//     copy2--;
//     scaleDeg2--;
//     idx--;
//     if (idx === 0) {
//       oct--;
//     }
//   }
//   console.log(scale);
// }

export function parseNoteValues(rootKey, scale, rootFreq) {
  //if root key is 58 (D)
  //the frequency for 58:rootFreq
  //createFrequency Table to use for note generation
  let copy = rootKey;
  let scaleDegree = 0;
  let oct = 1;
  let idx = 0 % 12;
  const freqTable = {
    rootKey: rootFreq,
  };
  while (copy <= 108) {
    let ratio = scale[scaleDegree % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);
    console.log({
      numer,
      denom,
    });

    freqTable[copy] = (rootFreq * numer) / denom;

    copy++;
    scaleDegree++;
    idx++;
    if (idx === 0) {
      oct++;
    }
  }
  let copy2 = rootFreq;
  let scaleDeg2 = 0;
  let idx2 = 0 % 12;
  while (copy2 >= 21) {
    let ratio = scale[scaleDeg2 % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);
    console.log({
      numer,
      denom,
    });
    //   const [numerator, denominator] = scale[scaleDegree % 11].split("/");
    //   freqTable[copy] = (rootFreq * +numerator) / +denominator;
    copy2--;
    scaleDeg2--;
    idx2--;
    if (idx === 0) {
      oct--;
    }
  }
  console.log(scale);
}
