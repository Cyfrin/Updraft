## Compiling Vyper in Python 

We'll compile our Vyper code using the Vyper compiler. We can do this in a couple of different ways, but regardless of how we choose to compile our Vyper contract, we first need to download the Vyper compiler. 

The Vyper compiler is available on GitHub at: [vyper repository](https://github.com/vyperlang/vyper). We can install the Vyper compiler using the following command in our terminal:

```bash
uv tool install vyper
```

After we install the Vyper compiler, we can compile our "favorites" Vyper contract using the following command: 

```bash
vyper favorites.vy
```

After we run this command, a large string of hexadecimal characters will be displayed in our terminal. This string of characters is the raw bytecode that will be sent to the blockchain.

This bytecode represents our Vyper contract in a machine-readable form that can be executed by the blockchain.  

