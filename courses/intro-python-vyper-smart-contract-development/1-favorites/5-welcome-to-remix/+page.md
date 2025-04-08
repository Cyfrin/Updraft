## Welcome to Remix!

We're going to begin by getting familiar with Remix, an Integrated Development Environment, or IDE, that's phenomenal for helping us visualize our smart contracts. We'll be using Remix throughout the course to build smart contracts using Vyper, a popular smart contract language.

Remix has many features, including a built-in AI assistant that helps us understand concepts. While AI can be very useful, we need to understand the fundamentals of smart contract programming. AI can't always understand or provide accurate information about advanced concepts.

### Getting Started with Remix

1.  Open the Remix IDE. You can find it at `remix.ethereum.org`.
2.  Click on "New File" under the "Solidity/Vyper/EVM" section.
3.  Choose "Vyper" as the file type and name your contract, e.g., `MinimalContract.vy`.
4.  In this new file, add a basic Vyper smart contract template:

```python
# Minimal Contract
# pragma version >=0.4.1

def hello() -> String[11]:
    return "Hello World"
```

5.  Save the file.
6.  Go to your IDE's left panel and click on "Deploy" under the "Solidity/Vyper/EVM" section.

### Working with the Vyper Compiler

1.  Click on the "Plugin Manager" button at the bottom of the Remix IDE.
2.  In the search bar, type "vyper."
3.  Activate the "Vyper Compiler" module.
4.  You will now see the "Vyper Compiler" section on the left-hand side of the Remix IDE.
5.  Click the "Compile favorites.vy" button to compile our smart contract.

You can also access more advanced compiler settings if you click on the "Advanced Compiler Settings" button. This will allow you to set up your own local Vyper Compiler, but we will be using the remote compiler for now.
