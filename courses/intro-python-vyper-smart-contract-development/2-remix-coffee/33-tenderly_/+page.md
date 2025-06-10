We are learning to build a smart contract that will allow users to send funds, with the goal of buying a coffee. We will also explore the concept of interfaces, how we can use interfaces to retrieve data and perform actions from our contract, and how to use a price feed.

We will be building our contract in the Remix IDE. Remix IDE is a great tool for developing smart contracts and interacting with them on the blockchain. It provides a user-friendly interface for writing, compiling, deploying, and testing smart contracts.

First, we will create a new Remix project and write the following code:

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD
pragma version ^0.4.1
@license: MIT
@author: You!

# We'll learn a new way to do interfaces later...
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view

minimum_usd: public uint256
price_feed: public AggregatorV3Interface # 0x6944A41769357215DE4F4C0881f1f309a0DC325306 sepolia
owner: public address
funders: public DynArray[address, 1000]

# funder -> how much they funded
funder_to_amount_funded: public HashMap[address, uint256]

# Keep track of who sent us
# How much they sent us

@deploy
def __init__(price_feed: address):
    self.minimum_usd = as_wei_value(5, "ether")
    self.price_feed = AggregatorV3Interface(price_feed)
    self.owner = msg.sender

@external
@payable
def fund():
    """Allows users to send $ to this contract
    Have a minimum $ amount to send
    How do we convert the ETH amount to dollars amount?
    """

    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] += msg.value

@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.
    How do we make sure only we can pull the money out?
    """

    assert msg.sender == self.owner, "Not the contract owner!"
    send(self.owner, self.balance)

    # resetting
    for funder: address in self.funders:
        self.funder_to_amount_funded[funder] = 0
    self.funders = []

@internal
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """

    price: int256 = staticcall(self.price_feed, latestAnswer())
    eth_price: uint256 = (convert(price, uint256) * 10**18) / (10**10)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) / (1 * 10**18)
    return eth_amount_in_usd * 10**18 # 0's, 18 decimal places

# 5 000000000000000000
```

After we have written our code, we are ready to compile it. We can do so in Remix by clicking the "Compile" button and selecting the desired compiler version.

Once we have compiled our code successfully, we can deploy it to the blockchain. We will first need to connect to the blockchain network. In this case, we are connecting to a fake virtual testnet that we have created on Tenderly. You can create a virtual testnet on Tenderly for free. We will be deploying our contract to this virtual testnet. Once you are connected to the network, you can deploy the contract by clicking the "Deploy" button in Remix. You will also need to provide the price feed address. The price feed address is the address of the Chainlink price feed.

Once you have provided the price feed address and deployed your contract, you can now start testing.

Let's switch to our account 2 and fund it with 1,000 ETH using the Tenderly faucet.

```bash
1000
```

Next, we will confirm the fund function, and we should see that account 2 has been funded.

Now, let's switch back to our owner account (account 1). We can see that account 1 is connected. We can now call withdraw on the contract.

Now we'll verify that only the contract owner can withdraw the funds. To do this, we will switch back to account 2 and try to withdraw the funds. We will confirm this action in MetaMask, and we expect it to fail.

And it does! We can now switch back to account 1, the owner, and attempt to withdraw our funds.

We will confirm this action in MetaMask, and we expect it to succeed.

As we can see, it succeeds! So, our smart contract is doing everything that we wanted it to do. We now have a way to deploy our contract and update some starter variables in our contract constructor (aka the init function). We can fund the contract and make sure there is a minimum dollar amount that must be hit in order to even fund this contract. We're keeping track of how much and who is sending us money for us to go buy a coffee, and then only we can withdraw the money out, that is withdrawn with this send function from the contract. Then, we're going to reset those data structures that are keeping track of the funders. We have a way to actually get the price of this data, and we have a little external function as well, so that we can make sure everything is working. This is fantastic! Great job.

Now, if you want to go the extra mile and actually test this on a true testnet, like Sepolia, you can, but again, like I said, getting testnet Sepolia can be very tricky, very difficult. So, we're going to, So, I don't recommend you do this, because you're going to run into a lot of issues. However, So I highly recommend we just stick with the Tenderly virtual testnet here, which again, shows us all these transactions very similar to what an explorer would do anyways.
