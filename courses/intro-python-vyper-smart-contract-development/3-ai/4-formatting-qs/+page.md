## Formatting a Question

In this lesson, we'll learn how to properly format a question on a forum or when using an AI.

We'll start by creating a new discussion on GitHub.

Click the "Discussions" tab, then click the "New discussion" button. Choose "General" as the category, and you'll be presented with a form.

For the discussion title, let's use "Test discussion".

For the body, we can type something simple, like: "Feel free to say hello here!". After typing, click "Start discussion".

We can then add a comment, which will be our poorly-formatted question. This comment will read:

```
Hey why my code not be good? AggregatorV3Interface priceFeed = AggregatorV3Interface { } 
```

We'll then use a different tool, Remix, to copy the actual error message. We'll be copying the error:

```
TypeError: Exactly one argument expected for explicit type conversion,
-- > PriceConverter.sol:21:43:
AggregatorV3Interface priceFeed = AggregatorV3Interface 
(Relevant source part starts here and spans across multiple lines).
```

Copy the entire error message and then navigate back to our GitHub discussion. 

Let's add a new comment and write: 

```
I am receiving this error while compiling: ```
TypeError: Exactly one argument expected for explicit type conversion,
-- > PriceConverter.sol:21:43:
AggregatorV3Interface priceFeed = AggregatorV3Interface 
(Relevant source part starts here and spans across multiple lines).
```
Here is my code: ```solidity
AggregatorV3Interface priceFeed = AggregatorV3Interface {}
```
Can someone help me figure out what the issue is?

```

You'll notice that our question is now much better formatted and more readable. It also includes the exact error we are receiving and only the relevant code to the error.

We can then copy the entire question and paste it into a new chat in ChatGPT. The AI will be able to read and comprehend the code blocks, which will then provide a good, helpful response.

The AI's response will be something like: "You're receiving the error because you're trying to create an instance of 'AggregatorV3Interface' without providing the necessary address argument for explicit type conversion. You need to supply the address of the deployed ChainLink Price Feed contract when creating the instance. To resolve this error, provide the contract address as an argument when creating the 'AggregatorV3Interface' instance."

By following these steps, you can see how much better your questions will be received both by humans and AIs. This lesson will help you grow and move through your learning journey much faster.  Make sure to spend time answering other people's questions in the forum. Think of it as question and answer debt. Every time you answer a question, make a little mental note to yourself: in the future, I need to at least try to answer one of somebody else's questions. This is how we grow and move so much faster.

We also learned a key formatting technique: code blocks.  Code blocks make your code more readable, and they help AIs to understand the content more easily. We'll cover more formatting techniques in future lessons. 
