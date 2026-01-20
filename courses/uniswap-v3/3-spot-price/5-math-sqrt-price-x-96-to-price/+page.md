### Calculating Price Using Square Root Price X96

In this lesson, we will explore how to use Square Root Price X96 to calculate the price P.

Square root price X96 is defined as:
```javascript
sqrtPriceX96 = sqrt(P) * Q96
```
Where Q96 is defined as:
```javascript
Q96 = 2^96
```
To calculate the price P, when we know what Square root price X96 is, we first take this Square root price X96 and realize that sqrt(P) is multiplied by a factor of Q96, so we'll first divide this sqrtPriceX96 by Q96. 
```javascript
P = sqrtPriceX96 / Q96
```
When we divide this, we're left with sqrt(P), so to get back P, we square this and we get back P.
```javascript
P = (sqrtPriceX96 / Q96)^2
```
This is how we calculate the price P, when we know the value of Square root price X96.
