## Compiling a project

We have our `favorites.vy` file here with a pragma version 0.4.1. We also see a comment indicating the license is MIT.

```python
# pragma version 0.4.1
# @license MIT
```

We have the contract code in here, which is typical. Usually we would compile this with Vyper SRC, but in this case, we will do it with the MoccaSin command. We will run the Vyper compiler to actually compile the project.

```bash
vyper src/favorites.vy
```

We can compile every file in our SRC folder by running the MoccaSin command. This will compile one project into an out directory.

```bash
mox compile
```

We can see that this successfully creates a `favorites.json` file in the out directory.

This has a ton of compilation details about the favorites contract. It has the bytecode that we're used to seeing now. It has the ABI. If I scroll over to the left here, I can even click this little drop-down to see what else we have and then we have VM which is the EVM or the Ethereum virtual machine. So that's great. And if we were to have Let me just copy-paste this in here a whole bunch If we were to have a ton of contracts in here Same thing, we could just run `mox compile` compile every single project to the out folder and be good. So, I'm going to go ahead and delete all of these now.

Now what's cool about MoccaSin is that you don't even have to compile. When you run your scripts, if they don't compile, well the scripts will just break. So compiling is actually optional. It's just that if you do want to compile so that you have these different so that you can actually see, you can inspect the bytecode and the ABI, etc, you can see that in the out folder there.
