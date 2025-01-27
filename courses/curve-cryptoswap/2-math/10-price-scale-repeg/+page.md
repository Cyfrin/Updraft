# Curve V2 Price Scale Repeg

In this lesson, we will look at how the price scale determines where liquidity is concentrated in Curve V2. Let's consider an example where there are two tokens in the Curve V2 pool: USDC and WBTC. The price scales are 1 for USDC and 60,000 for WBTC. The WBTC market price is 60,000 USDC.

The pool balances are 6,000,000 USDC and 100 WBTC. We transform the balances of USDC and WBTC so they both equal 6,000,000. On the graph of the price of WBTC, we have a magic number, D / 2, which is equivalent to the token balances when both tokens are equal. In this example, D/2 equals 6,000,000. The market price of WBTC doesn�t remain at 60,000, it varies depending on the market. So, for example, next week it might be 70,000 or 50,000.

In this lesson, we will consider an example where the WBTC market price goes to 70,000 and then adjusts the price scale. What's important to note is the transformed balances and D / 2, where liquidity is concentrated.

To begin, the WBTC market price is 60,000, and D/2, the center where liquidity is concentrated, is 6,000,000. Let's assume the WBTC market price increases from 60,000 to 70,000. Inside the pool, the price scale for WBTC is 60,000. So, it's still 60,000 while the market price is 70,000. So liquidity is concentrated where WBTC is sold for 60,000 USDC. In other words, the market price of WBTC is 70,000, but on Curve V2, it is selling for 60,000.

An arbitrageur can take this opportunity to profit. So, for example, let's say they put in 680,000 USDC and take out 10.7575...WBTC. We explain in the previous video how to get these numbers, so we'll just continue. Since 680,000 USDC came in, this increased the USDC balance to 6,680,000. The balance of WBTC decreased to 89.2424�

We calculate the transformed balances by multiplying the actual balances by the price scale. For USDC, this gives a balance of 6,680,000. For WBTC, we get a transformed balance of  5,354,547.2740� On the graph, this WBTC balance would be to the left of the area where liquidity is concentrated.

Let�s also note that D / 2 represents the transformed balances when the pool is perfectly balanced, so both balances should equal 6,000,000. If we compare the transformed USDC balance of 6,680,000 with the transformed balance of 6,000,000 at equilibrium, we get an increase of 680,000. If we do the same for WBTC, we get the difference of -645,452.7259.

Next, we will change the Curve V2 price scale to 70,000. The market price is still 70,000, and the price scale of WBTC is now 70,000. The balances of the tokens have not changed, so we will have 6,680,000 USDC and 89.2424�WBTC.

The transformed balance for USDC has also not changed, since we are multiplying by a price scale of 1, so it's 6,680,000. For WBTC, the transformed balance is now 6,246,971.8197. On the graph, this new transformed balance is now closer to the center of where the liquidity is concentrated.

Now we will compare the difference between the transformed balance and D/2. D/2 is now 6,463,117.0592�

For USDC, if we take the transformed balance of 6,680,000 and subtract the value of D/2 from it, we get +216,882.9407.

For WBTC, we take the transformed balance and subtract the value of D/2, to get -216,145.2395.

The difference over here is -645,452.7259 with a price scale of 60,000. And, over here, after updating the price scale to 70,000, the difference is -216,145.2395.

What these numbers tell us is how far the transformed balance is from the center of where liquidity is concentrated. When the price scale was at 60,000, the transformed balance was further from where the liquidity is concentrated. After updating the price scale to 70,000, the transformed balance got closer to the center of where the liquidity is concentrated.

In summary, by changing the price scale, it changes the region where liquidity is concentrated.
