---
title: Errors and Warnings
---

_You can follow along with the video course from here._

<a name="top"></a>

## Introduction

In the previous lesson, we learned how to combine arrays and structs to store information inside our Smart Contract and how to manipulate this information with the function `add person`. In this lesson, we'll explore errors and warnings and how to leverage forums, search engines and AI resources.

## Interpreting the Color Coding

### Errors

If we remove a semicolon from the code and then try to compile it, we are met with some error messages. This error will prevent the Solidity compiler from converting the code into a machine-readable form. This is what you can expect:

<img src="/solidity/remix/lesson-2/errors-warnings/errors2.png" style="width: 100%; height: auto;">

If the semicolon is put back in its place, no errors will occur, and we can proceed to deploy the code to the Remix VM.

### Warnings

If we instead remove the SPDX license identifier from the top of our code and then recompile, we get a yellow box alerting us of a _warning_.

```markdown
> Warning: SPDX license identifier not provided in source file
```

<img src="/solidity/remix/lesson-2/errors-warnings/warning.png" style="width: 100%; height: auto;">

Unlike errors, warnings allow the code to be compiled and deployed. However, it's wise to take them seriously before deployment and try to remove them: they highlight poor or risky practices in your code and sometimes hint at bugs.

To recap:

- If it's <span style="color:red">_red_</span>, there is a compilation error in the code and it needs to be solved before deployment.
- If it's <span style="color:#808000">_yellow_</span>, you might want to double-check and adjust your code.

## Leverage your resources

In situations when you do not understand the error that's prompted, using some online resources can make the situation clearer:

- AI Frens (ChatGPT, Phind, Bard, AI Chrome extensions,..)
- Github Discussions
- Stack Exchange Ethereum
- Peeranha

### Phind – The AI Search Engine for Developers

For example, let's attempt to resolve the semicolon error we intentionally created by using [Phind](https://www.phind.com/). **Phind** is an AI-powered search engine for developers. It operates by first conducting a Google search based on your query, and then parsing the results to give you a contextual response.

We can input the compiler error under the drop-down menu, execute the search, and get a comprehensive explanation of why the error happened and how to fix it.

<img src="/solidity/remix/lesson-2/errors-warnings/phind-answer.png" style="width: 100%; height: auto;">

### Othe resources

It is advised to make active use of AI tools, as they can substantially boost your understanding and skills. Later in this course, we will explore how to ask effective questions, utilize AI prompts, structure your inquiries, and improve your search and learning techniques.

Other remarkable communities include **GitHub discussions, Stack Exchange**, and others.

💡 **TIP** <br>
One of the key pieces of being a really good software engineer or a good prompt engineer is less about actually knowing the information and more about knowing where to find the information

## Conclusion

You’ve just begun your journey into prompt engineering and learning to confront errors and warnings directly. In the following lesson, we will delve deeper into Solidity’s data locations and the advanced functionalities of Remix.

## 🧑‍💻 Test yourself

1. 📕 What's the difference between a warning and an error? Make an example of each.
2. 🧑‍💻 Make a written list (or a bookmark in your browser) with at least 3 useful online resources that can help you solve future bugs.

[Back to top](#top)