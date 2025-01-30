# Calculating Tick From Square Root Price X96

In this lesson, we will be calculating the tick, given the square root price X96, using Python code. We will be using the USDC / WETH 0.05% pool.

First, we will define a constant Q96:
```javascript
Q96 = 2 ** 96
```
Next, we will copy and paste the square root price X96 and the tick which we got from the contract address:
```javascript
sqrt_p_x96 = 1386025840740905446350612632896904
tick = 195402
```
Next, we will calculate the tick from the square root price X96, and double check to make sure it matches the tick from the contract address. We will define variable t as:
```javascript
t = 2 * math.log(sqrt_p_x96 / Q96) / math.log(1.0001)
```
And then print out variable t:
```javascript
print(t)
```
The result we calculated was 195402.155, and the actual tick was 195402, so we know we have successfully calculated the tick from the square root price X96.
