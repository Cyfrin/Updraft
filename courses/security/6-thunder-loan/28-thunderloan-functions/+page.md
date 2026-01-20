---
title: ThunderLoan.sol - Functions
---

### ThunderLoan.sol - Functions

<details>
<summary>ThunderLoan.sol</summary>

```js
//      .edee...      .....       .eeec.   ..eee..
//    .d*"  """"*e..d*"""""**e..e*""  "*c.d""  ""*e.
//   z"           "$          $""       *F         **e.
//  z"             "c        d"          *.           "$.
// .F                        "            "            'F
// d                                                   J%
// 3         .                                        e"
// 4r       e"              .                        d"
//  $     .d"     .        .F             z ..zeeeeed"
//  "*beeeP"      P        d      e.      $**""    "
//      "*b.     Jbc.     z*%e.. .$**eeeeP"
//         "*beee* "$$eeed"  ^$$$""    "
//                  '$$.     .$$$c
//                   "$$.   e$$*$$c
//                    "$$..$$P" '$$r
//                     "$$$$"    "$$.           .d
//         z.          .$$$"      "$$.        .dP"
//         ^*e        e$$"         "$$.     .e$"
//           *b.    .$$P"           "$$.   z$"
//            "$c  e$$"              "$$.z$*"
//             ^*e$$P"                "$$$"
//               *$$                   "$$r
//               '$$F                 .$$P
//                $$$                z$$"
//                4$$               d$$b.
//                .$$%            .$$*"*$$e.
//             e$$$*"            z$$"    "*$$e.
//            4$$"              d$P"        "*$$e.
//            $P              .d$$$c           "*$$e..
//           d$"             z$$" *$b.            "*$L
//          4$"             e$P"   "*$c            ^$$
//          $"            .d$"       "$$.           ^$r
//         dP            z$$"         ^*$e.          "b
//        4$            e$P             "$$           "
//                     J$F               $$
//                     $$               .$F
//                    4$"               $P"
//                    $"               dP    Gilo94'
// https://www.asciiart.eu/nature/lightning
//  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄         ▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
// ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░░▌      ▐░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
//      ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
//      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌ ▐░▌   ▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
//      ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//      ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌   ▐░▌ ▐░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀
//      ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌
//      ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌
//      ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌       ▐░▌
//       ▀       ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀
//
//  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄
// ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌
// ▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌
// ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌
// ▐░▌          ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌
// ▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌
// ▐░▌          ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌   ▐░▌ ▐░▌
// ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌
// ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌     ▐░▐░▌
// ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌      ▐░░▌
//  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀        ▀▀
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { AssetToken } from "./AssetToken.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OracleUpgradeable } from "./OracleUpgradeable.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { IFlashLoanReceiver } from "../interfaces/IFlashLoanReceiver.sol";

contract ThunderLoan is Initializable, OwnableUpgradeable, UUPSUpgradeable, OracleUpgradeable {
    error ThunderLoan__NotAllowedToken(IERC20 token);
    error ThunderLoan__CantBeZero();
    error ThunderLoan__NotPaidBack(uint256 expectedEndingBalance, uint256 endingBalance);
    error ThunderLoan__NotEnoughTokenBalance(uint256 startingBalance, uint256 amount);
    error ThunderLoan__CallerIsNotContract();
    error ThunderLoan__AlreadyAllowed();
    error ThunderLoan__ExchangeRateCanOnlyIncrease();
    error ThunderLoan__NotCurrentlyFlashLoaning();
    error ThunderLoan__BadNewFee();

    using SafeERC20 for IERC20;
    using Address for address;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    mapping(IERC20 => AssetToken) public s_tokenToAssetToken;

    // The fee in WEI, it should have 18 decimals. Each flash loan takes a flat fee of the token price.
    uint256 private s_feePrecision;
    uint256 private s_flashLoanFee; // 0.3% ETH fee

    mapping(IERC20 token => bool currentlyFlashLoaning) private s_currentlyFlashLoaning;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event Deposit(address indexed account, IERC20 indexed token, uint256 amount);
    event AllowedTokenSet(IERC20 indexed token, AssetToken indexed asset, bool allowed);
    event Redeemed(
        address indexed account, IERC20 indexed token, uint256 amountOfAssetToken, uint256 amountOfUnderlying
    );
    event FlashLoan(address indexed receiverAddress, IERC20 indexed token, uint256 amount, uint256 fee, bytes params);

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/
    modifier revertIfZero(uint256 amount) {
        if (amount == 0) {
            revert ThunderLoan__CantBeZero();
        }
        _;
    }

    modifier revertIfNotAllowedToken(IERC20 token) {
        if (!isAllowedToken(token)) {
            revert ThunderLoan__NotAllowedToken(token);
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function initialize(address tswapAddress) external initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __Oracle_init(tswapAddress);
        s_feePrecision = 1e18;
        s_flashLoanFee = 3e15; // 0.3% ETH fee
    }

    function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
        AssetToken assetToken = s_tokenToAssetToken[token];
        uint256 exchangeRate = assetToken.getExchangeRate();
        uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
        emit Deposit(msg.sender, token, amount);
        assetToken.mint(msg.sender, mintAmount);
        uint256 calculatedFee = getCalculatedFee(token, amount);
        assetToken.updateExchangeRate(calculatedFee);
        token.safeTransferFrom(msg.sender, address(assetToken), amount);
    }

    /// @notice Withdraws the underlying token from the asset token
    /// @param token The token they want to withdraw from
    /// @param amountOfAssetToken The amount of the underlying they want to withdraw
    function redeem(
        IERC20 token,
        uint256 amountOfAssetToken
    )
        external
        revertIfZero(amountOfAssetToken)
        revertIfNotAllowedToken(token)
    {
        AssetToken assetToken = s_tokenToAssetToken[token];
        uint256 exchangeRate = assetToken.getExchangeRate();
        if (amountOfAssetToken == type(uint256).max) {
            amountOfAssetToken = assetToken.balanceOf(msg.sender);
        }
        uint256 amountUnderlying = (amountOfAssetToken * exchangeRate) / assetToken.EXCHANGE_RATE_PRECISION();
        emit Redeemed(msg.sender, token, amountOfAssetToken, amountUnderlying);
        assetToken.burn(msg.sender, amountOfAssetToken);
        assetToken.transferUnderlyingTo(msg.sender, amountUnderlying);
    }

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

        uint256 endingBalance = token.balanceOf(address(assetToken));
        if (endingBalance < startingBalance + fee) {
            revert ThunderLoan__NotPaidBack(startingBalance + fee, endingBalance);
        }
        s_currentlyFlashLoaning[token] = false;
    }

    function repay(IERC20 token, uint256 amount) public {
        if (!s_currentlyFlashLoaning[token]) {
            revert ThunderLoan__NotCurrentlyFlashLoaning();
        }
        AssetToken assetToken = s_tokenToAssetToken[token];
        token.safeTransferFrom(msg.sender, address(assetToken), amount);
    }

    function setAllowedToken(IERC20 token, bool allowed) external onlyOwner returns (AssetToken) {
        if (allowed) {
            if (address(s_tokenToAssetToken[token]) != address(0)) {
                revert ThunderLoan__AlreadyAllowed();
            }
            string memory name = string.concat("ThunderLoan ", IERC20Metadata(address(token)).name());
            string memory symbol = string.concat("tl", IERC20Metadata(address(token)).symbol());
            AssetToken assetToken = new AssetToken(address(this), token, name, symbol);
            s_tokenToAssetToken[token] = assetToken;
            emit AllowedTokenSet(token, assetToken, allowed);
            return assetToken;
        } else {
            AssetToken assetToken = s_tokenToAssetToken[token];
            delete s_tokenToAssetToken[token];
            emit AllowedTokenSet(token, assetToken, allowed);
            return assetToken;
        }
    }

    function getCalculatedFee(IERC20 token, uint256 amount) public view returns (uint256 fee) {
        //slither-disable-next-line divide-before-multiply
        uint256 valueOfBorrowedToken = (amount * getPriceInWeth(address(token))) / s_feePrecision;
        //slither-disable-next-line divide-before-multiply
        fee = (valueOfBorrowedToken * s_flashLoanFee) / s_feePrecision;
    }

    function updateFlashLoanFee(uint256 newFee) external onlyOwner {
        if (newFee > s_feePrecision) {
            revert ThunderLoan__BadNewFee();
        }
        s_flashLoanFee = newFee;
    }

    function isAllowedToken(IERC20 token) public view returns (bool) {
        return address(s_tokenToAssetToken[token]) != address(0);
    }

    function getAssetFromToken(IERC20 token) public view returns (AssetToken) {
        return s_tokenToAssetToken[token];
    }

    function isCurrentlyFlashLoaning(IERC20 token) public view returns (bool) {
        return s_currentlyFlashLoaning[token];
    }

    function getFee() external view returns (uint256) {
        return s_flashLoanFee;
    }

    function getFeePrecision() external view returns (uint256) {
        return s_feePrecision;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner { }
}
```

