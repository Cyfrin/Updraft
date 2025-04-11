## Curve v2 Price Scale

Price scales are the prices of tokens relative to the first token. Let's assume there are 'n' coins in a pool. For 'i' equal to zero, less than or equal to n-1, we will define 'bi' as the balance of token 'i', and 'pi' as the price scale of token 'i'. Because the price scale is relative to the first token, 'pi' for the first price scale when 'i' is equal to zero will always be equal to one. Then we have a transformed balance of token 'i', defined as:

```
bi * pi
```
Where 'bi' is the balance of token 'i' and 'pi' is the price scale of token 'i'. When multiplied we get the transformed balance of token 'i'.

Let's walk through an example with a Curve v2 pool containing three tokens: USDC, WBTC, and ETH. The price scale will be the prices of the other tokens in relation to the first token, which is USDC in this case. Therefore, the price of USDC relative to USDC is set to one. We will set the price scale of WBTC to 60000. WBTC is wrapped bitcoin, and the price of WBTC is close to that of bitcoin. So we will set the current market price of bitcoin at $60,000, and the price scale to be equal to this value. We will set the market price of eth to 2000, with the price scale in Curve V2 set to 2000. This price scale of 2000 is relative to USDC. This would mean that 1 eth is equal to 2000 USDC and 1 WBTC is equal to 60000 USDC.

Moving on to the actual balance of tokens, we'll keep the math simple and say there is 6 million USDC, 100 WBTC, and 3000 eth. Now we will calculate the transformed balance of each token. The transformed balance is calculated by multiplying the price scale by the actual balance of tokens. For USDC, we would multiply 1 by 6 million, which equals 6 million. For WBTC, we multiply the price scale by the actual balance, giving 60000 * 100, which equals 6 million. Finally, for eth, we multiply the price scale by the balance. Because the price scale and balance both contain three zeros, multiplying them will result in six zeros. And multiplying 2*3, we get 6 million again.
