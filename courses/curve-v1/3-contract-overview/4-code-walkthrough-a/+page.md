## The A parameter inside curve B1's AMM

The A parameter inside Curve B1's AMM equation controls how flat the curve is. For example, if we increase A, we can see that the pink line, which represents Curve B1's AMM curve, becomes more flat like the constant sum. On the other hand, when we decrease this A parameter, we see that the curve becomes more like the constant product. When A is equal to zero, it matches the constant product curve.

Let's take a look at how this A parameter is calculated inside Curve B1's AMM. The contract that we will take a look at is called StableSwap3Pool. This is a contract that is deployed on the main net, and it holds DAI, USDC, and USDT. The function that calculates the current A parameter is called _A. The owner of this contract can set a new A parameter. When a new A parameter is set, it doesn't take effect immediately. Over time, it gradually changes from the current A parameter to this new target A parameter that is set by the admin.

So, inside this code, you see T1 and A1. A1 is the new A parameter that is set by the admin, and T1 is the timestamp where this new A parameter will stay fixed. At and after timestamp T1, this A parameter will stop increasing and it will stay flat as the new value A1. Let's say that the admin sets the A parameter to A1 at time T0. Then, over time, from time between T0 to T1, the current A will gradually increase to A1. After time T1, since the current A parameter has reached A1, it will stay flat as A1. And we can see this in the code over here.

```javascript
if block.timestamp < t1:
    A0: uint256 = self.initial_A
    t0: uint256 = self.initial_A_time
    # Expressions in uint256 cannot have negative numbers, thus "if"
    # A1 > A0:
    if A1 > A0:
        return A0 + (A1 - A0) * (block.timestamp - t0) / (t1 - t0)
    else:
        return A0 - (A0 - A1) * (block.timestamp - t0) / (t1 - t0)
else:
    # when t1 == 0 or block.timestamp >= t1
    return A1
```

Let's say that the admin sets the A parameter to A1 at time T0. Then, over time, from time between T0 to T1, the current A will gradually increase to A1. After time T1, since the current A parameter has reached A1, it will stay flat as A1. And we can see this in the code over here.

```javascript
if block.timestamp < t1:
    A0: uint256 = self.initial_A
    t0: uint256 = self.initial_A_time
    # Expressions in uint256 cannot have negative numbers, thus "if"
    # A1 > A0:
    if A1 > A0:
        return A0 + (A1 - A0) * (block.timestamp - t0) / (t1 - t0)
    else:
        return A0 - (A0 - A1) * (block.timestamp - t0) / (t1 - t0)
else:
    # when t1 == 0 or block.timestamp >= t1
    return A1
```

To understand this code, consider the two cases: When timestamp is equal to T0 and when timestamp is equal to T1. Let's start with the case when timestamp is equal to T0. When timestamp is equal to T0, this expression T0 - T0 is equal to zero. So, when we multiply this part by zero, this whole expression will be equal to zero, so we get A0. On the other hand, when timestamp is equal to T1, then this part of the code is equal to T1 - T0 divided by T1 - T0 is equal to one. So, this part of the code will be A1 - A0 multiplied by one, which is simply equal to A1 - A0. And then let's now do this A0 plus A1 minus A0. The A0 cancels out with this A0 over here, and we get back A1.

At time T0, we see that the A parameter returns A0, and at time T1, the A parameter returns A1. And anywhere in between, this block.timestamp - T0 divided by T1 - T0 is a fraction that is less than one. So, the A parameter that is returned will be some number between A0 and A1. And that's how this part of the code works.

This part of the code works almost exactly the same, except the current A parameter gradually decreases to the new parameter A1. 
