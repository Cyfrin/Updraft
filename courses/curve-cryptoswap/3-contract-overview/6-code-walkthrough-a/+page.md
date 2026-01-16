# Curve V2 Parameters A and Gamma

The parameters A and gamma inside the curve V2 equation control how flat the graph of curve V2 is. The parameter A is from curve V1. In curve V2 it introduces another parameter called gamma. Gamma controls the wideness of where liquidity is concentrated. These parameters can only be set by the admin of this contract.

When the admin sets either the new A parameter or the gamma parameter, it doesn't take effect immediately. Instead, it changes to the new A and gamma parameters over time. The update will be made in a linear fashion. Let's say that at time T0, the A parameter was at A0, and we schedule at some further future in time T1 for the A parameter to be A1. Then over time, it's going to make a linear progression from A0 towards A1. If the current block timestamp is somewhere between T0 and T1, the current A parameter will be somewhere between A0 and A1.

The function def _A_gamma first assigns some state variables to a local variable, T1 and A_gamma_1. These will represent the future A and the gamma parameters. T1 will be the future timestamp where the future A and gamma parameter will be equal to A1 and gamma1, which was scheduled by the admin. The future A gamma is a packed state variable. The first 128 bits will pack the parameter for A and the next 128 bits will pack the parameter for gamma. 

That is the logic we see over here in this section of code:
```javascript
def _A_gamma() -> uint256[2]:
    t1: uint256 = self.future_A_gamma_time
    A_gamma_1: uint256 = self.future_A_gamma
    # 128 bits | 128 bits
    # A | gamma
    gamma1: uint256 = A_gamma_1 & 2**128 - 1
    A1: uint256 = A_gamma_1 >> 128
```

To get gamma, since it's on the right side of the 128 bits of uint256, the gamma parameter is unpacked by doing a bitwise mask with 128 bits. The A parameter is on the left side of the 128 bits, so to get this value, we need to bitshift by 128 to the right.

If the current block.timestamp is less than T1, where T1 is the future A gamma time, then we know the current block timestamp is between T0 and T1. We'll need to do a linear calculation to figure out where the A parameter and gamma parameter is. We will need to get the A0 parameter and the timestamp T0. 
```javascript
    A_gamma_0: uint256 = self.initial_A_gamma
    t0: uint256 = self.initial_A_gamma_time
```
The initial A gamma is also a packed state variable where A will be packed into the first 128 bits, and gamma will be packed into the last 128 bits.

Then the code subtracts T0 from T1 and sets T0 to be equal to the current timestamp minus T0.
```javascript
 # Sliding t0 and t1 by - t0
    t1 -= t0
    t0 = block.timestamp - t0
    t2: uint256 = t1 - t0
```
What is happening here is we are sliding all of the timestamps by T0. Then T2 is equal to T1 - T0.
```javascript
 # t1 = t1 - t0
    # t0 = b - t0
    # t2 = (t1 - t0) - (b - t0) = t1 - b
```
This part of the code was a little confusing, let's unwrap what's going on here. In the first line it says that T1 from the current value of T1 is T1 - T0. The current T1 is equal to T1 - T0. T0 is equal to block.timestamp - T0. Here we are denoting block.timestamp as b. So T0 will be equal to b-T0. And T2 is equal to T1 - T0. Let's unwrap this part.

We know that T1 was assigned to be T1-T0. And T0 was assigned to b-T0. 
So simplify that and the T0s will cancel out and we're left with T1-b.
```javascript
 # A = A0 when b = t0
 # A = A1 when b = t1
 #(A0 * (t1 - b) + A1 * (b - t0)) / (t1 - t0)
    A1 = ((A_gamma_0 >> 128) * t2 + A1 * t0) / t1
    gamma1 = ((A_gamma_0 & 2**128 - 1) * t2 + gamma1 * t0) / t1
```

Here is the part that calculates the current A parameter and the gamma parameter. It's applying a linear equation to figure out where this value will be between A0 and A1, and also between gamma0 and gamma1.

As stated earlier A_gamma_0 packs state variables. A is packed in the first 128 bits and gamma is packed in the last 128 bits. To get the A0 parameter, it bitshifts by 128 to the right. And the same goes for gamma1. We see that since gamma1 is the last 128 bits, it does a bitwise mask with 128 bits to get the value of gamma. The A parameter is on the left side of the 128 bits, so to get the value you need to bitshift to the right.

If the current block timestamp is less than T1, where T1 is the future A gamma time, then we know that the current timestamp is somewhere in between T0 and T1. It then will perform a linear calculation to see where the A parameter and the gamma parameter is. First it minuses T0 from T1. Then it sets T0 to the current timestamp minus T0. Here we are saying T1 from the current value is T1 - T0. The current T1 is equal to T1 - T0. The current T0 is equal to block.timestamp - T0. T2 is equal to T1 - T0.

T2 is equal to T1 - T0. We know that T1 is T1-T0. And T0 is b-T0. If you simplify you get T1 - b. So what this is doing is sliding all of the timestamps by T0.

So it multiplies A0 by T2 + A1 * T0, divided by T1. The code on the bottom is very similar and uses the same logic. T2 * gamma1 * T0, divided by T1. And the code at the bottom uses similar logic with different values.

It is taking a weighted average between A0 and A1, where the weights are defined by the time elapsed since T0.

When block.timestamp b is equal to T0, b - T0 will equal zero.

T1 - b will be the distance between T1 and B.

When current block timestamp b approaches T1, this entire value will be close to 0.

When current block timestamp is equal to T0 this entire expression evaluates to A0 and when current block timestamp is T1, it evaluates to A1. This is how the current A parameter moves from A0 to A1. This is the same calculation for gamma0 to gamma1. That is how the current A parameter and the gamma parameter is calculated.
