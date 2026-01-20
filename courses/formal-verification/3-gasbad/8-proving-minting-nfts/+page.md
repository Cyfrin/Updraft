---
title: Proving Minting NFTs
---

_Follow along with this video:_

---

### Proving Minting NFTs

With a couple sanity checks out of the way, let's try something much harder and validate that `minting mints one NFT`. We'll set this up as a `rule` in our `NftMock.spec` file. We'll also have to add the `mint` function to our methods block, don't forget!

```js
methods {
    function totalSupply() external returns uint256 envfree;
    function mint() external;
}

rule minting_mints_one_nft() {
    // Arrange
    // Act
    // Assert
}
```

For this test, we're not going to configure things as `envfree`. This will afford us an opportunity to practice working with environment variables in `Certora`. We're going to set the `msg.value to 0` and assure that the address calling our mint function is always an expected `minter` address.

```js
methods {
    function totalSupply() external returns uint256 envfree;
    function mint() external;
}

rule minting_mints_one_nft() {
    // Arrange
    env e;
    address minter;

    require e.msg.value == 0;
    require e.msg.sender == minter;
    // Act
    // Assert
}
```

Now, in order to assure only 1 NFT is minted, we'll need to check the balance before and after minting. We can do this by adding balanceOf to our methods block and calling it in our test as demonstrated below.

```js
methods {
    function totalSupply() external returns uint256 envfree;
    function mint() external;
    function balanceOf(address) external returns uint256 envfree;
}

rule minting_mints_one_nft() {
    // Arrange
    env e;
    address minter;

    require e.msg.value == 0;
    require e.msg.sender == minter;
    uint256 balanceBefore = balanceOf(minter);
    // Act
    // Assert
}
```

It's time to act and finally mint the NFT, any time we want to reference the current contract that `Certora` is configured to verify, we can do so using `currentContract`. We'll then `assert` that the balance of `minter` _after_ the mint call is equal to the `balanceBefore` + 1.

```js
methods {
    function totalSupply() external returns uint256 envfree;
    function mint() external;
    function balanceOf(address) external returns uint256 envfree;
}

rule minting_mints_one_nft() {
    // Arrange
    env e;
    address minter;

    require e.msg.value == 0;
    require e.msg.sender == minter;
    uint256 balanceBefore = balanceOf(minter);
    // Act
    currentContract.mint(e);
    // Assert
    assert(balanceOf(minter) == balanceBefore + 1, "Minting should only mint 1 NFT.");
}
```

The above would absolutely work for our purposes, but it's worth pointing out that `uint256`, as we know, has a max value, and adding to that value is going to cause `overflow` and result in potential issues with our test. We can avoid this by instead typing `balanceBefore`, and the result of `balanceOf` in our assert statement, as `mathint`.

```js
methods {
    function totalSupply() external returns uint256 envfree;
    function mint() external;
    function balanceOf(address) external returns uint256 envfree;
}

rule minting_mints_one_nft() {
    // Arrange
    env e;
    address minter;

    require e.msg.value == 0;
    require e.msg.sender == minter;
    mathint balanceBefore = balanceOf(minter);
    // Act
    currentContract.mint(e);
    // Assert
    assert(to_mathint(balanceOf(minter)) == balanceBefore + 1, "Minting should only mint 1 NFT.");
}
```

### Running the Prover

With that, we can comment out our totalSupply invariant and run our prover to see what Certora can find.

```bash
certoraRun ./certora/conf/NftMock.conf
```

And, after a brief wait for the server/process, we should see a successfully verification.

![proving-minting-nfts1](/formal-verification-3/7-proving-minting-nfts/proving-minting-nfts1.png)

Good job!
