---
title: 5-ai-help-ii
---

_You can follow along with the video course from here._

### Introduction

If you run into (a lot of) questions, it means that you are thinking critically and you are approaching the subject the right way. In this lesson, we'll do an AI-chat example and learn how to effectively ask questions.
AI chat platforms like **ChatGPT** and **Bard**
effectiveness of the answers.

### Ask questions effectively

For example, let's say that you cannot understand the difference between `simpleStorage` and `SimpleStorage` very well:

```solidity
simpleStorage = new SimpleStorage();
```

We can ask the AI to clarify it by:

1. highlighting **only the line(s)** you're confused about and copy it
2. Paste these lines within your question in a **code block format**. You can create a code block by adding three backticks ``` before and three backticks after some text. This will explicitly indicate to the AI that you are referring to a piece of code and not just to a simple text.

This is the AI prompt:

````text
Hi, I'm having a hard time understanding the difference between these simple storages on this line:
```// paste the confusing line of code here```
Here is my full code:
```// paste the full code here```
````

### AI answer

The AI can provide insightful and very comprehensive answers. For instance, an AI may indicate that `simpleStorage` is a variable of type `SimpleStorage`, which is a contract defined in the file `SimpleStorage.sol`.

> 👀❗**IMPORTANT**:br
> AI systems are highly efficient at solving basic coding tasks. However, as the complexity of codebases and projects increases, the effectiveness of AI begins to diminish. Advanced tasks often require deep contextual understanding, innovative problem-solving, and area integrations where current AI capabilities fall short.

### Other resources

Despite their overwhelming benefits, AI chat platforms are not infallible and they can get things wrong. During that time, you can engage in other platforms like [Stack Exchange](https://ethereum.stackexchange.com/), or the discussion forums related to the course on the topic you're studying. For instance, when querying about `SimpleStorage`, an AI response might refer to a 'stored data variable', which doesn't exist in the code you provided. This demonstrates how AI often operates on context-based inference and may occasionally connect to unrelated concepts.

### Conclusion

AI systems are excellent for basic coding tasks but may struggle with complex projects, which require deep understanding and innovative solutions. For more precise help, highlight specific code lines in a code block or you can use additional resources like Stack Exchange for further clarification.

### 🧑‍💻 Test yourself

1. 📕 Review the first section of this Solidity course again. Identify three concepts that seem unclear and ask the AI to explain them to you.
