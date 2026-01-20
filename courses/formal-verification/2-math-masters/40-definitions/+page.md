---
title: Definitions
---

---


## Overview of CVL Definitions

In this section, we're going to discuss how CVL definitions function similarly to type-checked macros and how they encapsulate commonly used expressions. This will help streamline your coding process and make your code cleaner and more maintainable.

### Using CVL Definitions for Constants

Consider a scenario where you're working with a common expression, like `1E18`, in your Solidity code. Instead of repeating this value throughout your code, you can define it once using CVL and reference it wherever needed. Here's how you can do it:

1. **Identify the Common Value**: In our example, `1E18` is a frequently used number that represents a significant value in Ethereum, typically used to convert Ether to Wei.

2. **Create a CVL Definition**:
   
   - **Definition**: To correct this, define it like so:
     ```js
          definition WAD() returns uint256 = 1000000000000000000;
     ```
     Add parentheses to ensure the expression is evaluated correctly.

3. **Replace the Hard-Coded Values**: Replace all instances of `1E18` in your code with the new CVL definition. For instance, use `WAD` instead of `1E18`.

