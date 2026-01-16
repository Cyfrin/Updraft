---
title: Formal Verification Soundness
---

---

### Understanding Harnesses in Formal Verification

Harnesses play a crucial role in the formal verification of code, particularly when employing tools like the Certora Prover. Here, we dive into the concept of sound versus unsound verifications:

- **Sound Verification**: In this scenario, if there are any rule violations in the code being verified, they are guaranteed to be reported by the Certora Prover. This ensures a comprehensive check where no real bugs are overlooked.

- **Unsound Verification**: This involves approximations that might cause real bugs to be missed. Certain techniques like loop unrolling or specific types of harnessing can lead to unsound verification, where not all potential errors are caught.

#### Implications of Harnessing on Code Verification

When wrapping a library in an external contract, it introduces complexities in verification:

- **Effect on Prover's Reasoning**: The prover may struggle to ascertain that the harness does not influence the return values, potentially leading to overlooked issues.
- **Solidity Specifics**: Certain peculiarities in Solidity might cause unexpected behavior when a library function is wrapped by an external function. This could lead to anomalies that are hard to predict and detect in verification processes.

#### Practical Approach to Verification

Given these challenges, the approach shifts towards making internal functions external to enable verification:

- **Adjusting the Configuration**: Instead of verifying the source file `MathMasters.sol`, the focus shifts to `CompactCodebase.sol`. 
- **Verification of Wrapped Functions**: Even though it's technically considered unsound when a function is wrapped in a harness, it's still validly verified within the context of that harness. This means, while it may not meet the strictest criteria for sound verification, it still undergoes formal verification to ensure reliability as much as possible.

#### Final Steps in Configuration

- **Adapting Verification Calls**: The final step involves calling the `MulWadUp` function on the `CompactCodebase` instead of `MathMasters`. This is intended to test the assumption that both functions return the same results under verification, maintaining consistency across different parts of the codebase.
