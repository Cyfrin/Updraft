---
title: Reverting - Why are we pulling from 0x1c?
---

---

### `mstore` and `revert` in Solidity

#### The `mstore` Function:
- **Functionality**: The `mstore` function is used to store data in memory in Solidity, which is particularly important when dealing with assembly level code.
- **Parameters**:
  - `p`: Represents the position in memory where data is to be stored.
  - `v`: Represents the value to be stored at the specified memory position.
- **Process**:
  - The syntax used in `mstore` suggests an opcode-like functionality, where the parameters `p` (position) and `v` (value) are pushed onto the stack in that order before `mstore` is called.
  - Example: When we see `mstore 0x40`, it means that at memory position `0x40`, a certain value is stored.

#### The `revert` Function:
- **Functionality**: Used to halt and revert any changes made by a transaction when conditions are not met, while returning an error message.
- **Parameters**:
  - `P` and `S`: Indicate the offset in memory (in bytes) where the error message starts (`P`) and the size of the error message (`S`).
- **Interaction with `mstore`**:
  - The value stored at a position using `mstore` might be referred to by the `revert` function to provide an error message.
  - For instance, if `mstore` is used to store a value at `0x40`, `revert` might be configured to read from a different position based on the error scenario, leading to confusion if not correctly aligned.

### Analysis of Syntax and Error Handling:
- **Syntax**: The notation `p...p+32` means that the operation affects the memory from position `p` to `p+32`, essentially covering 32 bytes.
- **Error Selector Placement**: Even though `mstore` sets a 32-byte wide value, confusion might arise due to misalignment in the `revert` call, which could lead to referencing a non-existent or incorrect memory location.
- **Error Calculation**:
  - `cast 2 base` is used to interpret hexadecimal values in decimal, helping understand the memory offset calculations more intuitively.
  - The reference to starting at the `28th byte` and capturing the last `four bytes` suggests precise control over what portion of the memory is read during the revert, potentially to extract specific error information.