</details>


Continuing with our review of the ThunderLoan.sol contract, the very next bit of code we approach may seem unfamiliar.

### Constructor

```js
// @custom:oz-upgrades-unsafe-allow constructor
constructor() {
    _disableInitializers();
}
```

**_What's going on here then?_**

`@custom:oz-upgrades-unsafe-allow constructor` is a line which tells static analyzer tools to ignore the fact that we have a constructor in our upgradeable contract. We do this to avoid false errors while allowing us to call `_disableInitializers` in our constructor. This prevents any initializer functions from being called erroneously in a constructor.

> **Remember:** Initializers can only be called once!

### Functions

We'll start with the `initialize` function. We went over it's purpose briefly, earlier in this section, but let's take a more granular approach this one.

```js
function initialize(address tswapAddress) external initializer {
    __Ownable_init(msg.sender);
    __UUPSUpgradeable_init();
    __Oracle_init(tswapAddress);
    s_feePrecision = 1e18;
    s_flashLoanFee = 3e15; // 0.3% ETH fee
}
```

- `__Ownable_init(msg.sender)` - This function is setting the original owner to msg.sender.
- `__UUPSUpgradeable_init` - sets up storage for UUPS (won't go too deep currently)
- `__Oracle_init(tswapAddress)` - sets the provided TSwap Address as the Oracle for Thunder Loan

Finally we have:

- s_feePrecision = 1e18;
- s_flashLoanFee = 3e15; // 0.3% ETH fee

We already pointed out that these should be set as constant variables, but otherwise initializing these values seems secure.

### Deposit Function

```js
function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
    emit Deposit(msg.sender, token, amount);
    assetToken.mint(msg.sender, mintAmount);
    uint256 calculatedFee = getCalculatedFee(token, amount);
    assetToken.updateExchangeRate(calculatedFee);
    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

We should see an issue immediately.

```js
// @Audit-Informational: Function has no NATSPEC.
```

From the understanding we've gleaned so far, we assume this function allows users to deposit tokens into the `Thunder Loan` protocol and receive `AssetTokens` in return.

The function takes an `IERC20 token` and a `uint256 amount`. It has modifiers which we've know from our review will revert is the amount passed is zero or if the token passed isn't set in the allowed mapping.

We'll want to consider how these allowed mappings are set as we haven't seen that yet, but otherwise things look great in this function set up.

Let's actually look at how AssetTokens are mapped now in `setAllowedToken`. I know this is jumping around, but it's important to better understand what `deposit` is doing.

### Surprise Pitstop to setAllowedToken

```js
function setAllowedToken(IERC20 token, bool allowed) external onlyOwner returns (AssetToken) {
    if (allowed) {
        if (address(s_tokenToAssetToken[token]) != address(0)) {
            revert ThunderLoan__AlreadyAllowed();
        }
        string memory name = string.concat("ThunderLoan ", IERC20Metadata(address(token)).name());
        string memory symbol = string.concat("tl", IERC20Metadata(address(token)).symbol());
        AssetToken assetToken = new AssetToken(address(this), token, name, symbol);
        s_tokenToAssetToken[token] = assetToken;
        emit AllowedTokenSet(token, assetToken, allowed);
        return assetToken;
    } else {
        AssetToken assetToken = s_tokenToAssetToken[token];
        delete s_tokenToAssetToken[token];
        emit AllowedTokenSet(token, assetToken, allowed);
        return assetToken;
    }
}
```

This function is a big conditional statement based on the boolean value the owner (onlyOwner) passes to the `allowed` parameter.

The owner passes a token and True or False value to this function.

- **If True:**

  - a check is performed to assure the token mapping doesn't already exist (the token isn't already allowed)

    ```js
    if (address(s_tokenToAssetToken[token]) != address(0)) {
        revert ThunderLoan__AlreadyAllowed();
    }
    ```

  - the name and symbol of ThunderLoan and the passed token are concatenated to generate the AssetToken name and symbol.

    - eg Name: ExampleToken, Symbol: et -> Name: ThunderLoanExampleToken, Symbol: tlet

    ```js
    string memory name = string.concat("ThunderLoan ", IERC20Metadata(address(token)).name());
    string memory symbol = string.concat("tl", IERC20Metadata(address(token)).symbol());
    ```

    This is the point I might as myself...

    ```js
    // What if the token passed doesn't have a name?
    ```

    We know there are certain tokens which the protocol outlines as compatible (`USDC`, `DAI`, `LINK`, `WETH`), but this would be a good opportunity to verify that they work as expected in circumstances like these.

    Referring back to the README we can also see, in Known Issues:

    ```
    We are aware that "weird" ERC20s break the protocol, including fee-on-transfer, rebasing, and ERC-777 tokens. The owner will vet any additional tokens before adding them to the protocol.
    ```

    It seems like something the protocol is very aware of, but might be worth pointing out anyway.

  - a new AssetToken contract is created

    - recall the constructor of AssetToken.sol - `constructor(
    address thunderLoan,
    IERC20 underlying,
    string memory assetName,
    string memory assetSymbol
)`

    ```js
    AssetToken assetToken = new AssetToken(address(this), token, name, symbol);
    ```

  - the passed token is mapped to this created AssetToken
    ```js
    s_tokenToAssetToken[token] = assetToken;
    ```
  - an event is emitted, `AllowedTokenSet`. This event is emitting the token, the generated AssetToken and whether allowed was set to True or False

    ```js
    emit AllowedTokenSet(token, assetToken, allowed);
    ```

    These look good, but always remember to verify the order and specific parameters being passed to emitted events!

  - assetToken is returned
    ```js
    return assetToken;
    ```

### Wrap Up

Everything seems secure in the `True` half of this conditional. Our passed token generates a new AssetToken contract which is then added to the s_tokenToAssetToken mapping.

Great.

In the next lesson, let's look at what happens if we _remove_ or disallow a mapping, setting a token to `False`.
