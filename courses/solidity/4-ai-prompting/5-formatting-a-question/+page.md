---
Formatting a Question
---

_Follow along the course with this video._

Hello, coders! In this lesson we'll be covering the importance of well crafted questions and how to properly format our inquires to give them the best chance of receiving a response.

## Creating Discussions in GitHub

As practice, I want you to navigate to the [**GitHub discussions page**](https://github.com/Cyfrin/foundry-full-course-f23/discussions) for this course and try creating a discussion yourself!

> Try to categorize your discussion appropriately. `General` for conversations and discussions, `QA` for questions.

![question1](/solidity/ai-prompting/question1.png)

## The Art of Asking Questions

We often come across questions that are asked in a hasty and incoherent manner. Here's an example of a poorly formatted question:

```
"Hey why my code not be good?"

quire(msg.value == entranceFee * newPlayers.length, "PuppyRaffle: Must send enough to enter raffle");
        for (uint256 i = 0; i < newPlayers.length; i++) {
```

We need to be clear in describing our problem, the steps we took that got us to the problem, and explicit in any errors we're receiving.

A better example would be:

"I am receiving this error when compiling.":

```bash
TypeError: Exactly one argument expected for explicit type conversion.
--> PriceConvertor.sol:21:43:
|
21|    AggregatorV3Interface priceFeed = AggregatorV3Interface()
|
```

Here's my code:

```js
AggregatorV3Interface priceFeed = AggregatorV3Interface()
```

Could someone please help me figure out what the issue is? 🙏

Quite simply, we can take the following necessary steps while crafting our questions:

1. **Describe the issue clearly and concisely** - Be clear in the problem you're facing and what steps got you there
2. **Highlight the specific error you're experiencing** - including exact error messages can provide those helping you with valuable insight into where things went wrong
3. **Use markdown for code formatting** - this is critical, formatting your code allows your question to be more readable and approachable for those trying to understand the problem
4. **Share the relevant part of the code causing the issue** - only include what's relevant to your issue. Don't paste a whole contract into your question unless appropriate to do so. You can provide _too much_ information.

With a well formatted question, you're going to see a much higher rate of success in receiving help from others as well as AI.

> The importance of markdown formatting cannot be stressed enough. If you're unfamiliar with markdown, don't hesitate to ask an AI like ChatGPT for advice, or to format things for you.

### Wrapping Up

Always remember, there are no _`bad questions`_ but there are _`poorly formatted questions`_. Make your questions count and format them appropriately.

A pillar of becoming a software engineer is being involved in these communities. Jump in and participate, ask questions and meet people. Contribution is the cornerstone of open source communities. Do your best to answer as many questions as you ask, this will reinforce your knowledge.

> You don't have to be an expert to help those on the journey behind you.
