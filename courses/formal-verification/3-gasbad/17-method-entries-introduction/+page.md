---
title: Method Entries Introduction
---

_Follow along with this video:_

---

### Method Entries Introduction

Our methods block til now has been fairly minimalistic, but this section has a lot of variety in what we can do with it. In NftMock.spec we were using one of the simpler methodologies, [**`exact entries`**](https://docs.certora.com/en/latest/docs/cvl/methods.html#exact-entries).

### Exact Entries

Exact entries are telling the prover 'here's a particular function, on a particular contract, test it'. This can be a little restrictive, but offers a lot of granular control when necessary.

![method-entries-introduction1](/formal-verification-3/16-method-entries-introduction/method-entries-introduction1.png)

So, in our simple NftMock.spec example, we were effectively doing this:

```js
methods {
    function currentContract.mint() external;
    function currentContract.totalSupply() external returns(uint256);
    function currentContract.balanceOf(address) external returns(uint);
}
```

### Wildcard Entries

In addition to `exact entries` however, we have other options available to us, such as [**`wildcard entries`**](https://docs.certora.com/en/latest/docs/cvl/methods.html#wildcard-entries).

![method-entries-introduction2](/formal-verification-3/16-method-entries-introduction/method-entries-introduction2.png)

What `wildcard entries` allow us to do is abstract out which contract a given function is being called on.

```js
methods {
    function _.totalSupply() external returns(uint256);
}
```

A syntax like the above tells the `Certora` prover to call `totalSupply` on any contract which contains this function! We can take this a step further in our degree of control of these methods by applying a `summary declaration`, asserting that the calling of this function, from any contract, should return a configured value, or behave a configured way.

```js
methods {
    function _.totalSupply() external returns(uint256) => ALWAYS(1);
}
```

This tells `Certora` that any `totalSupply` function, found within any scoped file/contract, should return the value of `1`.

### Catch-all Entries

Additionally, additionally - there are `catch-all entries`. These function almost opposite to wildcard entries. Catch-all entries allow us to specify that all function of a given contract are to behave the same way.

![method-entries-introduction3](/formal-verification-3/16-method-entries-introduction/method-entries-introduction3.png)

Applied to our previous example, the syntax would look something like this:

```js
methods {
    function currentContract._() external returns(uint256) => ALWAYS(1);
}
```

The above is telling the `Certora` prover that any function withing the currentContract being verified should always return 1. Perhaps a strange thing to configure in our case, but you could imagine similar methodologies being applied to libraries which are in scope, but inconsequential to what is being verified at the time.

### Wrap Up

Now that we have a better understanding of the potential power of our methods block implementation, we're ready to look more closely at summary declarations specifically and how they can be applied to our GasBadNftMarketplace protocol.

If you're interesting in reading more about the variety of entrie methods and annotations which can be used in the methods block, I encourage you to dive deeper into the [**Certora Docs**](https://docs.certora.com/en/latest/docs/cvl/methods.html) for more.

See you in the next lesson for some more examples of summary declaration!
