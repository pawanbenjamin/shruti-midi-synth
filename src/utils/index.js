export function createFreqTable(rootKey, scale, rootFreq) {
  //if root key is 58 (D)

  //createFrequency Table to use for note generation
  const freqTable = {};

  let copy = rootKey;
  let scaleDegree = 0;
  let oct = 1;

  let counter = 1;

  while (copy <= 108) {
    let ratio = scale[scaleDegree % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);

    freqTable[copy] = (rootFreq * numer * oct) / denom;

    copy++;
    scaleDegree++;
    if (counter === 12) {
      counter = 0;
      oct *= 2;
    }
    counter++;
  }

  let copy2 = rootKey - 1;
  let scaleDegree2 = scale.length - 1;
  let oct2 = 1 / 2;

  while (copy2 >= 21) {
    let ratio = scale[scaleDegree2 % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);

    freqTable[copy2] = (rootFreq * numer * oct2) / denom;

    copy2--;
    if (scaleDegree2 === 0) {
      scaleDegree2 = scale.length;
      oct2 = oct2 / 2;
    }
    scaleDegree2--;
  }

  return freqTable;
}
