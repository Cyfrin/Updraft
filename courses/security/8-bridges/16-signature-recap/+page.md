---
title: Signatures Recap
---

_Follow along with the video lesson:_

---

### Signatures Recap

Alright! We've just learnt a tonne about signatures and message verification. Let's recap a few important points briefly.

### Signing

1. Take a private key + message
   - The message is generally comprised of: data, function selectors, parameters etc
2. Pass both the private key + message into the [**Elliptic Curve Digital Signature Algorithm**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (ECDSA)
   - We don't dive deep into ECDSA, but I recommend you do
   - outputs `v, r, and s`
3. `v, r, and s` are used to verify someone's signature using the precompile `ecrecover`.

### Verifying

1. Take signed message
   - Break into `v, r, and s` using `ECDSA`
2. Take message `data`
3. Pass message `data` and `v, r, and s` to `ecrecover`.
   - `ecrecover` outputs the address which signed the message
   - Compare this vs your expected address to verify
