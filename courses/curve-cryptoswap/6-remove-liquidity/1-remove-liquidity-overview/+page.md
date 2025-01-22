### Remove Liquidity Overview

Let�s look at how a liquidity provider can remove liquidity from a Curve V2 AMM.

A liquidity provider can remove liquidity by calling the function `remove_liquidity`. To remove liquidity, the user will call `remove_liquidity`, specifying the amount of LP shares that they want to return back to the pool. This LP share is an ERC20 token. The pool contract will then burn these LP shares.

The contract will calculate the amount of USDC, WBTC, and ETH to send back to the user, and then transfer it to the user. The user also has an option to withdraw in WETH, instead of ETH. If they chose to do so, after the LP share is sent back to the pool contract, the pool contract will convert the ETH that would have been sent back to the user into WETH. This is done by calling the function `deposit` on the WETH contract. The WETH contract will receive this ETH and then turn it into WETH. Instead of ETH, WETH will be sent back to the user.
