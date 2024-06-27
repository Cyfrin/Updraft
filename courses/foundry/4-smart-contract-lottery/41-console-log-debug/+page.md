---
title: Console.log Debugging
---

_Follow along with this lesson and watch the video below:_



---

Technology is not always without complications. Bugs and glitches are common occurrences in the field of program writing. But if there is a problem, then a solution exists. Especially when working with Solidity in the Ethereum blockchain, it's critical to have a firm grip on debugging techniques. Today, I'm going to walk you through an additional tool you can use when debugging Solidity projects. From showing stack traces to logging console messages, we're going to cover it all. Buckle up!

## The Power of Forge

The key lies in a command we ran during our tests - `forge test -vv` or `forge test -vvv`. The beauty of this command lies in its ability to show us the _stack trace_ of our output.

When we write our tests, one way we've handled debugging in the past is by utilizing the `console` function in our contracts. For instance, let's consider a Raffle function we'd set up.

```js
import { console } from "forge-std/console.sol";
```

With this line of code, we import the `console` bit right at the start of our Raffle. Then, we proceed to apply the `console.log` command to any function we please, as demonstrated below:

```js
console.log("Hi");
```

In any test, where we call Enter Raffle, the console will log the message we've inserted.

## A Crucial Word of Warning

<img src="/foundry-lottery/35-debug/debugging1.png" style="width: 100%; height: auto;">

Here's a heads up: always ensure to remove these console log commands before deploying to a mainnet or a testnet. Here's why:

<img src="/foundry-lottery/35-debug/debugging2.png" style="width: 100%; height: auto;">

In other words, remember to delete the console actions post-debugging. While it might seem trivial, adhering to this practice could save you a considerable amount of Ether.

## Conclusion

And there you have it - an extra instrument in your programming toolkit. Concealed within the tangle of coding constructs and Solidity conventions, the `console.log` command could make your debugging journey smoother.

So the next time you grind through your lines of Solidity code, remember that the console's got your back! It might just be the help that you needed all along. Happy coding!
