---
title: ThunderLoan.sol - Flashloan
---

### Thunderloan.sol - Flashloan

Ok! We've come to one of the most important functions in the Thunder Loan protocol - `flashloan`.

<details>
<summary>Flashloan Function</summary>

```js
function flashloan(
    address receiverAddress,
    IERC20 token,
    uint256 amount,
    bytes calldata params
)
    external
    revertIfZero(amount)
    revertIfNotAllowedToken(token)
{
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 startingBalance = IERC20(token).balanceOf(address(assetToken));

    if (amount > startingBalance) {
        revert ThunderLoan__NotEnoughTokenBalance(startingBalance, amount);
    }

    if (receiverAddress.code.length == 0) {
        revert ThunderLoan__CallerIsNotContract();
    }

    uint256 fee = getCalculatedFee(token, amount);
    // slither-disable-next-line reentrancy-vulnerabilities-2 reentrancy-vulnerabilities-3
    assetToken.updateExchangeRate(fee);

    emit FlashLoan(receiverAddress, token, amount, fee, params);

    s_currentlyFlashLoaning[token] = true;
    assetToken.transferUnderlyingTo(receiverAddress, amount);
    // slither-disable-next-line unused-return reentrancy-vulnerabilities-2
    receiverAddress.functionCall(
        abi.encodeCall(
            IFlashLoanReceiver.executeOperation,
            (
                address(token),
                amount,
                fee,
                msg.sender, // initiator
                params
            )
        )
    );
```

</details>


```js
// @Audit-Informational: No NATSPEC!
```

It's a shame to see such an important function go undocumented, but let's start to go through it.

Since we have no NATSPEC, we can begin by defining the parameters of the function.

```js
address receiverAddress,
IERC20 token,
uint256 amount,
bytes calldata params
```

- **receiverAddress** - The address to receive flash loaned tokens. We expect this to be a smart contract address
- **token** - the ERC20 to borrow
- **amount** - the amount of token to borrow
- **params** - parameters to call the receiverAddress with

Next we see two modifiers which should be familiar to us by now:

```js
revertIfZero(amount);
revertIfNotAllowedToken(token);
```

The function opens with some set up and checks, acquiring the associated AssetToken by leveraging the s_tokenToAssetToken mapping. We learnt earlier that this AssetToken contract is what actually contains the underlying ERC20 tokens. We use AssetToken to determine the starting balance of ERC20 tokens as well.

```js
AssetToken assetToken = s_tokenToAssetToken[token];
// startingBalance is used later in function to assure the loan has been repaid!
uint256 startingBalance = IERC20(token).balanceOf(address(assetToken));
```

We're then performing some validation checks which assure the function will revert if:

- the amount requested is more than the balance of the AssetToken contract
- the receiverAddress passed is not a smart contract

```js
if (amount > startingBalance) {
    revert ThunderLoan__NotEnoughTokenBalance(startingBalance, amount);
}

if (receiverAddress.code.length == 0) {
    revert ThunderLoan__CallerIsNotContract();
}
uint256 fee = getCalculatedFee(token, amount);
assetToken.updateExchangeRate(fee);
```

Following these checks, we're assigning our fee from `getCalculatedFee` and then using that to updateExchangeRate. Let's look again at this updateExchangeRate function to better understand how this fee is being used.

```js
function updateExchangeRate(uint256 fee) external onlyThunderLoan {
    // 1. Get the current exchange rate
    // 2. How big the fee is should be divided by the total supply
    // 3. So if the fee is 1e18, and the total supply is 2e18, the exchange rate be multiplied by 1.5
    // if the fee is 0.5 ETH, and the total supply is 4, the exchange rate should be multiplied by 1.125
    // it should always go up, never down
    // newExchangeRate = oldExchangeRate * (totalSupply + fee) / totalSupply
    // newExchangeRate = 1 (4 + 0.5) / 4
    // newExchangeRate = 1.125
    uint256 newExchangeRate = s_exchangeRate * (totalSupply() + fee) / totalSupply();

    if (newExchangeRate <= s_exchangeRate) {
        revert AssetToken__ExchangeRateCanOnlyIncrease(s_exchangeRate, newExchangeRate);
    }
    s_exchangeRate = newExchangeRate;
    emit ExchangeRateUpdated(s_exchangeRate);
}

function getExchangeRate() external view returns (uint256) {
    return s_exchangeRate;
}
```

