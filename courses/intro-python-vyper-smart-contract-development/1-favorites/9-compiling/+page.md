## Compiling

We're going to look at the compilation process for a smart contract written using Vyper.

Even with just this small contract, we have no code. All we have is a version and a license. Let's go ahead and compile this contract.

We'll go to the Vyper compiler and click the Compile button.

Clicking the "Compile favorites.vy" button gives us a compilation details box.

We'll click the "Compilation Details" button and see bytecode, runtime bytecode, and ABI.

The bytecode and runtime bytecode are sent to the blockchain because the blockchain only understands raw bytecode. The blockchain only understands zeros and ones and doesn't understand what "pragma version" means. So when we compile our code we're essentially transforming our human-readable code into machine readable code.

If our compilation fails, it means we have a mistake in our code somewhere.

Let's go back to our "favorites.vy" file and try adding a line with gibberish code:

```python
asdfhasjh a:dhfpuiowht92y92
```

Trying to compile this gives us an error:

```bash
favorites.vy
SyntaxException:Semi-colon statements not allowed
line 4:11
```

We'll remove the line and compile again. This time the compiler will successfully compile our code, which is indicated by a green checkmark.

While we're not actually deploying a contract here, this is still important to help us understand the compilation process.

As you get used to coding, you'll get used to hitting Cmd+S or Ctrl+S.
