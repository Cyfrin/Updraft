## HTML Fund Me: How MetaMask Works with your Browser

The first thing to understand when working with a website is this MetaMask bit.

We can inspect the website by right-clicking and hitting "inspect". This opens a window that includes a console, which is a live JavaScript shell. This shell contains information about the browser.

If we type `window` into the console, we get a list of functions that we can call on this window object. One of the objects included in the window is the `window.ethereum` object. MetaMask injects this object into the browser. This is how websites interact with MetaMask to send transactions.

If we open the same website in a browser that doesn't have MetaMask installed, the `window.ethereum` object will be undefined. This is because the browser doesn't have an API to connect to MetaMask.

The MetaMask documentation includes information on how to send and work with the `window.ethereum` object.

Now in our HTML Fund Me F23 project, we can scroll over to the `index.js` file, where we can see the code the website uses to interact with a wallet. One of the first things most websites do is check to see if MetaMask exists. This is done with the following line:

```python
if (typeof window.ethereum !== "undefined")
```

If MetaMask does exist, they'll call the following function:

```python
await ethereum.request({ method: "eth_requestAccounts" })
```

This function allows the website to see which accounts the user has available to send transactions from. It doesn't expose the private key, but it lets the website send transactions for the user to sign.

In the HTML code for this project, there is a button called `connectButton`. In the JavaScript code, the following line finds the `connectButton` in the HTML:

```python
const connectButton = document.getElementById("connectButton")
```

The `connectButton`'s `onclick` event calls the `connect` function. This function checks if MetaMask is present, then attempts to connect to an account using the following line:

```python
await ethereum.request({ method: "eth_requestAccounts" })
```

If we go to the MetaMask extension, we can see that we're not connected to the site. However, if we click the `connectButton` in the website, a MetaMask popup appears. This popup asks which account we want to connect. We can then select an account to connect.

We can then call other functions, like `getBalance`, `withdraw`, or `fund`. These functions interact with the Foundry Fund Me contract that we deployed.

We've hard-coded the contract address and ABI into a `constants.js` file:

```python
export const contractAddress = "0xe7f1725e7734ce288f8367e1bb043e90db35f0512"
```

The contract address and ABI are needed to interact with the deployed contract.

To connect to a local anvil chain that we deployed the contract to, we open a terminal and run the following command:

```bash
make anvil
```

This will start a local anvil chain. We can then run the following command to deploy the contract to this chain:

```bash
make deploy
```

Now, we can go back to our website and hit the "connect" button. We can then interact with the contract using the "getBalance", "withdraw", and "fund" functions. When we hit the "fund" button, a MetaMask popup appears. This popup lets us sign the transaction that the website sends to the MetaMask.

The website never accesses the private key. The private key remains secure in the MetaMask extension.
