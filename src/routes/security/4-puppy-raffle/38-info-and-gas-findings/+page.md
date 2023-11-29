---
title: Info and Gas Findings
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889508945/1dc2165b9d?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Boosting Code Quality with Solidity: An Audit Analysis

In our journey to mastering Solidity, we have encountered a few gaps and opportunities for improvement in our code quality, especially during private audits. This blog post will guide you through some key areas to call out in code during an audit: naming conventions, versioning, the risk of magic numbers, addressing supply chain attacks, and opportunities for gas optimization.

## Naming Conventions: Clarifying Storage Variables

One of the easiest ways to improve code readability is to use clear naming conventions. In the codebase for our audit, the names of the storage variables were found lacking. A beneficial standard to maintain is adding a `"s_"` prefix to every storage variable name.

```js
uint256 public s_variableName;
```

![](https://cdn.videotap.com/HUA3lLveQmbRWkwQgBnq-36.53.png)

Even though modifying the names of the storage variables wouldn't immediately cause a drastic change, it's one of our key recommendations for better readability and organization of the code.

## The Risk of Different Solidity Versions

Continuing with the code analysis, we found the use of different Solidity versions thanks to an indicator—the caret (`^`)—placed at the top of the code.

```js
pragma solidity ^0.5.0;
```

While the caret signifies that any version compatible with `0.5.0` could be used, it's not a best practice. The ideal way is to stick with a single version of Solidity.

```js
pragma solidity 0.5.0;
```

By nailing down the exact version of Solidity, it guarantees compatibility and stability when running tests.

![](https://cdn.videotap.com/q76csvaY6UkAse0ikj5X-97.42.png)

## Ditch Those Magic Numbers:

Our audit found hardcoded numbers (`80` and `20`) in the middle of the codebase. It's not desirable; these “magic numbers” create confusion as other developers would not understand why these numbers are there. We propose adding a descriptor that provides context.

```js
uint256 public constant prizePoolPercentage = 80;
uint256 public constant feePercentage = 20;
uint256 public constant poolPrecision = 100;
```

Now, rather than ambiguous magic numbers, we have self-explanatory constants which add meaning and readability to our code.
_Note: 0 and 1 are often exceptions to this rule because of their ubiquitous use. However, you could still create constants for these as well._

![](https://cdn.videotap.com/wIpzaZwE6d1VfGkBsRLt-146.13.png)

## Defense against Supply Chain Attacks

When using external libraries or contracts, it's crucial to know their security status and ensure they're free from vulnerabilities. In our code audit, we used the OpenZeppelin library; however, it's crucial to check disclosures for **each specific version** used.

> You can refer to [OpenZeppelin’s security tab](https://github.com/OpenZeppelin/openzeppelin-contracts/security/advisories) to get bug bounty info and security disclosures.

Here's an example of a security disclosure:

_“Governor Votes Quorum Fraction: Updates to Quorum may affect past defeated proposals.”_

It's crucial to verify that none of the contracts used in your project, like Ownable or Address, are affected by the issues present in the specific version of OpenZeppelin used.

![](https://cdn.videotap.com/YktdcyF0s9wvili0y7mu-207.02.png)

## Gas Optimization Opportunities

Gas optimization is often reported as part of informational findings in an audit. For example, in our audit, we found that the `raffleDuration` variable is declared as a storage variable, even though it never changes.

```js
uint public raffleDuration = 100;
```

Instead, declaring it as an immutable variable would be more gas-efficient and a better practice.

```js
uint public immutable raffleDuration = 100;
```

![](https://cdn.videotap.com/CAyDqXFyoDcDU80R3SyW-255.73.png)

Remember, compared to storage variables, mutable variables are cheaper to use and crucial for gas-efficiency in your smart-contracts. Would you like to deepen your understanding of Immutable vs. Storage variables? We recommend our [Foundry Course](https://github.com/Cyfrin/foundry-full-course-f23).

As a summary, enhancing code quality is not always about finding impactful bugs. It's also about refining your codebase to improve readability, maintainability, performance, and security—even if the effects aren't immediately observable. In the long run, it makes your codebase robust, efficient and less prone to errors.
