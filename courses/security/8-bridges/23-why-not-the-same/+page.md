---
title: Quick Aside
---

_Follow along with the video lesson:_

---

### Quick Aside

After the following lesson, you might be asking yourself:

**_Why isn't this the same as the `arbitrary from` finding?_**

The answer is that the `root causes` of these findings are _slightly_ different.

- **Arbitrary From:** approved tokens can be stolen by sending from any address
- **Infinite Mint:** vault possesses maximum approvals by default and at all times

While `infinite mint` uses `arbitrary from` as a mechanism for it's exploitation, the true root is that the vault has approved the bridge 100% of the time.

There could be argument for these to be the same finding, but I think they're unique enough to warrant separation.

We've only got 2 functions left to go through, let's keep going!
