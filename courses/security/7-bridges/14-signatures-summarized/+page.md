---
title: Signatures Summarized
---

_Follow along with this video:_

---

### Signatures Summarized

In a nutshell, this is how signing works:

1. Take a private key + message
   - The message is generally comprised of: data, function selectors, parameters etc
2. Pass both the private key + message into the [**Elliptic Curve Digital Signature Algorithm**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (ECDSA)
   - We don't dive deep into ECDSA, but I recommend you do
   - outputs `v, r, and s`
3. `v, r, and s` are used to verify someone's signature using the precompile `ecrecover`.
