---
title: IFLashLoanReceiver.sol
---



---

# Deep diving into Flash Loan Audits

Going through audits especially when it involves assert checking can be a bit of a challenge even for seasoned programmers. Today, we will be looking into **IFlash Loan Receiver** contracts, finding out potential loopholes and code clean ups that we can perform to ensure our contract is as secure and tight-knit as possible.

![](https://cdn.videotap.com/nmh2iNPnadGsdWNfaTx7-13.81.png)## Understanding the Flash Loan receiver contracts

A quick look at our code shows that we use a lot of import statements like `import IThunderLoan from ../IThunderLoan`. Now it might seem okay to import libraries and classes that we might not really use directly in our codebase, but there's reason to trim down on that. Let's delve in.

While this line of code might seem harmless initially, closer inspection reveals that we don't really need to import this. Why is it there? One may think there could be an underpinning connection by another class or component. So let's try to find out where exactly this particular import is being utilized.

Using the handy keyboard shortcut **Command Shift F** (or Control Shift F for Windows) in Visual Studio, we can quickly locate where `IFlashLoanReceiver` file is and where `IThunderLoan` is being imported.

To our surprise, we found out that `IThunderLoan` isn't imported or used anywhere in the `IFlashLoanReceiver`. So it begs the question, why is it there?

## Cleaning Up Unused Imports

While it's tempting to leave unused imports like this in your code (who knows, you might need it later, right?), this could be seen as bad practice in general. This is largely because it makes the code harder to read and understand, especially for new people coming onto the project and also, it could introduce potential security risks.

We went ahead to comment out the `IThunderLoan` import to see if anything breaks. Running `forge build` in the terminal, we confirmed that, indeed, we didn't actually need this import.

> **Note:** It's a fundamental principle of smart contract engineering to avoid altering live codes for test mocks. Hence we need to remove the import from `MockLoanReceiver.sol`.

After removing the redundant import, our build is still in great shape, and we've made our project slightly cleaner and easier to understand.

## Exploring Flash Loan mechanics with Aave

With the code cleaned up, we now shift focus to understanding some foundational concepts. Looking at the Flash Loan receiver contracts available on [Aave](https://github.com/aave), we realize that the implementation here is somewhat similar to what we have in our own codebase. The perfect opportunity to learn!

Here's a snippet of the Aave code we were going through:

```js
function executeOperation(address _reserve,uint256 _amount,uint256 _fee,bytes memory _params)external returns (bool);
```

This part of the code piqued our curiosity. We came up with some assumptions about what each parameter might be doing:

- `_reserve` could be the token being borrowed.
- `_amount` probably is the amount of tokens.
- `_fee` seems like it could be the fee of the Flash loan protocol.
- `_params` could likely be the callback function.

At this point, the code isn't elaborating on what these parameters are doing (a big shoutout to @audit for the Nat spec!), so we will need to do some more digging to find out.

> **Quote:** "A big part of becoming proficient in contract auditing involves making well-educated guesses and then verifying those guesses."

As we are going through the process, we find that the `executeOperation` is implemented in the `ThunderLoan.sol` which on running looks sufficiently secure.

## Wrapping Up and Taking Breaks

With this deeper understanding, we actually managed to find some informationals that we can pass on to our client - which, at the end of the day is what it's all about: making the protocol safer, more successful, and better. And let's not forget, adhering to best practices in engineering.

During this audit process, don't forget to take breaks! Applying the Pomodoro technique helps maintain focus, where one works for about 50 minutes and then takes a break for 5-10 minutes.

**And there you have it, folks! Remember, keep your code clean, follow good engineering practices, and always, always remember to question everything. Happy auditing!**