We'll use another example to walk through the math happening here. Say we have:

```js
// 5 asset tokens
// 5 USDC
// Exchange Rate = 1
// Fee = 1
```

Applying our newExchangeRateFormula...`uint256 newExchangeRate = s_exchangeRate * (totalSupply() + fee) / totalSupply();`

```js
// uint256 newExchangeRate = 1 * (5 + 1) / 5
// uint256 newExchangeRate = 6 / 5
// uint256 newExchangeRate = 1.2
```

The the new exchange rate, when the liquidity provider goes to redeem their asset tokens..

```js
// uint256 amountUnderlying = (amountOfAssetToken * exchangeRate) / assetToken.EXCHANGE_RATE_PRECISION();
// uint256 amountUnderlying = (5 * 1.2) / 1
// uint256 amountUnderlying = 6
```

We can clearly see now how the fees represent the financial incentive for liquidity providers of the protocol. The picture is becoming more clear! Let's keep going with the flashloan function.

The next thing we see as an event being emitted. We should of course verify the arguments being passed, as always.

```js
emit FlashLoan(receiverAddress, token, amount, fee, params);
```

What's happening in the following line with the `s_currentlyFlashLoaning[token]` mapping we touched on briefly, in an earlier lesson. Ultimately this mapping indicates if a passed token is in the middle of an active flashloan. The value of this mapping is used in a check in the `repay` function we'll come to later.

We're then making the call to actually transfer the tokens to the passed receiverAddress.

```js
s_currentlyFlashLoaning[token] = true;
assetToken.transferUnderlyingTo(receiverAddress, amount);
receiverAddress.functionCall(
  abi.encodeCall(
    IFlashLoanReceiver.executeOperation,
    (address(token),
    amount,
    fee,
    msg.sender, // initiator
    params)
  )
);
```

`transferUnderlyingTo` we've seen before, it's only callable by `ThunderLoan` and simply calls `safeTransfer`, but what's this encoded `functionCall` doing?

### functionCall

The functionCall function is coming from the OpenZeppelin Address.sol library.

<details>
<summary>functionCall</summary>

```js
/**
 * @dev Performs a Solidity function call using a low level `call`. A
 * plain `call` is an unsafe replacement for a function call: use this
 * function instead.
 *
 * If `target` reverts with a revert reason or custom error, it is bubbled
 * up by this function (like regular Solidity function calls). However, if
 * the call reverted with no returned reason, this function reverts with a
 * {FailedInnerCall} error.
 *
 * Returns the raw returned data. To convert to the expected return value,
 * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
 *
 * Requirements:
 *
 * - `target` must be a contract.
 * - calling `target` with `data` must not revert.
 */
function functionCall(address target, bytes memory data) internal returns (bytes memory) {
    return functionCallWithValue(target, data, 0);
}

/**
 * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
 * but also transferring `value` wei to `target`.
 *
 * Requirements:
 *
 * - the calling contract must have an ETH balance of at least `value`.
 * - the called Solidity function must be `payable`.
 */
function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
    if (address(this).balance < value) {
        revert AddressInsufficientBalance(address(this));
    }
    (bool success, bytes memory returndata) = target.call{value: value}(data);
    return verifyCallResultFromTarget(target, success, returndata);
}
```

</details>


We can see, in the end of the chain of executions, we're hitting a very classic piece of code.

```js
(bool success, bytes memory returndata) = target.call{value: value}(data);
```

So, the ThunderLoan is ultimately taking all this encoded data:

```js
abi.encodeCall(
  IFlashLoanReceiver.executeOperation,
  (address(token),
  amount,
  fee,
  msg.sender, // initiator
  params)
);
```

