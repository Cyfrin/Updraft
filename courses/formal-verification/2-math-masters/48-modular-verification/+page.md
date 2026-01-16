---
title: Modular Verification
---

---

### Modular Verification of the Square Root Function

#### Introduction to Modular Verification
To tackle the complexity of verifying a square root function, we utilize a strategy known as modular verification. This method involves dividing a complex problem into simpler, manageable subproblems—a process called modularization. 

#### Analyzing the Function
Our focus is on two implementations of the square root function:
1. **Uniswap Square Root**
2. **Soulmate Square Root**

The solmate square root function, which we haven't focused on extensively, reveals an interesting aspect when compared side-by-side with the Uniswap version. Upon cleaning up the code for better readability, it's evident that while the first halves of these functions differ, their second halves are identical—both perform similar operations like right shifts, additions, and divisions.

#### Hypothesis for Simplification
The identical lower halves of these functions suggest that if the solmate square root is accurate, then the top halves should, theoretically, produce the same results. This assumption allows us to hypothesize that difficulties in full verification might stem from the complex operations in the lower half, potentially leading to path explosion issues. Simplifying the verification to just the upper halves might offer a more manageable solution.

#### Implementation of Modular Verification
We split the MathMaster's square root function into two halves:
- **Top half**
- **Bottom half** (shared with the solmate square root)

Next, we implement these halves in a compact code base:
- **`function solmateTopHalf(uint256 x) external pure returns (uint256)`**
- **`function mathMastersTopHalf(uint256 x) external pure returns (uint256)`**

#### Transition to Fuzz Testing
Considering the modular approach, an idea arises to utilize fuzz testing for these functions instead of continuing with formal verification. We set up a fuzz test to compare the outputs of the top halves from both implementations. Despite initial tests passing, the consideration of more extensive fuzzing remains to potentially uncover discrepancies.

#### Final Verification Steps
Incorporating the functions into our square root specification, we attempt another round of verification:
- **`function solmateTopHalf(uint256 x) external returns (uint256)`**
- **`function mathMastersTopHalf(uint256 x) external returns (uint256)`**

We assert that the outputs of both functions should match, focusing solely on the top halves to avoid the complexity of the bottom halves.

#### Conclusion of the Modular Verification
Our efforts reveal that the top halves of the functions do not consistently yield the same results, indicating potential issues within the MathMaster's implementation. Although this modular verification does not fully confirm the correctness of the entire square root function, it effectively identifies a significant discrepancy that warrants further investigation and correction.

This modular approach not only simplifies the verification process but also highlights the importance of dissecting complex problems to focus on critical components, enhancing the overall efficiency of the verification efforts.
