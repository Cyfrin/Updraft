---
title: Chisel
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qfac2hZ3ywA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## An Introduction to Chisel

Typically, if we want to rapidly test a snippet of solidity code, we'd navigate over to Remix, an online compiler for Solidity programming language. However, with Chisel, we can directly test Solidity in our terminal swiftly and efficiently. This is a step-by-step guide on how to use Chisel for testing lines of code or debugging our tests.

**Step 1: Launching Chisel**

It's as simple as typing in the command `chisel` in the terminal. The terminal instantly turns into an interactive shell where we can start testing our solidity code.

```
chisel
```

**Step 2: Exploring Chisel**

If you're unsure about what you can accomplish in this newly opened chisel shell, simply type in `!help`. The terminal will provide a wealth of information relevant to the command line's functionalities.

```
!help
```

This step is not mandatory, but it's handy when you're new to Chisel and want to explore its range of capabilities.

<img src="/foundry-fund-me/15-chisel/chisel1.png" style="width: 100%; height: auto;">

## Writing Solidity with Chisel

Chisel allows us to write Solidity directly into our terminal and execute it line by line. Here's an example:

```bash
uint256 cat = 1;
cat
```

<img src="/foundry-fund-me/15-chisel/chisel2.png" style="width: 70%; height: auto;">

This simplistic code creates a variable `cat` and assigns it a value of `1`. When `cat` is called, the program echoes out `1` as the output.

Continuing with the example, we can perform simple operations too:

```bash
uint256 catAndThree = cat + 3;
catAndThree
```

This block creates a new variable `cat_n_three` and assigns it the value of `cat` plus 3. The resultant output when called will be `4`.

<img src="/foundry-fund-me/15-chisel/chisel3.png" style="width: 70%; height: auto;">

This simplistic yet powerful interaction is what makes Chisel such a powerful tool for debugging and testing small pieces of Solidity code.

<img src="/foundry-fund-me/15-chisel/chisel4.png" style="width: 100%; height: auto;">

## Exiting Chisel

Once you're done with your session, exiting from this Solidity testing environment is as straightforward as getting into it. Simply type `Control` + `C` to end the chisel session and return to your regular terminal.

```
Control + C
```

All in all, Chisel redefines convenience, offering us a command-line interface to write, test, and debug Solidity. With this exceptional tool, you don't need to toggle between platforms to ensure your code runs smoothly—everything can be done right from the comfort of your terminal. Happy debugging!
