---
title: Importing from NPM & GitHub
---

*Follow along this chapter with the video bellow*

*Follow along this chapter with the video bellow*<iframe width="560" height="315" src="https://www.youtube.com/embed/gOQ6Ylk0Tf0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


In Ethereum contract development, we frequently need to interface with other smart contracts. This usually means importing and dealing with potentially complex and numerous interfaces which can make our contracts untidy and difficult to manage. Is there a better way to do this? Let's explore how to streamline this process in Ethereum's programming environment, the Remix IDE, using Chainlink contracts as an example.


### Understanding Interfaces

The purpose of an interface is to specify the contract's functions and addresses that we want to use or interact with. However, managing many interfaces within our contracts can clutter our files and make working with them cumbersome.

Consider using the SmartContract interface as an example:

```js
interface SmartContract {
    function someFunction() external view returns(uint, uint);
}
```

In the case where we are working with a contract that isn't in our project's local directories such as SimpleStorage, we've learnt that we can easily import the contract by stating `import "./SimpleStorage.sol"` at the top of our contract file.

But what if the contract you want to work with isn't locally stored in your project? Can we still import it as we did with SimpleStorage?

### Direct Imports from GitHub

The good news is, contracts hosted on GitHub can be directly imported into your project. To demonstrate, let's take the example of the `AggregatorV3Interface` contract from Chainlink. We didn't create this interface, and it isn't stored locally in our project's directory.

One approach could be to copy the entire code, create a new file within our project (for example, `AggregatorV3Interface.sol`), paste the copied code, and then import this file into our contract. Effective, but tedious.

```js
import "./AggregatorV3Interface.sol";
```

Is there a more efficient way? Let's return to the [Chainlink documentation](https://docs.chain.link/docs/using-chainlink-reference-contracts). As we scroll down, we notice an `import` statement.

```js
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
```

This import command contains the path that corresponds to the `AggregatorV3Interface.sol` GitHub repository. This means we can directly import the contract from GitHub or NPM, ridding us of the need to manually copy and paste.

### Understanding the Import Method

To further comprehend what this import does, let's dissect it. `@chainlink/contracts` is a package existing on NPM (Node Package Manager), it consists of different versions of combinations of code that we can download and use. This package is directly derived from Chainlink's GitHub repository. The rest of the path tells Remix specifically which file we want to import.

Remix is intelligent enough to interpret this `import`, observing `@chainlink/contracts` as referring to the NPM package. Consequently, Remix downloads all the necessary code from NPM, which is essentially sourced directly from GitHub.

Adding the `import` statement to our contract is, therefore, equal to copy-pasting the entire interface at the top of our contract. Simplifying our effort and reducing clutter.

```js
    pragma solidity 0.8.18;
    import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
    contract MyContract {}
```

After adding the `import` statement, we can successfully compile the `AggregatorV3Interface` contract. Badaboom, badaboom.

<img src="/solidity/remix/lesson-4/imports/imports1.png" style="width: 100%; height: auto;">

Indeed, this method ensures we are following efficient development practices and keeps our code clean and manageable.

## Conclusion

It's crucial to regularly wise up to new and efficient tricks to keep our code clean and easier to manage. Importing contracts directly from NPM or GitHub is one such smart method! Happy coding.