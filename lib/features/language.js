import { javaHash } from '../hash';
import { intToByteArray, byteArrayToString } from '../bit';
import Base64 from '../base64';

var languages = ["af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM",
 "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg",
 "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en",
 "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM",
 "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU",
 "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu",
 "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl",
 "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb",
 "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO",
 "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI",
 "es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh",
 "ji", "zu"];

// There are 120 possible ISO language codes
class LanguageFeature {
  constructor() {
    this.language = window.navigator.language;
    this.size = 1;
  }

  construct() {
    if (!this.language) {
      this.success = false;
      return false;
    }
    let languageIndex = languages.indexOf(this.language);

    if (languageIndex >= 0) {
      this.hash = languageIndex;
    } else { // Unknown language? Strange, supposed to be ISO. Use separate code
      this.hash = 0xff;
    }

    this.byteArray = new Uint8Array(1);
    this.byteArray[0] = this.hash;
    this.byteString = byteArrayToString(this.byteArray);
    // this.b64 = Base64.encode(this.hash);
    this.base64 = btoa(this.byteString);

    this.success = true;

    return this.success;
  }
}

export default new LanguageFeature();
