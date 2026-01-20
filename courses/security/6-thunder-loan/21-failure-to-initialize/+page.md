---
title: Exploit - Failure to Initialize
---

---

### Exploit - Failure to Initialize

With the context of proxies and the use of initializers understood, the first question that always comes to mind for me is:

**_Are things being initialized properly?_**

If a protocol fails to initialize a value, it could potentially have dire consequences.

Even though this is technically a vulnerability in ThunderLoan.sol, and we're jumping place a little bit. Let's head there and make a note of things as well as definite what this potential exploit looks line this this code base.

```js
// Audit-Low: Initializer can be front-run
function initialize(address tswapAddress) external initializer {
    __Ownable_init(msg.sender);
    __UUPSUpgradeable_init();
    __Oracle_init(tswapAddress);
    s_feePrecision = 1e18;
    s_flashLoanFee = 3e15; // 0.3% ETH fee
}
```

**_What's meant by `Initializer can be front-run`?_**

Well, imagine the hypothetical of a user deploying this protocol and forgetting to initialize these attributes, or worse yet, the initialize function is sent to the mempool and an MEV bot initializes first, allowing it to set the tswapAddress to anything they want!

We know that our initializer in `ThunderLoan.sol` is setting the value of our s_poolFactory variable. Let's consider what would happen if this was uninitialized and exploited.

```js
function getPriceInWeth(address token) public view returns (uint256) {
    address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
    return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
}
```

It can be seen in our `OracleUpgradeable.sol` contract that this variable is being used to determine which pool to call a price feed from. A malicious actor, exploiting the initialize function, could effectively set this price feed to report anything they wanted (or more likely the `getPriceInWeth` function would break entirely)!

### Mitigation

The mitigation for something like a failure to initialize is kinda tough to say. It's reliant on the protocol owners acting in an expected way and assuring things are set appropriately when they should be.

Often I will recommend including the initialization directly in a protocol's deployment scripts to assure this is being called every time.

### Wrap Up

`Failure to initialize` is an easily overlooked attack opportunity unfortunately, and it comes with some wide spread potential consequences. The impact of failing to initialize can be as broad as the types of protocols that exist, but executing best practices such as adding these initializing considerations directly into a deploy script can go a long way towards mitigating potential heartache.

In the next lesson we'll take a closer look at a failure to initialize, with a hands-on example to play with in Remix.

See you there!
