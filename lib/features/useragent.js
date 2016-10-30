import { javaHash } from '../hash';
import { intToByteArray, byteArrayToString } from '../bit';
import Base64 from '../base64';

class UserAgentFeature {
  constructor() {
    this.ua = window.navigator.userAgent;
    this.size = 4;
  }

  construct() {
    this.hash = javaHash(window.navigator.userAgent);
    this.byteArray = intToByteArray(this.hash);
    this.byteString = byteArrayToString(this.byteArray);
    // this.b64 = Base64.encode(this.hash);
    this.base64 = btoa(this.byteString);

    return true;
  }
}

export default new UserAgentFeature();
