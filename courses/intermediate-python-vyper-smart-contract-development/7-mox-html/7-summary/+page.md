## HTML Fund Me Completed!

We've just finished a quick lesson on how websites interact with wallets. While it's short, this lesson is important for understanding how websites work when interacting with smart contracts.

We learned a very basic way of checking something called the "function selector" or "function signature" to make sure that a website isn't malicious and doesn't send a bad transaction.

We can connect to a wallet by injecting a browser extension into the browser. This can be achieved by checking the existence of `window.ethereum` in the browser.

If we hit the "connect" button, we can see in the wallet that we've successfully connected.

When a website sends a transaction, it first needs to obtain the provider or the RPC URL from MetaMask. This is often achieved by using the following code:

```python
const provider = new ethers.providers.Web3Provider(window.ethereum)
```

The above code essentially tells MetaMask that the website needs access to the network's RPC URL.

After connecting, a website can send transactions to our wallet. The code for a simple transaction might look like this:

```python
const transactionResponse = await contract.fund({
    value: ethers.utils.parseEther(ethAmount),
})
```

The above code sends a transaction to the wallet, which will then prompt us to sign the transaction by confirming.

This lesson was a brief overview of the basics of front-end and wallet interactions. As we go further in the course, we'll learn more about function selectors and function signatures and how we can ensure that we protect ourselves against malicious transactions.
