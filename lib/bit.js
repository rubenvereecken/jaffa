

export function intToByteArray(i) {
  let a = new Uint8Array(4);
  // Only 8 right most bits are used in the assignment.
  a[0] = i >>> 24;
  a[1] = i >>> 16;
  a[2] = i >>> 8;
  a[3] = i;
  return a;
}

export function byteArrayToString(bytes) {
  let s = [];
  for (let b of bytes) {
    s.push(String.fromCharCode(b));
  }
  return s.join('');
}
