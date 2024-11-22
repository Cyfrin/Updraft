## In-Line Vyper Interfaces

In this lesson, we'll learn about in-line interfaces in Vyper.

In-line interfaces are a way to define the functions and return types of a contract without needing to know the logic inside the contract itself. This is useful for interacting with contracts that have been deployed to a blockchain.

We can define an in-line interface by using the `interface` keyword followed by the name of the interface and a colon. Inside the interface, we can define functions using the `def` keyword, followed by the function name and a colon. Then, we use a right arrow (`->`) to specify the return type for the function. An example of defining an interface is as follows:

```vyper
interface AggregatorV3Interface:
    def decimals(self) -> uint256: view
    def description(self) -> String[1000]: view
    def version(self) -> uint256: view
    def latestAnswer(self) -> int256: view
```

We can use this interface to call the functions of the contract without needing to know the logic inside of the contract itself. For example, we could call the `latestAnswer` function using the following code:

```vyper
price_feed: AggregatorV3Interface = AggregatorV3Interface(0x694A4A17699357215D6F4C081f1f309dDC325306)
return price_feed.latestAnswer()
```

This code snippet creates a variable called `price_feed` that holds an interface to the AggregatorV3Interface contract at the address `0x694A4A17699357215D6F4C081f1f309dDC325306`. Then, we can call the `latestAnswer()` function on this variable to obtain the price feed.

Now we'll deploy a custom function, just to get and see this price feed here. 

```vyper
@external
def get_price() -> int256:
    price_feed: AggregatorV3Interface = AggregatorV3Interface(0x694A4A17699357215D6F4C081f1f309dDC325306)
    return price_feed.latestAnswer()
```

Now, we'll go ahead and deploy this. This custom function gets the latest answer from the price feed. It's an integer, but the price feed is using 8 decimals.  We'll want to adjust that.

```vyper
@external
def get_price() -> int256:
    price_feed: AggregatorV3Interface = AggregatorV3Interface(0x694A4A17699357215D6F4C081f1f309dDC325306)
    return price_feed.latestAnswer() / 10 ** 8
```

This is what's going to return that price feed.  We'll go ahead and deploy this to our blockchain.

## Deploying to Blockchain

To deploy this function to the blockchain, we can use Remix. Remix is an online IDE that allows us to write and deploy Solidity code to the blockchain. We'll also want to adjust the `decimals` value in the `AggregatorV3Interface` contract to 8 for this function to work properly.

```vyper
interface AggregatorV3Interface:
    def decimals(self) -> uint256: view
    def description(self) -> String[1000]: view
    def version(self) -> uint256: view
    def latestAnswer(self) -> int256: view
```

This code snippet is defining the interface for the `AggregatorV3Interface` contract. The `decimals` function specifies that the returned value for this function is an `int256` (integer with 256 bits). We need to change this so it reflects the 8 decimals used by the price feed.

Now, we'll paste this code into the `AggregatorV3Interface` contract, just so the `decimals` function now returns the correct value.

```vyper
interface AggregatorV3Interface:
    def decimals(self) -> uint256: view
    def description(self) -> String[1000]: view
    def version(self) -> uint256: view
    def latestAnswer(self) -> int256: view
    def latestRoundData(self) -> (int256,int256,int256,uint256,uint256): view
```

We can see that the `decimals` function is now correctly reflecting the 8 decimals that are being used in the price feed.  We can deploy our `get_price()` function and test it.  When we deploy, the `get_price()` function can be tested and it will return a price feed that is represented by 8 decimals. 
