# Uniswap V3 - Delta Price

Given liquidity `L`, and price ranges `Plower` and `Pupper`, if we wanted to answer the question of the amount of token `x` between these price ranges, or if we have another question like what is the amount of token `y` between these price ranges. We saw in earlier videos that these equations answer those questions:
```javascript
x =  L / sqrt(Plower) - L / sqrt(Pupper)
y = L * sqrt(Pupper) - L * sqrt(Plower)
```
The amount of `x` between the price ranges is given by the top equation, and the amount of token `y` in the price range is given by the bottom equation. Now, using these two equations, we can also ask a different question. The questions we can answer using these two equations are, if we were to add or remove a certain amount of token `x`, what is the resulting price? And also, if we were to add or remove a certain amount of token `y`, then what is the resulting price?
The questions we will be answering in this video are:

1. What is the price after adding or removing `delta x`?
2. What is the price after adding or removing `delta y`?

Let's start with the first question: What is the price after adding or removing `delta x`? This is actually two questions:

  1.  What is the price after adding `delta x`?
  2.  What is the price after removing `delta x`?

Let's start with the first of, what is the price after adding `delta x`? Let's consider the case when we add `delta x` from `Pupper`. On the graph this would look like this. Here we have the constant product curve, and starting from `Pupper`, we will add a `delta x` amount of token `x`. So the price must decrease. The price decreases from `Pupper` to `Plower`. So to answer the question, what is the price after adding `delta x`, we'll use the following equation:
```javascript
x =  L / sqrt(Plower) - L / sqrt(Pupper)
```
I'll replace the `x` with a `delta x`:
```javascript
delta x = L / sqrt(Plower) - L / sqrt(Pupper)
```
Using this equation, the question we need to answer here is: What is the price after adding `delta x`? We started out with `Pupper`, and after adding `delta x`, the price will be `Plower`. Using this equation, what we want to find is `Plower` in terms of `delta x`, liquidity `L`, and `Pupper`. We can derive this by using simple algebra. I'll copy the equation and paste it here:
```javascript
delta x = L / sqrt(Plower) - L / sqrt(Pupper)
```
We want to rearrange this equation so that `Plower` will be on one side of the equation and everything else will be on the other side of the equation. First I'll bring the `L / sqrt(Pupper)` over to the left side of the equation.
```javascript
L / sqrt(Pupper) + delta x = L / sqrt(Plower)
```
Now, I want a common denominator of the square root of `Pupper` on the left side. I'll do this by multiplying the `delta x` by `sqrt(Pupper) / sqrt(Pupper)`. The equation will look like this:
```javascript
L / sqrt(Pupper) + delta x * sqrt(Pupper) / sqrt(Pupper) = L / sqrt(Plower)
```
Next, I will simplify the left side of the equation. As the numerator we will have `L + delta x * sqrt(Pupper)`. The denominator will be `sqrt(Pupper)`.
```javascript
(L + delta x * sqrt(Pupper)) / sqrt(Pupper) = L / sqrt(Plower)
```
Notice that `sqrt(Plower)` is what we want to find, and it's on the bottom of the equation. So, we will bring it to the top by multiplying everything by `Plower`.
```javascript
sqrt(Plower) / L  * (L + delta x * sqrt(Pupper) / sqrt(Pupper))  = 1
```
And then I'll bring L to the other side:
```javascript
sqrt(Plower) / L = sqrt(Pupper) / (L + delta x * sqrt(Pupper))
```
I then flipped the numerator and the denominators on the left side of the equation. Now, `sqrt(Pupper)` will come to the top and our equation will look like this:
```javascript
sqrt(Plower) = (L * sqrt(Pupper)) / (L + delta x * sqrt(Pupper))
```
To get `sqrt(Plower)` all we have to do is multiply both sides by `L`.
```javascript
sqrt(Plower) = L * sqrt(Pupper) / (L + delta x * sqrt(Pupper))
```
Finally, we get the square root of `Plower` is equal to:
```javascript
L * sqrt(Pupper) / (L + delta x * sqrt(Pupper))
```
Our original question was: What is the price after adding `delta x`? However, for our final answer, we'll keep it as the square root of P lower. This is because, when you look inside the code for Uniswap v3, a lot of the math is done using the square root of the price. So we'll keep our equation like this. We'll keep our answer in the form of the square root of the price.

Now, let's do the same for when we remove delta x. What will be the equation? When we remove delta x, starting from P lower, what will be the equation for P upper?