...and sending it to the receiverAddress, this includes executing the IFlashLoanReceiver.executeOperation function.

This is clearly an integral and complex operation in Thunder Loan and we'll _definitely_ be trying to break it.

Taking a look at the test suite of Thunder Loan, we can actually get an idea of what the contract receiving a flash loan would look like by viewing `MockFlashLoanReceiver.sol`. This is an example of what a contract receiving a flash loan would look like.

<details>
<summary>MockFlashLoanReceiver</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IFlashLoanReceiver } from "../../src/interfaces/IFlashLoanReceiver.sol";
import { IThunderLoan } from "../../src/interfaces/IThunderLoan.sol";

contract MockFlashLoanReceiver {
    error MockFlashLoanReceiver__onlyOwner();
    error MockFlashLoanReceiver__onlyThunderLoan();

    using SafeERC20 for IERC20;

    address s_owner;
    address s_thunderLoan;

    uint256 s_balanceDuringFlashLoan;
    uint256 s_balanceAfterFlashLoan;

    constructor(address thunderLoan) {
        s_owner = msg.sender;
        s_thunderLoan = thunderLoan;
        s_balanceDuringFlashLoan = 0;
    }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        address initiator,
        bytes calldata /*  params */
    )
        external
        returns (bool)
    {
        s_balanceDuringFlashLoan = IERC20(token).balanceOf(address(this));
        if (initiator != s_owner) {
            revert MockFlashLoanReceiver__onlyOwner();
        }
        if (msg.sender != s_thunderLoan) {
            revert MockFlashLoanReceiver__onlyThunderLoan();
        }
        IERC20(token).approve(s_thunderLoan, amount + fee);
        IThunderLoan(s_thunderLoan).repay(token, amount + fee);
        s_balanceAfterFlashLoan = IERC20(token).balanceOf(address(this));
        return true;
    }

    function getBalanceDuring() external view returns (uint256) {
        return s_balanceDuringFlashLoan;
    }

    function getBalanceAfter() external view returns (uint256) {
        return s_balanceAfterFlashLoan;
    }
}

```

</details>


Let's consider this example implementation of executeOperation for a better idea of how funds are handled once borrowed:

```js
function executeOperation(
    address token,
    uint256 amount,
    uint256 fee,
    address initiator,
    bytes calldata /*  params */
)
    external
    returns (bool)
{
    s_balanceDuringFlashLoan = IERC20(token).balanceOf(address(this));
    if (initiator != s_owner) {
        revert MockFlashLoanReceiver__onlyOwner();
    }
    if (msg.sender != s_thunderLoan) {
        revert MockFlashLoanReceiver__onlyThunderLoan();
    }
    IERC20(token).approve(s_thunderLoan, amount + fee);
    IThunderLoan(s_thunderLoan).repay(token, amount + fee);
    s_balanceAfterFlashLoan = IERC20(token).balanceOf(address(this));
    return true;
}
```

Alright - strictly speaking, it doesn't look like this is doing anything. This function is acquiring the balance received, doing some checks to make sure the function is called by the right user and then it's repaying the loan with the fee added.

A whole loan flow looks something like this:

![thunderloan-flashloan1](/security-section-6/33-thunderloan-flashloan/thunderloan-flashloan1.png)

After the flash loan is executed, this function closes with a very important check:

```js
uint256 endingBalance = token.balanceOf(address(assetToken));
if (endingBalance < startingBalance + fee) {
    revert ThunderLoan__NotPaidBack(startingBalance + fee, endingBalance);
}
s_currentlyFlashLoaning[token] = false;
```

Thunder Loan determines the ending balance and performs a comparison with startingBalance + fee. If this loan wasn't paid back with the fee - everything will revert!

### Wrap Up

Whew, this was a complex one, but I think we've got a better understanding of how this flash loan functionality is being handled here.

A great next step would be to look up how Aave or other flash loan providers handle flash loans and see how Thunder Loan might differ.

No obvious issues again ...
