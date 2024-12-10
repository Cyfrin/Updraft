## Installing Anvil

In this lesson, we'll learn how to install Anvil, a tool that we'll use to create and deploy blockchain projects locally. 

**Why We Need Anvil**

Anvil is a powerful smart contract development framework that allows us to test and deploy our projects without worrying about network fees or the limitations of using a public testnet. 

**Getting Started**

To install Anvil, we'll use the command:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

This will install Anvil, Forge, Cast, and Chisel.

**Testing Anvil**

Once Anvil is installed, we can check that everything is working correctly by running:

```bash
anvil --version
```

If Anvil is installed correctly, we should see the version number printed to our terminal. 

**Troubleshooting Anvil**

If we can't run Anvil, there might be an issue with our bash or zsh profiles. To fix this, we can add the following lines to our profiles:

For bash:

```bash
echo "source $HOME/.bashrc >> $HOME/.bash_profile"
```

For zsh:

```bash
echo "source $HOME/.zshrc >> $HOME/.zprofile"
```

These lines will help our terminal find Anvil more easily. 

**Conclusion**

By installing Anvil, we've taken the first step towards building our own blockchain development environment. In the next lesson, we'll explore how to use Anvil to create and deploy our first smart contract! 
