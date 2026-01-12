In this lesson, we'll discuss how Curve utilizes a mathematical technique called Newton's Method to compute the amount of tokens to be exchanged and liquidity. We'll also provide an overview of how Newton's method works.

## Curve v1 Newton's Method

Let's start with the simple case of Uniswap v2. For Uniswap v2, the amount of tokens to be received from a swap and the liquidity can be calculated directly from a simple equation:

```javascript
x * y = L
```

where x represents the token being swapped for, and y represents the token to be received. L represents the liquidity.

For Uniswap v3, there is no easy equation to calculate x, y, or D.

## Newton's Method

Newton's Method is a mathematical technique used to find the solution for an equation f(x) = 0. The goal is to find the value of x where the function f(x) will evaluate to zero.

Here is the algorithm for Newton's Method:

```javascript
x_n = x_0

while True:
  x_{n+1} = x_n - f(x_n) / f(x_n)

  if abs(x_{n+1} - x_n) <= some small number:
    return x_{n+1}

  x_n = x_{n+1}
```

## Using Newton's Method

Let's take a look at how Newton's Method is used in Curve to calculate y and D. For the following examples, we'll be using the equation for n = 2:

**Newton's method to find y**

```javascript
F(y) = x * D(x+y) + x * y - x * D(1/2)^2
```

We use Newton's Method to find the value of y where f(y) = 0.

**Newton's method to find D**

```javascript
F(D) = x * D(x+y) + x * y - x * D(1/2)^2
```

We use Newton's Method to find the value of D where f(D) = 0.

In the next video, we'll go over how to implement these examples using Python. 
