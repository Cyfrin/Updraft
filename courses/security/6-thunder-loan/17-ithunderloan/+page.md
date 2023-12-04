---
title: IthunderLoan.sol
---



---

# Unearthing Bugs and Enhancing Interfacing in ThunderLoan Protocol

In the overlapping maze of smart contracts and blockchain protocols, it's critical not to miss any threads. You can uncover this through a methodical analysis of the mechanism layer by layer, as demonstrated with ThunderLoan protocol.

## Unraveling the ThunderLoan Contract

The journey begins with taking a peek at the IThunderLoan interface we have been investigating. Here, the classic `ThunderLoan` contract caught my eye. As the usual procedure goes, we need to tackle a crucial question – "Does `ThunderLoan` implement the `IThunderLoan`?"

In this case, the `ThunderLoan` contract doesn't implement `IThunderLoan`. This might seem odd at first, but it could perhaps be an informational point from an auditing perspective. Intriguingly, the `IThunderLoan` interface should ideally be carried out by the `ThunderLoan` contract. An interface is a valuable tool in programming, it acts as a guideline to developers, ensuring that they don’t leave out any critical functions.

Now, if the contract isn't implementing the interface, it's time to delve deeper into the details and discrepancies that might crop up in such cases. Let's compare the two closely and see if they're actually different.

![](https://cdn.videotap.com/Bft86JEs1cIqjxRo4BZq-39.92.png)## Scrutinizing the Repay Function

Keeping a sharp focus on the `repay` function, we can see that it accepts a token, an address, and an amount. If we dig into the `IThunderLoan` interface, we notice this function takes an `IERC20` token and an address amount.

Upon a detailed observation, this presents a peculiar situation – the `IThunderLoan` and `ThunderLoan` contract parameters are not only different, but they contradict each other, creating grounds for an issue. Just imagine scenarios where the `repay` function is expecting an `IERC20` token, but it receives an address token; the resulting confusion could cause the process to break!

Now, when we try to import the `IThunderLoan` and inherit it into `ThunderLoan` in Visual Studio Code, and if we save it, it says _"ThunderLoan should be marked abstract because it doesn't implement this `repay` function."_ This issue would have been caught easily if best practices had been followed and the auditing information had been put into use.

Further, when the forge build is actioned, it doesn’t compile. This draws our attention back to the different parameters of the `repay` function.

> "Stacking up both the interfaces side by side, in the `ThunderLoan` contract, the `repay` function is clutching an `IERC20` token and a `uint256`, whereas its counterpart – `IThunderLoan` is nesting an address token and an amount."

This makes it clear that these two are not singing in harmony, creating the need for amendments where necessary.

ABOUT THE AUTHOR: This auditing journey showcases the significance of in-depth code investigation in contracts and interfaces. It provides insights into the potential complexities that might arise in coding and software development. It’s a concrete reminder of how seemingly insignificant details can crop up to create considerable confusion in function implementation and can carry far-reaching consequences if overlooked – prominently, in smart contracts and blockchain protocols.

### Unraveling Code Rubrics, One Function at a Time

It's time to retract the changes made and run some `command z's` to restore the code. Here lies an opportunity to leave a note to remind that the referenced interface should be implemented. This attention to detail can be tagged as either low or informational. These tags would depend on the possible future risks; it would probably be informational if the address token doesn't pose much of an issue. But it’s definitely something that demands further investigation.

In essence, it’s crucial that accurate information is included in the report. So what at first glance looked like an odd piece of code, presented us with a whole other issue to dive into, and that's another feather in our problem-solving cap!

Through this auditing adventure, we were able to uncover multiple discrepancies and enhance uniformity in the interfacing processes.

Let’s keep this journey of code analysis ongoing - one function, one issue at a time. We may find the codebase exhausting at times, but as we unravel the layers, it's definitely rewarding for the meticulous code investigator.
