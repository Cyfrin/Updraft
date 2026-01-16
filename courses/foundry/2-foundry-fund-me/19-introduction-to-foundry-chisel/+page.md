---
title: Introduction to Foundry Chisel
---

_Follow along with this video:_

---

### An Introduction to Chisel

`Chisel` is one of the 4 components of Foundry alongside `forge`, `cast` and `anvil`. It's a tool that allows users to quickly test the behavior of Solidity code on a local (anvil) or forked network.

Usually, when you want to test a small Solidity code snippet you go to Remix. But why do that when you have what you need right in the terminal of your Foundry project.

Type `chisel` in your terminal and press Enter.

This opens up a shell that awaits your next command. Call `!help` to find out more about what commands are available.

Basically, you can simply write solidity in the shell then play around and see how it behaves.

For example:

1. Type `uint256 cat = 1`;
2. Type cat;

```
➜ cat
Type: uint256
├ Hex: 0x0000000000000000000000000000000000000000000000000000000000000001
├ Hex (full word): 0x0000000000000000000000000000000000000000000000000000000000000001
└ Decimal: 1
➜ 
```

3. Type `uint256 dog = 2;`
4. Type `cat + dog`

```
Type: uint256
├ Hex: 0x0000000000000000000000000000000000000000000000000000000000000003
├ Hex (full word): 0x0000000000000000000000000000000000000000000000000000000000000003
└ Decimal: 3
➜ 
```

5. Type `uint256 frog = 10;`
6. Type `require(frog > cat);` - If nothing happens it means it passed, now try it the other way
7. Type `require(cat > frog);`

```
➜ require(frog > cat);
➜ require(cat > frog);
Traces:
  [197] 0xBd770416a3345F91E4B34576cb804a576fa48EB1::run()
    └─ ← [Revert] EvmError: Revert

⚒️ Chisel Error: Failed to execute REPL contract!
➜ 
```

It reverts!

Press `Ctrl + C` twice to exit and return to your normal terminal.

To find more about other Chisel functionality, please click [here](https://book.getfoundry.sh/reference/chisel/).
