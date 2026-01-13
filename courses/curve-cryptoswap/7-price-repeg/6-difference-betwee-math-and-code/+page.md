# Exponential Moving Average for Irregular Intervals: Math vs Code

In this lesson we explore how exponential moving average for irregular intervals is handled.

The equation introduced is:
```javascript
M*t_i = a_t_i * P_t_i + (1 - a_t_i) * M*t_i-1
```
Where `0 <= a_t_i <= 1`

Inside of the code for Curve V2 AMM, the equation looks slightly different and is written as:
```javascript
M'_t_i = a_t_i * P_t_i + (1 - a_t_i) * M'_t_i-1
```
If we rewrite the code as an equation we can observe that `(1 - a_t_i)` and `a_t_i` are switched. Thus the code would look like this:
```javascript
M'_t_i = (1 - a_t_i) * P_t_i + a_t_i * M'_t_i-1
```
To avoid confusion, we are going to rename this variable. We will now explain why this is not a problem. The two equations are basically the same. To see this, all we have to do is substitute a_t_i with `1 - a'_t_i`. So we can set `1 - a'_t_i = a_t_i`

Now we can see that these terms are the same. Let's do a simple algebra to figure out how to replace `1-a'_t_i`. 
First we will subtract a_t_i from both sides of the equation
```javascript
1 - a'_t_i = a_t_i
1 - a'_t_i - a_t_i = 0
```
This brings `a_t_i` over to the left
```javascript
1 - a'_t_i  = a_t_i
```
Then we add `a'_t_i` to both sides of the equation and this will bring `a'_t_i` to the right
```javascript
1 - a_t_i = a'_t_i
```
These are the two equations we have and we can see that they show a substitution where the first term can be replaced by `1 - a'_t_i` and the second term `1 - a'_t_i` will be replaced by `a_t_i`.

How about the property `0 <= a_t_i <= 1` does that still hold?

When we picked `a_t_i` we said that this must be greater or equal to 0 and less than or equal to 1. When we make the substitution, does this still apply? We know that `1 - a'_t_i` is equal to `a_t_i`. We can say that this expression will also be less than or equal to one.
```javascript
0 <= 1 - a'_t_i <= 1
```
From here we will remove the `a_t_i`. Then we will get:
```javascript
0 <= 1 - a'_t_i <= 1
```
Now we can use simple algebra. We will subtract one so this will become a `-1` and this will disappear. 
```javascript
-1 <= -a'_t_i <= 0
```
Then we can multiply all of this inequality by `-1`. This will become a `1` and the `-1` will disappear and this zero will stay the same.
```javascript
1 >= a'_t_i >= 0
```
Since we multiply by -1, the inequalities will flip or we can just switch the numbers around. Zero will come to the left and 1 will come over here.
```javascript
0 <= a'_t_i <= 1
```
From this equation it follows that the variable has been substituted and it will still be between the range of 0 and 1.

Now in the math that we showed you, this is the equation that we use to determine the value of `a_t_i`.
```javascript
1 - a_t_i = 0.5^(dt_i/H) = e^(ln(0.5) * dt_i/H)
```
However inside the code for Curve V2 AMM, we will see that the last expression, `e^(ln(0.5) * dt_i/H)`  is set to the variable `a'_t_i` where `dt_i` is time elapsed and H is some time interval. In the code `a'_t_i` is named alpha.
Is this equation true? From the substitution rule that we found out, we notice that `1 - a_t_i` is equal to `a'_t_i`. So this equation also holds.

In summary, when we explain the math for exponential moving average for irregular intervals, we use the following equations:
```javascript
M*t_i = a_t_i * P_t_i + (1 - a_t_i) * M*t_i-1
```
and
```javascript
1 - a_t_i = 0.5^(dt_i/H) = e^(ln(0.5) * dt_i/H)
```
However, inside the code for Curve V2 AMM, the equation being used is:
```javascript
M'_t_i = (1 - a'_t_i) * P_t_i + a'_t_i * M'_t_i-1
```
and
```javascript
1 - a_t_i = 0.5^(dt_i/H) = e^(ln(0.5) * dt_i/H) = a'_t_i
```
