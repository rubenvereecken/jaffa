## Fingerprint byte array

Each fingerprint feature is represented separately
using a pre-determined amount of bytes
so it can losslessly be concatenated with other features.
In order to decode the distinct fingerprint features
after concatenation,
the position of each feature in the byte array must be known.

The value within a single feature is currently big-endian.

The features, along with their size in bytes,
from right to left, are described below.

- [4] User agent string
- [1] Browser main language
