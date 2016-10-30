

/*
* String hash function as used by Java.
* Outputs a 4-byte signed integer.
*/
export function javaHash(s) {
  var hash = 0, i, chr, len;
  if (s.length === 0) return hash;
  for (i = 0, len = s.length; i < len; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
    // console.log(hash);
  }
  return hash;
}
