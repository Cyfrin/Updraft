---
title: Upgradeable Smart Contracts & Proxies
---

_Follow along the course with this video._

---

### Upgradeable Smart Contracts & Proxies

Welcome back! In this section we're going to learn all about upgradeable smart contracts and the inherent pros and cons that they bring.

As always, all the code we'll be working with can be found in the following repos:

[**Foundry Full Course**](https://github.com/Cyfrin/foundry-full-course-f23)

[**Upgradeable Smart Contracts**](https://github.com/Cyfrin/foundry-upgrades-f23)

At the forefront, I'm going to say explicitly:

**_Upgradeable smart contracts are something we should deploy as infrequently as possible._**

This ability to upgrade and adjust a protocol sounds great on paper, but we're striving for a more decentralized Web3. We've seen countless examples of this degree of centralized control leading to people being burnt.

Keep the downsides of upgradeability in mind as we continue through this section.

Let's start getting a grasp of what upgradeability is.

### Upgradeable Smart Contracts

The typical convention is that when a smart contract is deployed on chain, they're immutable, or they cannot be changed. If we want to get into the techincalities of things, smart contracts change all the time.

Any time a function is called, or state is changed a smart contract is _technically_ changing.

What's really meant by `immutable smart contracts` is that the _logic_, once on chain, cannot be changed, and this is true. This is one of the greatest advantages of smart contracts. This can cause issues when a protocol wants to upgrade, change or add additional features to their service.

Well, developers aren't entirely without options.

The Web3 purists will immediately decry Upgradeable design patterns at not truly being immutable, and they're right. As mentioned above, there are important considerations pertaining to the pros and cons of different methodologies that need to be considered and centrality is absolutely a concern here.

With that said, there are 3 primary ways to upgrade a smart contract protocol that we'll detail here.

### Parameterization

This is a bit of an odd-one-out as in this situation the _logic_ of the smart contract isn't changing.

Parameterization simply means configuring the protocol such that several important aspects of it can be adjusted, often through setter functions. This allows priviledges users to potentially alter how the protocol functions fundamentally.

Consider the function below.

```js
uint256 reward;

function setReward(uint256 _reward) public onlyOwner {
    reward = _reward;
}
```

**Pros:**

- Simple

**Cons:**

- inflexible
  - requires a lot of planning/forethought as logic cannot be changed
- Centralized
  - can be mitigated with a governance contract, so long as the DAO is decentralized

In this simple example, the protocol owner could adjust the reward payouts at any time.

Another, more extreme, example of this would be something like Aave's contract registry where the protocol register points to active, up to date contracts for the protocol.

### Social Migration

Through this methodology, an upgrade is performed simply via a new protocol deployment and through social convention and messaging, the community is instructed to use the new deployment.

In this sense a developer is able to maintain the immutability aspect of a smart contract protocol while retaining the ability to make changes to the service by effectively replacing it.

**Pros:**

- Truest to blockchain values
- Easiest to audit

**Cons:**

- great deal of effort required to move all users over
- multiple, once valid, addressess deployed can be risky and confusing

### Proxies

The penultimate pattern when focused on upgradeability is going to be a proxy design pattern. This allows developers to retain a single reference address, avoid having to communicate a migration to a large community and affords them the ability to not only upgrade state but also logic.

Proxies, while powerful, are also very risky as they employ a lot of low-level logic that can be easy to get wrong.

An example of this is delegateCall, a low-level function whereby the logic of a called contract is executed in the context of a calling contract. Importantly low-level primitives of the transaction such as msg.value and msg.sender do not change when a call is delegated.

Through this, and a fallback function, proxies are able to take any call sent to them, and route it to a specified implementation contract.

<img src="/foundry-upgrades/1-intro/intro1.png" width="100%" height="auto">

So, whenever a protocol wants to upgrade, they would simply deploy the upgraded implementation and then point the proxy to the new deployment.

Proxies will typically contain a privileged function to upgrade this implementation.

```js
function upgrade(address newImplementation) external {
  if(msg.sender != admin) fallback();
  implementation = newImplementation;
}
```

Of course, here's where considerations of decentrality should be made.

A great benefit of a proxy pattern is that while the logic is contained by the implementation contract, all of the data is held by the proxy contract. What this means is that when a new implementation is deployed, the state of the protocol pre-upgrade is retained and carried over.

### Proxy Terminology

**Implementation Contract** - This contains the logic of the protocol, when an upgrade is performed a new implementation contract is deployed.

**Proxy Contract** - This points to the active implementation contract and routes all function calls to the active implementation contract

**User** - The entity sending function calls to the protocol

**Admin** - The entity empowered to upgrade the protocol or switch implementations.

### Potential Issues with Proxies

I've mentioned it a few times, but I'll continue to do so - centrality is a big concern. At very least protocols should strive for a level of governance when employing upgradeable proxies.

Beyond this however, there are a couple issues that may not be so obvious.

1. Storage Clashes
2. Function Selector Clashes

Let's look at these in a little more detail.

**Storage Clashes**

Remember, in a proxy pattern, we're using the storage of our proxy to perform the logic of our implementation contract. What this means is that changes to storage in our implementation contract are actually performed on our proxy contract. Let's visualize this.

<img src="/foundry-upgrades/1-intro/intro2.png" width="100%" height="auto">

This is really important to know as it means that we can only `append` or add additional storage data to an implementation contract, we're unable to reorder or change old storage slots.

**Function Selector Clashes**

When a transaction is sent to a contract on-chain, it is encoded to include the name of which function is being called. The first 4 bytes of this encoding is called the `function selector` and the receiving contract uses this to route function calls to the appropriate logic.

Issues can arise when an implementation contract uses function selectors which match those used within a proxy contract.

```js
contract Foo {
  function collate_propagate_storage(bytes16) external {}
  function burn(uint256) external{}
}
```

In the above example, this contract won't actually compile since both of these function, while different, have the same function selector. You can imagine how chaotic or unexpected behaviour would be if our upgrade function clashed with something within our implementation.

This leads me to 3 different types of proxy design patterns!

1. **Transparent Proxy Pattern**

In this pattern, admin addresses are _only_ allowed to call proxy functions and are disallowed from interacting with the implementation contract. Likewise, users are of course restricted to the implementation contract. This mitigates the likelihood of a selector clash occuring.

2. **Universal Upgradeable Proxy (UUPS)**

This methodology will actually have all of the upgradeability logic contained _within the implementation contract_. In this way, the Solidity compiler itself won't allow function selector clashes to compile. Additionally, by not having to check if someone is an administrator within the proxy contract for each function call, this ultimately saves on gas.

> [!TIP]
> It's important to ensure implementations are deployed with upgradeability functionality here, or you'll be stuck!

3. **Diamond Proxy Pattern**

The Diamond Proxy Pattern is unique in that it supports _multiple implementation contracts_. This solves a few issues such as contract size limitations. In addition to this, a diamond pattern allows for more granular upgrades to a protocol, not requiring a whole new deployment for each change.

<img src="/foundry-upgrades/1-intro/intro3.png" width="100%" height="auto">

### Wrap Up

With an understanding of the background of upgradeable smart contracts and a keen understanding of the pros and cons of each methodology, we should be ready to see how this works at a deeper level.

In the next lesson we'll investigate the low level function delegateCall and how exactly it empowers proxy pattern implementations.

See you there!
