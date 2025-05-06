---
title: Writing Tests
---

_Follow along with the video_

---

### Introduction

In this lesson, we are going to build a comprehensive test for the `MerkleAirdrop::claim` function. This test will ensure that users can correctly claim their tokens from the `MerkleAirdrop` contract.

### Setup

We begin by deploying both the `BagelToken` and the `MerkleAirdrop` contracts in our `setup()` function. To properly set up the `MerkleAirdrop` contract, we need the hash `ROOT` variable, which can be retrieved from the output file that we generated in the previous lesson.

```solidity
bytes32 ROOT = 0xaa5d581231e596618465a56aa0f5870ba6e20785fe436d5bfb82b08662ccc7c4;

function setUp() public {
    token = new BagelToken();
    airdrop = new MerkleAirdrop(ROOT, token);
}
```

Additionally, we create a predictable address and private key by adding this line in our `setUp()` function:

```solidity
(user, userPrivKey) = makeAddrAndKey("user");
```

We log the user address and copy it to the array of addresses in the `GenerateInput` file. This step ensures that the user address is actually included in the Merkle Tree, allowing them to rightfully claim tokens.

To ensure the Merkle AirDrop contract can send tokens, it must hold enough of them. After deploying the contracts, we mint tokens to the owner and transfer the required amount to the AirDrop contract.

```solidity
token.mint(address(this), amountToSend);
token.transfer(address(airdrop), amountToSend);
```

After this, we run the scripts again to generate the input and output files, updated with the user address. This involves executing `forge script script/GenerateInput.s.sol` to create the input file and `forge script script/MakeMerkle.s.sol` to generate the output file.

### `MerkleAirdrop.t.sol`

In our test, we'll first store the user's initial balance, which is equal to zero. We then use the `vm.prank` cheat code to simulate the user calling the `claim` function on the `MerkleAirdrop` contract. The claim function requires the user address, the amount to claim, and the proof values as parameters, which can be copied from the output file we just generated. We then verify the ending balance of the user, ensuring it's equal to the claimed amount.

```solidity
bytes32 proofOne = 0x0fd7c981d39bece61f7499702bf59b3114a90e66b51ba2c53abdf7b62986c00a;
bytes32 proofTwo = 0xe5ebd1e1b5a5478a944ecab36a9a954ac3b6b8216875f6524caa7a1d87096576;
bytes32[] proof = [proofOne, proofTwo];

//..
function testUsersCanClaim() public {
        uint256 startingBalance = token.balanceOf(user);
        vm.prank(user);
        airdrop.claim(user, amountToCollect, proof);
        uint256 endingBalance = token.balanceOf(user);
        console.log("Ending balance: %d", endingBalance);
        assertEq(endingBalance - startingBalance, amountToCollect);
}
```

Finally, we run the test with the command

```
forge test --mt testUsersCanClaim -vvv
```

which will confirm that the user successfully received the tokens through our airdrop.
