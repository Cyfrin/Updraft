---
title: Checking version Compatibility
---

---

 As illustrated, using version `0.8.3` for a library that is intended to be inherited poses certain challenges due to the absence of custom error handling available in this version.

#### Specific Issues with Solidity 0.8.3

- **Absence of Custom Errors**: Solidity version `0.8.3` does not support custom errors. This limitation becomes apparent when attempting to compile the code using Foundry's tooling.
- **Compilation Error**: When setting the Solidity version in `foundry.toml` to `0.8.3` and running `forge build`, the compilation fails due to the use of custom errors that are not supported in that version.

#### Steps to Resolve the Issue

1. **Modify the Solidity Version**: Initially, set the version in `foundry.toml` to `0.8.3`.
2. **Attempt Compilation**: Run `forge build`. Notice the failure due to the unsupported custom error feature.
3. **Adjust the Code**: Remove the custom error from the code to match the capabilities of the Solidity version being used.
4. **Recompile**: Update the `foundry.toml` to a compatible version if necessary and recompile using `forge build`. The build should now succeed.

#### Implications for Audit Reporting

- **Documentation of Findings**: This issue would be documented as a "low finding" in the audit report, noting the inappropriate version of Solidity used in relation to the features implemented in the contract.
- **Recommendation**: Suggest upgrading to a newer version of Solidity that supports custom errors, ensuring that all functionalities of the contract can be utilized without limitations.

