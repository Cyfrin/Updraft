---
title: Augmented Report with AI
---

_Follow along with this video:_

---

### Using AI to Polish things up

AI's shouldn't relied upon for everything. They hallucinate and can/will make mistakes. With that said - they are great at writing reports and serving as a sanity check for security researchers.

It's possible we're not confident in our write up, or our grammar or spelling is weak. This is where AI can really shine.

### Proper Prompting

The key to getting a decent response from an AI model (like ChatGPT), is to give it a decent prompt. Formatting and clarity go a long way.

In our care we want the AI to proof read our report and suggest grammar and formatting changes. It's best to give the AI a bit of context.

```
The following is a markdown write-up of a finding in a smart contract codebase, can you help me make sure it is grammatically correct and formatted nicely?

---
PASTE-REPORT HERE
---
```

A prompt like the above will give the AI clear context and clear delineation between your request and the data to analyze (your findings report).

> Note: The AI is going to give you something that _looks_ great at first glance. It's important to double check the AI's suggestions for accuracy. Don't simply copy over it's suggested implementation, this is very risky.

### Wrap Up

Artificial Intelligence, through tools like ChatGPT, can significantly streamline technical write-ups. It adds a layer of quality control, ensuring that your findings read well, look good and most importantly, communicate effectively.

Remember to use these tools to your advantage when drafting complex technical reports. But as we've learnt, always remember to cross-check their work to ensure it is free from errors.
