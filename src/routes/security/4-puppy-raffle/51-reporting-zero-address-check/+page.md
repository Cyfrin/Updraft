---
title: Reporting - Zero Address Check
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Info Check - The Importance of Proper Checks in Blockchain Development

One of the most common pitfalls when developing on the blockchain, perhaps even in general software engineering, is a lack of thorough checking mechanisms. This can be particularly problematic when dealing with addresses, more specifically, the zero address, in Ethereum. This omission could lead to significant implementation issues and can be an easy target for bad actors. While working through a recent debug session, I noticed an absence of this critical check in the logic. This blog post serves as a document of my findings and the process I used to uncover them.

![](https://cdn.videotap.com/v36vdsgvIfzkWCRrdOOE-1.88.png)## **The Sight of an Omission: Info Check for Zero Address**

During the debugging session, my screening tool spotted an information check for a line that read something along the lines of 'info check for zero address'. Under normal circumstances, this could simply mean that there's no current data for that specific address. However, in the context of our application's logic, it was an indication of an important missing check, perhaps left out unintentionally during development.

Here's the scenario described in the code:

```
// code snippet to illustrate the scenariofunction transfer(address _to, uint256 _value) public returns (bool success) {require(_value <= balanceOf[msg.sender]);balanceOf[msg.sender] -= _value;balanceOf[_to] += _value;emit Transfer(msg.sender, _to, _value);return true;}
```

In this step, ideally, a check should exist to ensure that the `_to` address is not the zero address (0x0). However, the existing check was missing, which is a cause for concern considering the importance of the check in smart contracts.

## **Documenting the Finding**

So, what was my next step? Documentation. To ensure that I could come back to it later, I recorded this discrepancy in my findings list. Using a simple system of classification - numbering each finding and using an alphabetical prefix to denote the severity (Critical, High, Medium, Low, Informational), I named this finding `I3`, marking it as 'Informational'. This system, though seemingly simple, is invaluable for maintaining structure and clarity in error tracking and resolution.

```markdown
# Findings- C1: ... (sample critical finding)### I3: Missing Check for Zero Address in transfer functionThe transfer function does not check if `_to` address is the zero address. This could lead to tokens being mistakenly sent to the zero address and becoming irretrievable.- File: contracts/Token.sol- Line number: 45- Recommendation: Add `require(_to != address(0))`
```

![](https://cdn.videotap.com/QeCT6VzhyrWrblKQYKrv-28.24.png)## **The Power of Copy-Paste Outputs**

> "The beauty of software engineering tools is their ability to make the developer's life easier with low-effort but high-value features such as copy-pasting outputs."

By just hitting 'copy' and 'paste', I was able to efficiently record the finding under the correct classification. This critical feature mitigates stress in the debugging process by allowing for quick and easy error tracking and resolution. It is even possible to directly link the output to the spot in the code where the issue was found, making the process of referring back to the findings and resolving them even more streamlined.

## **In Conclusion**

In summary, this experience goes to show that even an 'informational' issue like a missing check for zero address can have far-reaching impacts if left unattended. However, the efficient use of debugging tools and a system for documenting findings can help a developer navigate through this complex process with relative ease. Therefore, it is always beneficial to consider, develop, and improve upon these efficient strategies for debugging. The power they wield often lies hidden in plain sight.
