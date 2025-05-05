## Account Abstraction Lesson 7: Execute Function Ethereum

It's time to add the finishing touches to our **minimal account**. In this lesson we will do this by:

- creating an `execute` function to allow interaction with other dapps.
- adding a modifier to allow owner or `EntryPoint` to call our contract.
- creating a `receive` function to enable our contract to accept payments.

**LET'S GET STARTED!**

---

### Connecting to Other dapps

We've come a long way, but we aren't quite done yet. We still need to enable our contract to interact with other dapps. At the moment, we can only validate operations. We want to be able to send them, too. Essentially, the EntryPoint is going to validate our account. Then it will send the data to our account. Our account then becomes the `msg.sender`, which can then interact with other contracts. So, let's get there.

---

::image{src='/foundry-account-abstraction/7-execute-function-ethereum/account-abstraction.jpg' style='width: 100%; height: auto;'}
---

In order for us to make all this happen, we need a new external function called `execute`. It will pass an address for the destination, uint256 for eth, and bytes calldata for ABI encoded function data. If not successful, it will revert. Be sure to add `MinimalAccount__CallFailed(result)` to the errors section of your code.

```solidity
/*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////*/
    function execute(address dest, uint256 value, bytes calldata functionData) external requireFromEntryPointOrOwner {
        (bool success, bytes memory result) = dest.call{value: value}(functionData);
        if (!success) {
            revert MinimalAccount__CallFailed(result);
        }
    }
```

---

### Two Ways to Call

Now, we want to allow users to call directly from their wallet to the account contract. We will need to create a modifier for this.

```solidity
 modifier requireFromEntryPointOrOwner() {
        if (msg.sender != address(i_entryPoint) && msg.sender != owner()) {
            revert MinimalAccount__NotFromEntryPointOrOwner();
        }
        _;
    }
```

The modifier is set up in a way that will allow the **owner** or the **EntryPoint** can call our account. If not the address of either one, it will revert and give us a custom error, `MinimalAccount__NotFromEntryPointOrOwner`. Let's place it with the other errors.

```solidity
/*//////////////////////////////////////////////////////////////
                                 ERRORS
//////////////////////////////////////////////////////////////*/
    error MinimalAccount__NotFromEntryPoint();
    error MinimalAccount__NotFromEntryPointOrOwner();
    error MinimalAccount__CallFailed(result);
```

---

### Accept Payments

The last thing we need to do now is add a `receive` function. We will make it `external payable` so that the contract can accept funds from our `_payPrefund` function to pay for transactions. Place `receive() external payable {}` just below our constructor, like so:

```solidity
constructor(address entryPoint) Ownable(msg.sender) {
        i_entryPoint = IEntryPoint(entryPoint);
    }

    receive() external payable {}
```

> ❗ **NOTE** `receive()` is a special function in Solidity that allows the contract to accept plain Ether transfers. It is defined as receive() external payable {} and does not take any arguments or return any values. This function is placed just below the constructor in the contract, allowing the contract to accept funds directly, which can be used for paying transaction fees.

Congratulations! We are now ready to write scripts, tests, and deploy our minimal account. But first, let's review this lesson.

---

### Questions for Review

<summary>1. What is the purpose of the `execute` function in our minimal account contract?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It allows the minimal account contract to interact with other dapps by sending transactions.

</details>


<summary>2. Why do we need the `requireFromEntryPointOrOwner` modifier?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It ensures that only the EntryPoint contract or the owner of the minimal account contract can execute certain functions.

</details>


<summary>3. How does the `receive` function enable our contract to accept payments?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

This is a special function in Solidity that allows the contract to accept plain Ether transfers.

</details>


When you are ready, move on to the next lesson.
