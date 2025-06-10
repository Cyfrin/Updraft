## Tracking Total Contribution Amounts per Funder

In our previous steps, we developed a way to record the addresses of everyone who sent funds to our smart contract, likely using a dynamic array. However, simply knowing *who* funded isn't always enough. A common requirement is to know the *total amount* each individual has contributed over time. Our current contract lacks this capability.

To associate each funder's address with their cumulative contribution, the ideal data structure in Vyper is a `HashMap`. Think of this like a dictionary or key-value store. We will map each funder's `address` (the key) to a `uint256` value representing the total amount they have sent in Wei (the value).

First, we need to declare a new state variable within our contract to store this mapping. State variables store data persistently on the blockchain. We'll name it `funder_to_amount_funded` and define its type and visibility:

```vyper
# Keep track of the total amount funded by each address
# Maps: funder address -> total amount funded
funder_to_amount_funded: public(HashMap[address, uint256])
```

Here, `public` makes the mapping readable externally – anyone can query the total amount funded by a specific address using the automatically generated getter function. `HashMap[address, uint256]` specifies that this is a mapping where keys are blockchain addresses and values are unsigned 256-bit integers, which are suitable for storing Ether amounts in Wei.

Next, we need to modify our `fund()` function. This function must be marked `payable` so it can receive Ether. Inside this function, after a user sends funds (and potentially after other checks like minimum amounts are passed), we need to update the mapping to reflect the new contribution.

We access the mapping using the sender's address (`msg.sender`) as the key. We retrieve the current amount stored for that address, add the amount sent in the *current* transaction (`msg.value`), and store the new total back into the mapping for that same address.

```vyper
# Inside the payable fund() function...
# Previous logic might include adding the funder to a list:
# self.funders.append(msg.sender) # Assuming this exists from previous steps

# Update the total amount funded by this sender
self.funder_to_amount_funded[msg.sender] = self.funder_to_amount_funded[msg.sender] + msg.value
```

Crucially, `msg.sender` is a built-in variable that provides the address of the account calling the function, and `msg.value` is a built-in variable available in `payable` functions that provides the amount of Wei sent with the call. If `msg.sender` hasn't funded before, `self.funder_to_amount_funded[msg.sender]` will default to 0, ensuring the first contribution is recorded correctly.

Vyper, like many programming languages, offers a shorthand syntax for this type of increment-and-assign operation. Instead of writing `variable = variable + value`, you can use the `+=` operator:

```vyper
# Equivalent shorthand syntax for the update
self.funder_to_amount_funded[msg.sender] += msg.value
```

This single line performs the exact same operation as the longer version shown previously: it adds `msg.value` to the current value associated with `msg.sender` in the mapping and updates the mapping entry in place.

By adding this `HashMap` state variable and the logic to update it within the `fund` function, our contract now effectively tracks the cumulative amount contributed by each individual funder.