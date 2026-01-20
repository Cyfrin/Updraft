---
title: Custom Errors
---

_Follow along with the video_

---

Using a basic `revert()` statement may not provide evidence on why a transaction failed. A better approach is to define custom errors by combining the **contract name** with a **description**, such as `Raffle__UpkeepNotNeeded()`. Additionally, including **parameters** can offer more detailed information about the cause of the transaction failure.

```
Raffle__UpkeepNotNeeded(address balance, uint256 length, uint256 raffleState);
```
