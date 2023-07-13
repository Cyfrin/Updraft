---
title: Solidity Imports
---

*If you'd like, you can follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/CNDzi1GuWyg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


In this lesson, we will look at a more improved way of organizing your Solidity contract files using the `import` statement, making the task of making any changes in your contract files much simpler. We’ll also address potential issues around consistency in Solidity version between multiple files, and we'll focus primarily on the more advanced import method called `named imports` that you should always use.

## The Immaculate Import

Most programmers are familiar with the concept of import – it's like adding a new tool to your toolbox, allowing you to use code from different files without cluttering your current project file. In Solidity, this is no different.

Let's say we are dealing with two contract files: `SimpleStorage.sol` and `StorageFactory.sol`. Prior to using `import`, you would have to constantly copy-paste your contents of `SimpleStorage.sol` into `StorageFactory.sol` and vice-versa if any changes are made. If you're thinking that's too much work, then you are absolutely right!

Instead, you can just use the `import` statement:

```js
import "./SimpleStorage.sol";
```

With this single line of code, you can effortlessly incorporate `SimpleStorage.sol` into `StorageFactory.sol`, drastically improving your workflow. It's as good as planting the entire `SimpleStorage.sol` within `StorageFactory.sol`, but without the mess.

## Manage Your Solidity Versions

With multiple contracts in place, a word of caution: be wary of the versions of Solidity you're using. This is crucial because while Remix will automatically adjust the version upwards to ensure compatibility (e.g., bumping `0.8.16` to `0.8.18`), going the other direction can lead to compile errors. Ensuring that you are consistent with your version of Solidity is vital for smooth compiling of all your contracts.

## Named Imports: Your New Best Friend

Although the import statement brings a breath of fresh air into your code organization, diving a little deeper will reveal a even better way of handling imports - the named imports.

Imagine `SimpleStorage.sol` has multiple contract files (`SimpleStorage2`, `SimpleStorage3`, `SimpleStorage4`) which are quite extensive in size.

```js
import "./simplestorage.sol"
```

Using this statement will import everything from `SimpleStorage.sol`, including all the bulky contract files, leading to a far more expensive deployment of the `StorageFactory.sol`.

Here's where named imports come into play. Named imports allow you to cherry pick the exact contracts you need:

```js
import { SimpleStorage } from "./SimpleStorage.sol";
```

Even if your `SimpleStorage.sol` has other contracts, named imports allow you to just import what you need (`SimpleStorage`), thus avoiding any unecessary imports.

If you need multiple contracts, named imports have got you covered:

```js
import { SimpleStorage, SimpleStorage2 } from "./SimpleStorage.sol";
```

Now, this will only import `SimpleStorage` and `SimpleStorage2`, without bringing in any other possibly gargantuan contracts present in your `SimpleStorage.sol` file.

By sticking to named imports, you're not just making your future coding lives simpler, but you're also staying ahead of the curve. Incredibly, just by employing named imports, you're setting yourself apart, ahead of 80% of current Solidity developers.

## Wrapping Up

Now we've explored a more effective way of managing our Solidity contract files through the use of import statements, understood the need for solidity version management, and learned how to go one step further with named imports. Congratulations, you're now more equipped to organize your code, manage multiple contract files, and make your Solidity programming more efficient and tidy.

Remember, in coding and in life, always aim to be incredibly efficient, even if that means being a little lazy.