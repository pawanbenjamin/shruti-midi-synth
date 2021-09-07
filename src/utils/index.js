export function createFreqTable(rootKey, scale, rootFreq) {
  //if root key is 58 (D)

  //createFrequency Table to use for note generation
  const freqTable = {};

  let copy = rootKey;
  let scaleDegree = 0;
  let oct = 1;

  while (copy <= 108) {
    let ratio = scale[scaleDegree % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);

    freqTable[copy] = (rootFreq * numer * oct) / denom;

    copy++;
    scaleDegree++;
    if (copy % 12 === 0) {
      oct = oct * 2;
    }
  }

  let copy2 = rootKey - 1;
  let scaleDeg2 = scale.length - 1;
  let oct2 = 1 / 2;

  while (copy2 >= 21) {
    let ratio = scale[scaleDeg2 % 12];

    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);

    freqTable[copy2] = (rootFreq * numer * oct2) / denom;

    copy2--;
    if (scaleDeg2 === 0) {
      scaleDeg2 = scale.length - 1;
    } else {
      scaleDeg2--;
    }
    if (copy2 % 12 === 0) {
      oct = oct / 2;
    }
  }

  return freqTable;
}
