---
title: AI Help III
---

*Follow along this chapter with the video bellow*

<iframe width="560" height="315" src="https://www.youtube.com/embed/rMVou5VIkm0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In our quest for mastering the field of programming, questions and confusions are inevitable stepping stones. From deciphering the unintended consequences of a code block to understanding the intricate mechanisms behind built-in functions, every step in this journey is an opportunity to learn something new. Today, we'll discuss a common confusion that many developers stumble upon: *How does a Solidity function return a value when no logic is defined within it?*

We'll simplify this problem by providing a context of the Aggregator v3 Interface and explore the interaction between the function, contract, and the address associated with it. This lesson signifies an interactive approach where we speculate, ask questions, and validate our understanding of the topic with the help of AI model Chat GPT. So, let's dive in!

## The Conundrum of the 'Get Version' Function

The journey begins with an intriguing question related to the Solidity function from the Aggregator v3 Interface.

Here's the question that sets the ball rolling:


<img src="/solidity/remix/lesson-4/aihelp/ai1.png" style="width: 100%; height: auto;">


To form a clearer picture, let's look at the code snippet in question:

```js
function getVersion() external view returns (string memory);
```

One of the common challenges new developers face is understanding the underlying mechanism of this 'get version' function. How is it able to return a value when there isn't any code defined in the Aggregator v3 Interface? Moreover, what makes it work when we insert an address?

This is where the incredible AI model Chat GBT comes into play to help unravel the mystery.

## Insights from AI

In response to the confusion at hand, our AI companion provided an enlightening explanation. According to Chat GBT v3.5,

<img src="/solidity/remix/lesson-4/aihelp/ai2.png" style="width: 100%; height: auto;">


This confirms our suspicion.

<img src="/solidity/remix/lesson-4/aihelp/ai4.png" style="width: 100%; height: auto;">


The `version` function exists within the contract that incorporates this interface. By wrappering the address with Aggregator v3 Interface, we're instructing our Solidity compiler that at this address lies the 'version' function or all the functions encompassed within the Aggregator v3 Interface. If this address lacks the 'version' function, the code would break.

## Further Clarification: What Happens If The Function Doesn't Exist?

Given the proactive nature of our AI companion, it is responsible and recommended to ensure accurate responses. So, it raises the question: *What would happen if that contract address didn't have that function?*

As explained by our AI:

<img src="/solidity/remix/lesson-4/aihelp/ai3.png" style="width: 100%; height: auto;">

What this entails is that despite not leading to a compilation error, the transaction would consequently revert if the contract address lacks a 'version' function.

## Cross-Verifying with Discussions Forum

Accurate understanding is of paramount importance, and therefore, double-checking is a good practice. In such a scenario, the next step would be to validate this understanding on a discussions forum.

In conclusion, this lesson elucidates the inner workings of the 'get version' function and the Aggregator v3 Interface, unravelling the hidden interactions and dependencies with the help of AI. By constantly questioning and confirming our understanding of each step, we can ensure we are on the path to mastering blockchain programming.

Keep learning and we'll see you on the next lesson. Happy coding!

