---
title: Mishandling of Eth - Minimized
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/bjJIiGCwKg0" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Exposing the Mishandling of Ethereum: A Deeper Dive into Smart Contract Exploits

Hello Ethereum enthusiasts, today's post is a deep dive into understanding risk and vulnerabilities associated with Ethereum, specifically the mishandling of Ethereum or ETH.

We'll walk through the exploration of a particular codebase we've frequently returned to - our sc-exploits-repository. Follow along as we explore and expose exploits related to the mishandling of ETH.

> Be sure to have this repository on your bookmarks to facilitate easy navigation.

## The Importance of Understanding ETH Breaches

The constant evolution and expansion of blockchain technology mean the occurrence of exploitations. In our sc-exploits-repository, notable examples of ETH mishandling have been categorized. Today we will look at a particular exploit - 'Vulnerable to Self Destruct'.

![](https://cdn.videotap.com/9K1a9GtnKi7ohaku3tCP-47.6.png)

[Mishandling of Eth Repo](https://github.com/Cyfrin/sc-exploits-minimized/tree/main/src/mishandling-of-eth)

For those who have difficulty in retrieving the codebase in remix, the code can be found right at the repository. Head to the top source and copy-paste the code into remix.

## Analysing the Contract

The contract's primary function is to allow users to deposit their money and withdraw it later. There are several key factors to note:

1. The variable **total deposits**
2. A **mapping for deposits**
3. A **deposit** function
4. A **withdrawal function**

Total deposits variable and deposit function add and keep track of the value sent (in ETH) into the contract by the sender. The withdrawal function then allows for the removal of an amount set by the user from the account.

```js
function withdraw() public payable {
    require(msg.value >= 1 ether);
    totalDeposits = totalDeposits - msg.value;
    }
```

To ensure proper functioning, we have implemented an _assertion_ that checks that the address's balance is equivalent to the total deposits. This way, we know that accounting is done correctly inside the contract.

However, we soon bump into a significant issue.

## The Self-destruct Dichotomy

This issue arises on a relatively innocuous line - the self-destruct command. You may think that this function's straightforward task could not possibly harm the contract. However, in practice, this command can introduce a considerable vulnerability.

```js
function selfdestruct() public onlyOwner {
    selfdestruct(owner);
    }
```

For your information, sending ETH directly to the contract will typically fail. This failure occurs because smart contracts must have a designated `receive` or `payable` function to accept ETH, providing an essential security mechanism.

Yet, this is where self-destruct proves to be a sword that cuts both ways. On the surface, self-destruct comes across as a necessary destruct function to delete contracts. Yet, it also transforms the contract into a potential target to force money (ETH) into, even bypassing regular checks and balances.

## Misusing the Self Destruct Function

To demonstrate this, let's visualize a scenario:

1. We deploy `SelfDestructMe` with one ETH.
2. We then copy the target contract as the target and deploy `AttackSelfDestructMe`.
3. We initiate the attack by sending one more ETH.

![](https://cdn.videotap.com/gFO4YKELZcnyna0BEy0X-273.7.png)

In this scenario, the balance of ETH in the contract doubles, thereby defying the assertion that checks for equivalent balance with total deposits. As a direct consequence, this acts as a bug that blocks further withdrawals, resulting in a dysfunctional state.

Jeopardizing the withdrawal ability is significantly perilous as a contract's naturality lies in the inflow and outflow of money. The bug forces money into the contract, leading to the demise of the contract.

## Recap and Additional Resources

To recap, the equation of the address balance equates to total fees, an internal audit, and ETH mishandling can result in a mishap on smart contracts. Such mishandling could be disastrous on withdrawal functionality, hindering users from recovering their investments.

In the sc-exploits-repository, a test case has been provided to examine and understand it further. Moreover, there is another example of ETH mishandling that you can explore. We recommend using the code examples in the [repository](https://github.com/Cyfrin/sc-exploits-minimized/tree/main/src/mishandling-of-eth) to learn more about this subject.

Just as any coin has two sides, Ethereum too has pros and cons. Hence it's recommended to exercise caution when deploying contracts involving significant amounts of ETH. Happy coding!
