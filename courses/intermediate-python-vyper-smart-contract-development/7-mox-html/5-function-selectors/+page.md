## HTML Fund Me: Introduction to Function Selectors

We'll look at function selectors and how they work within a smart contract. We can confirm or reject a transaction, and there is a lot of data visible within the MetaMask transaction window.

If we go to the **DATA** tab, we see the function type is **Fund**.

We can also see the raw transaction data in the **HEX** section of the transaction. We see the value, which is 0.1 GO or ethereum.

We are going to explore function selectors in greater detail in a later lesson, but for now, we can see how they operate.

We have a **Fund** function within our Solidity code.

```python
function fund() public payable {
    require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
        "You need to spend more ETH!!"
    );
    // addressToAmountFunded[msg.sender] += msg.value;
    s_funders.push(msg.sender);
    s_addressToAmountFunded[msg.sender] += msg.value;
}
```

This function needs to be converted into a low-level byte code for ethereum to understand. This is where function selectors come in.

We can see that the MetaMask transaction window shows us the function type is **Fund**.

We can find the function selector ourselves by using a cast command. We run a cast command with a signature such as:

```bash
cast sig "fund()"
```

The output for this command would be a function selector in Hex format, which is 0xb6e0d4288.

The function signature **fund** returns the function selector.

If we were to change the name of the function within our smart contract from **fund** to **stealMoney**, we can see that the function selector would be different.

```python
function stealMoney() public payable {
    require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
        "You need to spend more ETH!!"
    );
    // addressToAmountFunded[msg.sender] += msg.value;
    s_funders.push(msg.sender);
    s_addressToAmountFunded[msg.sender] += msg.value;
}
```

We can check this in the terminal with the command:

```bash
cast sig "stealMoney()"
```

The function selector for stealMoney() is 0xa7ea5e4e, different from the fund() selector.

We'll explore function selectors and this methodology in greater depth later.
