---
title: Naive Optimistic Loop With Certora
---

---


### Configuration and Specification Setup

**Starting Configuration:**
We begin by creating a new configuration file named `square root conf`, accompanied by a specification file `square root spec`. The existing `comp` configuration is utilized by copying its contents into the new configuration file, while ensuring the `compact code base` remains unchanged due to dependencies on the `mathMaster` library and its internal functions.

**Test Harness Requirements:**
Given that `mathMaster` functions internally, a test harness is necessary. This leads to the inclusion of `square root spec` in the configuration.

### Specification Definition

**Defining Functions:**
In the `square root spec`, we incorporate two primary functions:

1. `mathMasters square root` we can just copy and paste from Base Test.


```solidity

    function uniSqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

} 

```

1. `mathMastersSqrt` function:


```solidity
function mathMastersSqrt(uint256) external pure returns (uint256){
    return MathMasters.sqrt(x);
}
```



### Review and Correction of Loop Handling

**Problem Identification:**
The optimistic loop setting, while useful under certain conditions, is identified as inappropriate for this case. It simplifies loop handling at the cost of thoroughness, leading to potentially misleading verification outcomes.

**Solution Implementation:**
To address this, the optimistic loop parameter is removed from the configuration to ensure a more accurate and reliable verification process. The system is rerun to observe outcomes under these new settings.

### Addressing Verification Timeouts

**Managing Timeouts:**
Persistent timeout issues indicate a deeper problem related to the complexity of the paths involved in the verification, known as the path explosion problem. This issue, where the number of verification paths grows exponentially with the code complexity, challenges the tool's capacity to verify within reasonable time limits.

**Documentation Consultation:**
Further guidance is sought from the `Certora` documentation, which provides strategies for managing timeouts, such as adjusting loop iteration settings and extending timeout limits. However, these adjustments might still not suffice due to the inherent complexity of the code paths, emphasizing the limitations of current verification technologies in handling complex scenarios.