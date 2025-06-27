Let's go over an example of the amount of USDC that a user will receive for burning S shares. We'll assume that the total share is equal to 1,100 and the amount of share that we are burning is 100. This will reduce the total shares to 1,000, a decrease of 9%.

We need to reflect this 9% share decrease in the amount of tokens in the pool. Before burning the shares, the pool had 1,210 USDC. After the decrease, the pool will have 1,100 USDC. The difference between these two values, 110 USDC, will be sent to the user.

We can calculate this difference using the following formula:

$L_0 - L_1 = \frac{S}{T}L_0$

Where:

* L0 is the value of the pool before the shares are burnt
* L1 is the value of the pool after the shares are burnt
* S is the number of shares that are burnt
* T is the total number of shares

In our example:

* L0 = 1,210
* S = 100
* T = 1,100

Therefore:

$L_0 - L_1 = \frac{100}{1100} * 1210 = 110$



This confirms that the user will receive 110 USDC.

[Diagram showing the pool before and after burning the shares] 
