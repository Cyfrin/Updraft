---
title: Recon - Reading the Code
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/_cKTcb3R6xc" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Deep Dive into Codebase: Unraveling the Main Entry Point and More

Welcome everyone! Today we're embarking on an insightful journey through an intriguing codebase. What's truly exciting about this voyage is that we'll be starting from the main entry point of the protocol. This approach offers a thrilling way to understand the critical functions and operations that govern the system.

## Locating the Main Entry Point

The adventure starts with a bird's-eye-view of the codebase. This 'quick skim' gives me an idea of the overall landscape. However, identifying the best point of entry can be tough if you don't know where to look.

Here is where Solidity Metrics comes in handy. If you scroll all the way down to the bottom, you'll see **Contract Summary** that lists down the public and external functions.

![](https://cdn.videotap.com/iZyEcW0QPu9UkA6c5Xlf-36.03.png)Alternatively, for forge projects, run the following command:

```bash
forge inspect PuppyRaffle methods
```

This command will print a list of methods you can check out.

![](https://cdn.videotap.com/O4YijeMcS1T44HRm1v5c-72.06.png)Some of the core functions that I focus on include public functions such as `enterRaffle`, `refund`, and external functions like `selectWinners`. These are especially fascinating if they modify any state.

## Zooming In: The `enterRaffle` Function

For this project, I identify `enterRaffle` as a possible main entry point. It's a decisive function that gives users access to participate in the raffle.

Interestingly, the code documentation explains that the user entry into the raffle involves paying the entrance fee, multiplied by the number of players. This bit can be slightly confusing, so I'm gonna clarify it for you.

We see `address[] memory new_players` in the parameters. This suggests that a user has to pay the entrance fee times the `number of players`. If this seems perplexing, just remember to ask questions or make a note for further investigation.

Furthermore, the documentation highlights that **duplicate entries are not allowed**. We can expect to see validation for this in the `enterRaffle` function.

### Clearer Variable Naming

Now, the `enterRaffle` function's syntax doesn’t sit right with me.

```javascript
function enterRaffle(address[] memory new_players)
```

In case I was conducting a private audit, I'd note that variable names in this function could be more expressive. This critique is mainly based on `entrance_fee`which is an Immutable variable. A `I_` prefix before `entrance_fee` would provide better clarity, suggesting that it is immutable. Alternatively, another syntax could be used to indicate the immutability of `entrance_fee`.

**Note:** If you are using Solidity Visual Developer, such states are pretty palpable.

### Navigating Around Codebase with Keyboard Shortcuts

Quick tip for Mac users to zip through the codebase. Using the keyboard shortcuts come really handy in swiftly moving forward and backward through the code-files.

For instance, click `entrance_fee`, scroll down, click something else, and then hit `CTRL -`. This combo works like 'The Back Button' - bobbing you right back to your last cursor location.

- `CTRL -` = Go Back
- `CTRL+Shift -` = Go Forward

These shortcuts dramatically speed up your code navigation, making life a bit easier. Various text editors like Vim, VI or Emacs offer great support for such keyboard shortcuts.

This quick skim up until here should arm you with some pointers when embarking on a code audit or simply understanding a new codebase. In our next session, I'll delve into more details about the `enterRaffle` function, but until then, Happy Coding!

```markdown
> "When in doubt, break things down!"> - Your tactical guide to navigating complex codebases.
```
