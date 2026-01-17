---
title: Advanced Solidity Pre-requisites
---

_Follow along the with the video_

---

Let's look at a couple advanced solidity concepts that will be important to understand as you progress through this course.

## The Core of Smart Contracts: Storage

The first advanced feature we'll be covering today is storage in smart contracts. Every smart contract includes this integral element. This critical component is the space allotted to your variables within the contract.

When you create a state variable within your contract, an individual storage slot is carved out just for that variable.

It's worth noting, however, that constants or immutable variables do not occupy space in storage. This unique trait is due to their nature of being stored directly within the contract's bytecode.

To illustrate:

![block fee](/security-section-1/7-advanced-solidity/sol2.png)

### Hands-on Learning with Code

You can see this yourself through a few commands in Foundry. In the above contract, if we use...

```bash
forge inspect Counter storage
```

We'll get a readout of the storage slots in our `Counter` contract which looks like this:

```bash
"storage": [
    {
      "astId": 44623,
      "contract": "src/Counter.sol:Counter",
      "label": "number1",
      "offset": 0,
      "slot": "0",
      "type": "t_uint256"
    },
    {
      "astId": 44625,
      "contract": "src/Counter.sol:Counter",
      "label": "number2",
      "offset": 0,
      "slot": "1",
      "type": "t_uint256"
    },
    {
      "astId": 44630,
      "contract": "src/Counter.sol:Counter",
      "label": "number4",
      "offset": 0,
      "slot": "2",
      "type": "t_uint256"
    }
  ],
```

Notice how the variable `number3` isn't returned. This is because this variable is contained as a constant within the contract's bytecode.

> Remember, always experiment with code, because it's in the _doing_ that we grasp the most complex concepts!

### Wrapping Up with a Video Recap

The next lesson will be a quick video refresher on storage to get up to speed on the concept and prepare for the harder stuff to come!
