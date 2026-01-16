---
title: Finishing mulWad
---

---

### Overview of the Function's Logic and Operation

- **Performing Calculations**: The core operation within this function involves computing the product of two variables, `x` and `y`. This computation is straightforward: it simply returns `x * y`. An essential part of ensuring this operation is safe involves a prior check to confirm that the multiplication does not result in an overflow.

### Handling Constants and Divisions

Further down the function, we encounter a division operation, which divides the product by another variable, `wad`. Upon inspecting `wad` through a command click, it confirms that `wad` is correctly set as `1E18`, an internal constant.

- **Division Operation**: The function performs a division of `x` by `y` using a straightforward division method (`div`), which confirms that the division is executed as expected.
- **Returning Values**: The result of the division is stored in variable `Z`, which was defined earlier in the code. The correct handling and return of `Z` reinforce the function's reliability.


Good job analyzing this with assembly, let's move to `mulwdup`.