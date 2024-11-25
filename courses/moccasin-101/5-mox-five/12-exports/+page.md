## Exports

The next question we'll address is how to access functions from another Vyper contract.  We'll demonstrate this with our `five_more` contract.

First we'll have a look at the `five_more.json` file, specifically the `abi` portion:

```json
{
  "contract_name": "five_more",
  "bytecode": "346180615761000c61001e565b100286100e565b396100266100f358600760055",
  "abi": [
    {
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": [],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "retrieve",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "store",
      "inputs": [
        {
          "name": "new_number",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "my_name",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "my_favorite_number",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "list_of_numbers",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "list_of_people",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "index",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "name_to_favorite_number",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "map(string,uint256)"
        }
      ]
    }
  ],
  "vmf": "evm"
}
```

We can select which functions we want to expose in our contract.

We'll use the `exports` keyword to achieve this:

```vyper
exports: (
    favorites.retrieve,
    favorites.store
)
```

We can access these functions from our `five_more` contract by using the following format:

```vyper
favorites.retrieve()
```

```vyper
favorites.store(new_number)
```

Let's add another external function called `store` that adds a new number to the  `my_favorite_number` variable:

```vyper
@external
def store(new_number: uint256):
    favorites.my_favorite_number = new_number + 5
```

Let's compile our updated `five_more` contract:

```bash
mox compile
```

We can now use the `store` function in our `deploy.py` script to store a new value in the `my_favorite_number` variable:

```python
five_more_contract.store(90)
print(five_more_contract.retrieve())
```

And now we'll run our deploy script:

```bash
mox run deploy
```

We should see that `retrieve` gives us a new value of 95!

We can think of the `exports` keyword like this, if we have a contract `favorites.vy` inside of `five_more.vy`.

Using the `exports` keyword allows us to define which of the functions or public variables from `favorites.vy` we want to expose publicly in our `five_more.vy` contract.
