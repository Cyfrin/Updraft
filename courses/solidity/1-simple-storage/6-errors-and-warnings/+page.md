---
title: Errors and Warnings
---

_You can follow along with the video course from here._

<a name="top"></a>

## Introduction

In the previous lesson, we learned how to combine arrays and structs to store information and how to manipulate this information with the function `addPerson`. This time we'll explore errors and warnings and how to leverage forums, search engines and AI resources.

## Errors and Warnings
If we remove a semicolon from the code and then try to compile it, you'll encounter some 🚫 **error messages**. They will prevent the compiler from converting the code into a machine-readable form.

<img src="/solidity/remix/lesson-2/errors-warnings/errors2.png" style="width: 100%; height: auto;">

Placing the semicolon back in its place, will prevent any errors and lets us proceed to deploy the code to the Remix VM. 
On the other hand, if we delete the SPDX license identifier from the top of our code and recompile, we will receive a yellow box showing a ⚠️ **warning**.
```markdown
> Warning: SPDX license identifier not provided in source file
```
<img src="/solidity/remix/lesson-2/errors-warnings/warning.png" style="width: 100%; height: auto;">

Unlike errors, **warnings** allow the code to be compiled and deployed but it's wise to take them seriously and aim to remove them entirely. They point out poor or risky practices in your code and sometimes indicate potential bugs.

- If it's <span style="color:red">_red_</span>, there is a compilation error in the code and it needs to be solved before deployment.
- If it's <span style="color:#808000">_yellow_</span>, you might want to double-check and adjust your code.

## Leverage your resources
In situations when you do not understand the error that's prompted, using some online resources can make the situation clearer:

- AI Frens (ChatGPT, Phind, Bard, AI Chrome extensions,..)
- Github Discussions
- Stack Exchange Ethereum
- Peeranha

### Phind
Let's now attempt to resolve the semicolon error we intentionally created before by using [Phind](https://www.phind.com/). Phind is an AI-powered search engine for developers. It operates by first conducting a Google search based on your query, and then parsing the results to give you a contextual response.

We can input the compiler error under the drop-down menu, execute the search, and get a comprehensive explanation of why the error happened and how to fix it.

<img src="/solidity/remix/lesson-2/errors-warnings/phind-answer.png" style="width: 100%; height: auto;">

### Othe resources
It is advised to make active use of AI tools, as they can substantially boost your understanding and skills. Later in this course, we will explore how to ask effective questions, utilize AI prompts, structure your inquiries, and improve your search and learning techniques.

You can also take part of online communities like **GitHub discussions** and **Stack Exchange**, where you'll find valuable insights, answers to your questions, and support from fellow developers.

💡 **TIP** <br>
**One of the key pieces of being a really good software engineer or a good prompt engineer is less about actually knowing the information and more about knowing where to find the information**

## Conclusion

You’ve just learning to confront errors and warnings directly. In the following lesson, we will delve deeper into Solidity’s data locations and the advanced functionalities of Remix.

## 🧑‍💻 Test yourself

1. 📕 What's the difference between a warning and an error? Make an example of each.
2. 🧑‍💻 Make a written list (or a bookmark in your browser) with at least 3 useful online resources that can help you solve future bugs.

[Back to top](#top)