Let's say that we start from `Plower` and we remove `delta x` amount of token `x`. The final price after removing `delta x` must be over here, `Pupper`.
What is the equation for this `Pupper`? Again, we can solve for this by starting with this equation:
```javascript
delta x = L / sqrt(Plower) - L / sqrt(Pupper)
```
And with some simple algebra, we can solve for `sqrt(Pupper)`. So what we're doing here is, the price will increase from `Plower` to `Pupper`, and using this equation, we want to solve for `sqrt(Pupper)`. The first thing that I'll do is bring the `- L / sqrt(Pupper)` to the left side of the equation, and bring the `delta x` to the other side.
```javascript
 L / sqrt(Pupper) = L / sqrt(Plower) - delta x
```
Now, on the right side of the equation, I want `delta x` to have a denominator of `sqrt(Plower)`. So I will multiply it by `sqrt(Plower) / sqrt(Plower)`.
```javascript
L / sqrt(Pupper) = L / sqrt(Plower) - (delta x * sqrt(Plower) / sqrt(Plower))
```
Now we have a common denominator.
```javascript
L / sqrt(Pupper) = (L - delta x * sqrt(Plower)) / sqrt(Plower)
```
Now, I'm going to flip the numerator and the denominator on the left side of the equation.
```javascript
sqrt(Pupper) / L = sqrt(Plower) / (L - delta x * sqrt(Plower))
```
Now, to get `sqrt(Pupper)` on one side, I will multiply both sides of the equation by `L`.
```javascript
sqrt(Pupper) = L * sqrt(Plower) / (L - delta x * sqrt(Plower))
```
And we now have an equation for the `sqrt(Pupper)`:
```javascript
sqrt(Pupper) = L * sqrt(Plower) / (L - delta x * sqrt(Plower))
```
So, we have two equations now: One describing the price lower after adding the liquidity and one describing the price upper after removing liquidity. When comparing these two equations, they look almost identical, except over here, we have `+ delta x`, and here we have `- delta x`. So we can generalize these two equations into a single equation:
```javascript
sqrt(Pafter) =  L * sqrt(Pbefore) / (L +/- delta x * sqrt(Pbefore))
```
If we are adding delta x to this delta x we add the plus sign. If we are removing delta x to this delta x, then we use the minus sign. Next, this left side of the equation, `sqrt(P)`, describes the price after.
So let's relabel this as `Pafter`. On the right side of the equation, this price describes the price before adding or removing the liquidity. So let's re-label this as "price before."
Now we have a generalized equation of what the price is either after adding or removing liquidity:
```javascript
sqrt(Pafter) = L * sqrt(Pbefore) / (L +/- delta x * sqrt(Pbefore))
```
Ok, let’s do something similar to answer the question: what is the price after adding or removing `delta y`? Let's start with the first part of the question, "What is the price after adding `delta y`?"

So take a look at this graph over here, we will start from `Plower`, and we're going to add `delta y` amount of token `y`. The resulting price we will call `Pupper`. What is the equation for `Pupper`? Again, we'll be using this equation to answer our question:
```javascript
y = L * sqrt(Pupper) - L * sqrt(Plower)
```
Instead of a `y` we will put a `delta y`:
```javascript
delta y = L * sqrt(Pupper) - L * sqrt(Plower)
```
So, we are going to be adding `delta y`. This will bring the price from `Plower` to `Pupper`. The price will increase from `Plower` to `Pupper`. Using this equation, what we want to find is `Pupper`.
So, starting from here, we can find `Pupper`, simply by bringing `L * sqrt(Plower)` to this side of the equation, this minus will become a plus:
```javascript
delta y + L * sqrt(Plower) = L * sqrt(Pupper)
```
To get the `sqrt(Pupper)`, all I have to do is divide both sides of the equation by `L`. By dividing the first term by L, we get `delta y / L` and dividing the second term by `L`, the `L` on the top will cancel with the `L` on the bottom. So we are left with:
```javascript
delta y / L + sqrt(Plower) = sqrt(Pupper)
```
So we have:
```javascript
sqrt(Pupper) = delta y / L + sqrt(Plower)
```
Next, let’s do the same for if we were to remove delta y starting from P upper. We have to remove this delta y amount of token y. The resulting price will be P lower.
What is the equation for P lower?
Again, starting from this equation, we can find P lower:
```javascript
delta y = L * sqrt(Pupper) - L * sqrt(Plower)
```
Here we want `Plower` to be isolated, so by doing some algebra I will bring `L * sqrt(Plower)` to the left side of the equation. Then `delta y` will move to the right side of the equation.
```javascript
L * sqrt(Plower) = L * sqrt(Pupper) - delta y
```
Then I divide both sides by `L`.
```javascript
sqrt(Plower) = L * sqrt(Pupper) / L - delta y / L
```
And dividing L sqrt(Pupper) by L, we cancel out the L’s and are left with:
```javascript
sqrt(Plower) = sqrt(Pupper) - delta y / L
```
And now we have our two equations:
```javascript
sqrt(Pupper) = delta y / L + sqrt(Plower)
sqrt(Plower) = sqrt(Pupper) - delta y / L
```
One describing the price lower after adding `delta y`, and one describing the price upper after removing `delta y`. The first equation, I will rearrange, and also remove this L.
```javascript
sqrt(Pupper) = sqrt(Plower) + delta y / L
```
And notice that, we have two equations that look almost identical. We have `+ delta y` and `- delta y`.
So, we can generalize these two equations into a single equation:
```javascript
sqrt(Pafter) = sqrt(Pbefore) +/- delta y / L
```
If we were to add delta y, then to the delta y we use a plus sign. If we were removing delta y, then we would use the minus sign.
Next, on this left side of the equation, the square root of P, describes the price after. So let’s relabel this as price after. On the right side of the equation this price describes the price before adding or removing liquidity. Let's relabel this as "price before". And now we get the equation, the square root of price after is equal to the square root of price before plus/minus `delta y / L`. Plus when we are adding `delta y` and minus when we are removing `delta y`.
