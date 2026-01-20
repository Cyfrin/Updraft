### Uniswap V3 Fee - Fee growth above

In this lesson, we will derive the equation for fee growth above based on fee growth outside.

First, let's start with some definitions.

We will say that `f_g` is equal to the fee growth of token Y at the current time. We will also define `f_gk` as the fee growth of token Y at time `t_k` . The restriction on time here is that `t_k` is less than `t_k+1`, which is less than `t_k+2` and so on. This means time is always moving forward. Lastly, `f_a` is the fee growth of token Y above tick i. 

In this lesson, we will look at an example of how to calculate fee growth above, and relate it to fee growth outside. For the algorithm for fee growth outside, we will use the following algorithm.

We will define `f_o,i` to be equal to the fee growth outside at tick i. To initialize this fee growth outside, we say that it is equal to `f_g` if current tick i is less than or equal to the tick that is associated with the fee growth. Otherwise, when we initialize fee growth outside and the current tick is less than the associated tick we initialize this to zero.

To update fee growth outside, when the fee growth crosses tick i, we update fee growth outside using this algorithm:
```javascript
f_o,i = f_g - f_o,i
```
Let's move on to an example of fee growth above.
Let’s say that we have a tick, i, and over time the fee growth has gone left and right.
Sometimes the fee growth is above the tick i, and other times it is below. What we are trying to do is calculate the fee growth above.

Visually, the fee growth above is the sum of the height of the red rectangles. We will use these rectangles to calculate what fee growth above should be for each time interval.

First, let's look at the time interval between `t_0` and `t_1`. At time `t_0`, let’s say the fee growth was over here. At time `t_1`, the fee growth was over here. In between times `t_0` and `t_1`, fee growth will be somewhere over here. In this case, what is the fee growth above?
We have to sum the height of the red rectangle, which is below `f_g1`. Here, we do not have any rectangles below `f_g1`. This makes fee growth above 0.

For the time between `t_1` and `t_2`, the fee growth is over here. At time `t_1`, fee growth started over here and at time `t_2` the fee growth crossed over this tick. The fee growth above is the height of this rectangle. This will be equal to the current fee growth minus the time that it crossed above the tick i, which was `f_g1`. So, it can be expressed as `f_g - f_g1`.

For the time interval between `t_2` and `t_3`, the fee growth will be somewhere over here. The fee growth above is the height of this red rectangle. This can be expressed as `f_g2` minus `f_g1` .

For the time interval between `t_3` and `t_4`, the fee growth is over here. The fee growth above is the height of this red rectangle, and this red rectangle. So, the fee growth above is equal to  `f_g` minus `f_g3` + `f_g2` minus `f_g1`.

For the time interval between `t_4` and `t_5` , fee growth is here, so the fee growth above is `f_g4` minus `f_g3` + `f_g2` minus `f_g1`.

For the time interval between `t_5` and `t_6`, the fee growth is over here. The fee growth above will be `f_g` minus `f_g5` + `f_g4` minus `f_g3` + `f_g2` minus `f_g1`

Lastly, for time interval between `t_6` and `t_7`, the fee growth is over here, and it can be expressed as `f_g6` minus `f_g5` +  `f_g4` minus `f_g3` + `f_g2` minus `f_g1`.

Now we will calculate fee growth outside, by first using the initilization algorithm. This is `f_o,i` =  `f_g` if current tick i is less than or equal to `i_c`. Otherwise, if it is less than i, we initialize it to 0.

When looking at our graph and our example at time `t_0`, we see that the current tick is less than tick i, which means we initialize `f_o,i` to 0.
When the fee growth crosses tick i at time t1, we apply our update rule `f_o,i` = `f_g` - `f_o,i`. In this case we get `f_g1` minus 0 which is equal to `f_g1`.

We continue this process for the rest of the table.

Now, let’s put together an equation for `f_a` in terms of `f_o,i` and `f_g` where `i_c` is equal to the current tick.
```javascript
f_a = f_g - f_o,i if i <= i_c
f_a = f_o,i if i < i_c
```
What we’ve done so far is created formulas for both fee growth below and fee growth above. Next, we will use these equations for fee growth above, fee growth below and fee growth outside to calculate the amount of fees that can be collected from a liquidity position.
