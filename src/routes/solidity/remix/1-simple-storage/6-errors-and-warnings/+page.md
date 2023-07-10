---
title: Errors and Warnings
---

*Follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/HjZQTFrs7qE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<!-- <img src="/solidity/remix/lesson-2/arrays-structs/note.png" style="width: 100%; height: auto;"> -->

## Interpreting the Color Coding

When working with Solidity, if we negligently eliminate something crucial from our code – like semicolon – and then try to compile, we are met with a stream of red error messages. Whenever you see these red errors, it indicates that your code is not compiling. In essence, Solidity isn't able to convert your written code into machine-readable form.

Here's an illustrative error message you might encounter:



<img src="/solidity/remix/lesson-2/errors-warnings/errors2.png" style="width: 100%; height: auto;">



Here, Solidity is complaining about a missing semicolon. So, to rectify this, we simply need to append a semicolon at the appropriate point in the code, then recompile. With the semicolon in place, no errors will occur, and we can go on to deploying our code to the blockchain.

On another note, let's consider what happens when we delete the SPDX license identifier from the top of our code, then recompile. Instead of a sea of red, we get a yellow box alerting us to a warning, rather than an error.

```markdown
> Warning: SPDX license identifier not provided in source file
```
<img src="/solidity/remix/lesson-2/errors-warnings/warning.png" style="width: 100%; height: auto;">



It's encouraging to note that, despite warnings, we can still compile and deploy our code. These warnings function as alerts; not as impediments. However, this should not be interpreted as carte blanche to ignore these alerts. They are warnings for a good reason. Often, they highlight poor or risky practices in your code, sometimes hinting at bugs. Thus, it's often wise to heed these warnings and modify your code accordingly.

To recap:

- If it's <span style="color:red">*red*</span>, it's broken.
- If it's <span style="color:#808000">*yellow*</span>, you might want to double-check.

## Learning to Leverage Online Resources

In situations when the errors or warnings remain cryptic, we can turn to online resources for assistance. Suppose you encounter an error message that leaves you bewildered. In such cases, copying the error message and performing a Google search, or using resources highlighted in this course – such as Chat GPT, GitHub Discussions, Ethereum Stack Exchange – can make the situation clearer. Each of these resources has its strengths and weaknesses, which we will discuss later in the course.

### Utilizing Find – The AI Search Engine for Developers

For instance, using **Find** can prove beneficial. **Find** is an AI-powered search engine for developers. It operates by first conducting a Google search based on your query, then parsing the results to give you a contextual response.

```markdown
> I am getting this compiler error in Solidity. How do I fix it?
```

We can enter the compiler error under the drop-down selection, then execute the search. The result is a detailed insight into why the error occurred and how to fix it.

Alternatively, you can even copy your entire code base, paste it under the drop-down, hit research, and the AI will analyze it for you.

```python
'''code'''
```

It's common practice to use three back-ticks before and after the code block in programming languages.

![](https://cdn.videotap.com/czSDuQK1iCooXwGBLKYi-198.68.png)After intensive AI analysis, **Find** suggests that a simple addition of a semicolon where the new person is being pushed onto the dynamic 'people' array list, can resolve the issue.

The AI suggestions can be a bit verbose at times; hitting the "concise" button shortens this.

## Other Key Online Developer Resources

Several AI tools are still in their developmental stages so they may not always render the perfect solution.

Other remarkable communities include **GitHub discussions, Stack Exchange**, and **Piranha** among others.

> One of the key pieces of being a really good software engineer or a good prompt engineer is less about actually knowing the information and more about knowing where to find the information.

I encourage you to actively use these resources, as they can significantly enhance your understanding and skill.

In later parts of this course, we will take a closer look at posing effective questions, AI prompting, structuring your questions, as well as searching and learning more.

Should you receive a less than satisfactory answer from Find or Chat GBT, feel free to use the GitHub discussions for course-specific queries. For broader questions about Solidity or Foundry, there are several other resources at your disposal.

Congratulations! You've just taken your first steps into the domain of prompt engineering.