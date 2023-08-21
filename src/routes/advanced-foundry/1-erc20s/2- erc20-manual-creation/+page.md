---
title: ERC20 Manual Creation
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/RFynoQNPKOo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Creating Your Own ERC20 Token in Solidity Code

Welcome Back! Having covered the basics, let's look at how we can manually create our own ERC20 token.

## Setting Up Your Development Environment

Open a terminal in Visual Studio Code and run the following:

```sh
mkdir foundry-erc20-f23
cd foundry-erc20-f23
code .
```

The above commands will create a new directory for our project, navigate into it, and open the directory in a new Visual Studio Code window.

Once we have Visual Studio Code running, we need to initialize a blank repository. Open up the built-in Terminal and execute the following command:

```sh
forge init
```

Completing these steps sets up a development environment complete with a fully-equipped CI/CD pipeline courtesy of GitHub workflows for later code testing &amp; deployment.

## Getting Started With Your ERC20 Smart Contract

Next, let's get down to the nitty-gritty of our project — our own ERC20 token! But first, a spring cleaning is due. Remove the sample files from the fresh repository so that you can start coding from scratch. This step is as uncomplicated and swift as a couple of clicks and keyboard strokes away!

Having cleared the playing field, it's time to layer the groundwork for our ERC20 token. To do this, we'll be referencing the ERC20 Token Standard, covering all the key methods that we need.

Let's start by creating a new Solidity file named `OurToken.sol`. Right click the `src` folder in the left navigation panel and select `new File`.

<img src="/foundry-erc20s/erc20-manual-creation/erc20-manual-creation1.PNG" style="width: 100%; height: auto;">

## Paving the Way for Your Custom Token

The inception of our token begins with some basic instructions for the Ethereum virtual machine — where our contract code will live, breathe, and operate.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract OurToken{}
```

The `SPDX-License` specifies the type of license our code carries, while `pragma solidity` specifies the Solidity compiler version that our contract is compatible with.

Ensuing this, we set forth to define several properties that will shape our token's identity. The ERC20 standard necessitates the definition of a `name`, `totalSupply`, and a `decimals` property. In our contract, this translates to:

```javascript
    string public name = "OurToken";
    uint256 public totalSupply = 100000000000000000000;
```

The decimals property signifies the number of decimal points that can be used in our token. Given that the Ethereum network operates in Wei (the smallest denomination of Ether), it's a good practice to use 18 decimal places for interoperability with other token contracts.

```javascript
    uint8 public decimals = 18;
```

Reaching this stage of our token creation, our contract should look something like this:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OurToken{
    string public name = "OurToken";
    uint256 public totalSupply = 100000000000000000000;
    uint8 public decimals = 18;

}
```

## Building the Internal Structure for Our Token

Our token also needs some internal structure and mechanisms to function, chiefly, a way to track balances of all the users interacting with it.

First, we use a Solidity mapping data structure to connect user addresses with their token balances. This balance tracking mapping looks like:

```javascript
    mapping (address => uint256) private _balances;
```

Next, we functionally implement the ability for anyone to view their current token balance via the `balanceOf` method.

```javascript
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

Juxtaposed against the backdrop of token balance mapping, the `balanceOf` method takes an account's address as input and returns the corresponding balance. This signifies that having tokens in an ERC20 simply translates to some balance in a contract's mapping.

## Making the Token Transferable

Our token is still a bit static. Let's bring it to life by implementing the `transfer` function which helps users send tokens to other addresses:

```javascript
    function transfer(address recipient, uint256 amount) public returns (bool) {
        uint256 senderBalance = _balances[msg.sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[msg.sender] = senderBalance - amount;
        _balances[recipient] += amount;

        return true;
    }
```

Here's what these lines of code are doing:

1. Fetch the balance of the sender (the person calling this function).
2. Use the `require` function to make sure the sender has enough tokens. If they don't, the entire function will fail.
3. Subtract the transfer amount from the sender's balance.
4. Add the transfer amount to the recipient's balance.

Well, that's the first iteration of our token! We could go further and implement other functions like `allowance` and `transferFrom` which would make our token more versatile with better utility. But for brevity reasons, we'd leave that for another day.

In conclusion, the journey to coding your own ERC20 token isn't as daunting as it seems. With Solidity, a good text editor, and little patience, you can make your own way into the Ethereum developer community. I hope this guide leaves you better equipped in your Ethereum dev journey and evokes your interest in delving deeper into the vastly interesting world of blockchain programming. Good luck and happy coding!
