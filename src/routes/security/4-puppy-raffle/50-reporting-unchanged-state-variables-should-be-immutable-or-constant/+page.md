---
title: Reporting - Unchanged State Variables Should Be Immutable Or Constant
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889509299/cf34d0751c?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Ethereum Smart Contracts: A Gas Optimization Audit

Keeping a keen eye on your smart contracts' gas usage can significantly improve your decentralized application's performance. When conducting an Ethereum smart contract audit, one aspect we should never overlook is **gas optimization**.

In this post, we'll go over an audit focused on gas optimization. By the end, you'll understand why specific variables in your smart contract need to be set as constant or immutable and learn how it affects the gas usage and elevates your smart contract's efficiency.

![](https://cdn.videotap.com/w2OveccwS4ZLVJV3AAGV-5.63.png)

## Defining the Audit Scope

We'll start our audit with a neat organization. First, we'll craft a Findings section—an overview of the areas we intend to audit.

```markdown
| Gas (g) | Status | Description ||---------|--------|-------------|| G1 | | || G2 | | |
```

G1 refers to checking for the use of constant or immutable variables, a standard we will adhere to throughout the audit.

## Diving into Audit Findings

'Mutable or constant?'—that's the first question we'll broach. Answering it lets us decide which state variables should be declared **constant** or **immutable**.

```markdown
| Gas (g) | Status | Description ||---------|--------|-------------|| G1 | Unchanged | State Variables - constant or immutable |
```

For instance, when auditing a contract regarding a raffle, we came across a variable `raffleDuration`. As it's a duration that, logically, wouldn't change throughout the contract's lifecycle, it should be declared as immutable.

Here's an example:

```js
uint256 public immutable raffleDuration;
```

Here, we'll note in our audit findings:

```markdown
| Gas (g) | Audit Findings ||---------|----------------|| G1 | `raffleDuration` for the 'Puppy Raffle' should be marked as immutable. |
```

Now, we'll have to justify our decision. Hence, a brief description should be included in our audit findings:

> "Reading from storage is much more expensive than reading from a constant or immutable variable."

We mark this down as written and let's move forward.

_NOTE: One should remember throughout an audit, chances are more similar instances may be found later. Always be on a watchful lookout._

## Recheck for Constant Variables

Our next audit target is a seemingly innocuous but incredibly significant feature of any smart contract—necessary constants.

When re-auditing the same 'Puppy Raffle' contract, we found three variables that should ideally be declared as **constant**:

```js
string public constant rareImageURI;
string public constant legendaryURI;
```

Now, we'll update our audit findings table:

```markdown
| Gas (g) | Audit Findings ||---------|----------------|| G2 | `rareImageURI` and `legendaryURI` should be marked as constant. |
```

```markdown
**Remember:** Keeping your variables as constant when possible not only optimizes gas but also augments security by keeping those variables unchangeable.
```

## Conclusion

Conducting an audit with a focus on gas optimization is integral for your Ethereum smart contracts. It not only saves your users from paying exorbitant gas fees but also enhances your DApp's performance significantly. While `constant` and `immutable` are two powerful tools to achieve this, they're not the only ones. Nonetheless, we hope that this blog post has given you a good start on your gas optimization journey. The key is always to question—if a variable should indeed be changeable or not. A written plan always helps, just like our findings table here!

Happy auditing and optimizing!
