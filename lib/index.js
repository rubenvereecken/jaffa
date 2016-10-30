import fpAudio from './audio';
import UserAgentFeature from './features/useragent';
import LanguageFeature from './features/language';
import features from './features';
import { byteArrayToString } from './bit';
var fpjs = window.Fingerprint2;

// fpAudio(function() {
//   console.log(arguments)
// })
console.log(fpjs);

new Fingerprint2().get((result, components) => {
  console.log(result);
  console.log(components);
})

let totalSize = features.reduce((size, f) => f.size + size, 0);
let totalArray = new Uint8Array(totalSize);
let totalView = new DataView(totalArray.buffer);
console.log(totalSize);

// let offset = 0;
let featureOffset = 0;
for (let feature of features) {
  feature.construct();
  featureOffset += feature.size;

  for (let i = 0; i < feature.size; i++) {
    let offset = totalSize - featureOffset + i;
    totalView.setUint8(offset, feature.byteArray[i]);
  }
}

console.log(totalArray);

let totalBase64 = btoa(byteArrayToString(totalArray));
console.log(totalBase64);
