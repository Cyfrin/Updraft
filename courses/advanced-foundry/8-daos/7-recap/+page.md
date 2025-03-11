---
title: Recap
---

_Follow along with this video._

---

### Recap

We did it, we made it to the end! We only have one more section left in this course, Security. **_Do not_** skip this final section. Even if you don't continue into a security focused career, I want you to have the fundamental knowledge of what to look out for, common strategies to keep your protocol safe and where you can look for help when you need it.

For those that _do_ want to go down the security/auditing path. Updraft has a [**course tuned to you**](https://updraft.cyfrin.io/courses/security), ready and waiting.

### BONUS: Gas Optimizations with GaslightGG

As a bonus piece of content, Harrison with Gaslight shares his advice on increasing the gas efficiency of your smart contracts!

To showcase a common waste of gas in smart contract development, we reference a simple air drop contract:

```solidity
contract BadAirdrop {
    address token;
    uint256 public transfers;

    error invalidLengths();

    constructor(address _token) {
        token = _token;
    }

    function airdropBad(address[] memory recipients, uint256[] memory amounts) public {

        if(recipients.length != amounts.length) revert invalidLengths();
        for(uint256 i; i < recipients.length; i++){
            IERC20(token).transferFrom(msg.sender, address(this), amounts[i]);
        }

        for(uint256 i; i < recipients.length; i++){
            IERC20(token).transfer(recipients[i], amounts[i]);
            transfers++;
        }
    }
}
```

Loops in solidity are hugely gas intensive. In our airdrop function, even to just transfer the airdrop amount from the sender to the contract we're iterating through the entire recipients.length.

We're then iterating through the array again to transfer from the contract to the recipients, and in addition to this, we're incrementing our transfer variable each time we loop through the array.

There are lots of improvements possible here. Let's look at a more ideal example.

```solidity
contract GoodAirdrop {
    address public immutable token;
    uint256 public transfers;

    error InvalidLengths();

    constructor(address _token){
        token = _token;
    }

    function airdropGood(address[] calldata recipients, uint256[] calldata amounts, uint256 totalAmount) public {
        if(recipients.length != amounts.length) revert InvalidLengths();

        IERC20(token).transferFrom(msg.sender, address(this), totalAmount);

        for(uint256 i; i < recipients.length;){

            IERC20(token).transfer(recipients[i], amounts [i]);

            unchecked{
                ++i;
            }

        }

        unchecked{
            transfers += recipients.length;
        }
    }
}
```

Some of the adjustments to this contract which improve gas efficiency include:

- token variable is now immutable, this is deployed with the contract bytecode and is cheaper to read from than storage.
- arguments passed to the `airdropGood` function have been changed to calldata
- totalAmount has been added as a parameter to the function. This will remove a large amount of gas by not needing to loop through recipients to calculate it
- the syntax of our for loop has been changed to allow us to use unchecked on our iterator, we can be confident in this number not overflowing so we can save gas on the check
- the update to our transfers variable is no longer contained in a loop and is also unchecked. We set this once based on the length of the recipients array.

What does all of this mean for the gas spent with this contract?

::image{src='/foundry-daos/7-recap/recap1.png' style='width: 100%; height: auto;'}

Over 600,000 gas savings! Simple changes and gas conscious development is all it takes!

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊

[**Arbitrum NFT Challenge**](https://arbiscan.io/address/0xc584bD01fD60F671409661a6802170BbEFba5c47#code)

[**Sepolia NFT Challenge**](https://sepolia.etherscan.io/address/0x46F3fE2C8aC9e9AE4DEDE1a7a29Ab3BdcFa7eaFc#code)

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊
