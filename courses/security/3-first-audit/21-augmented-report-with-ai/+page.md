---
title: Augmented Report with AI
---

_Follow along with this video:_



---

# Using AI to Improve Smart Contract Codebase Analysis: A Step-by-Step Guide

Hi everyone! Today, I'll take you through an interesting process of utilising an AI tool to improve a detailed analysis of a codebase for a smart contract. We'll specifically use Chat GPT (or similar AI) for this purpose. Let's get going!

## A Background of the Case Study

After an intense session of analysis, we were able to come up with three separate deductions from the smart contract codebase.

![](https://cdn.videotap.com/oa11o3VbVFQH3Vs1bTeD-13.56.png)

Here are our initial findings:

1. `Password Store get password` indicates that the parameter does not exist
2. Storing the password on the chain makes it no longer private as it becomes visible to anyone
3. `Password Store set password` has no access controls, which means a non-owner could change the password.

But these write-ups were not in the best shape, and we needed to work on them. And that’s where AI comes in.

## Introducing AI into Codebase Analysis

Let’s dig deep into how the AI can assist in making our write-ups more polished. If you ever struggle with write-ups and want to validate the grammar, syntax and format, these AI tools can be a savior. Here are the steps involved:

**1. Initiate a dialog with the AI**

Start by introducing your task here. Copy your write-up and paste it into the AI, saying:

> The following is a markdown write-up of a finding in a smart contract codebase. Can you help make sure it is grammatically correct and formatted nicely?

Paste your finding and seal it with four backticks.`

**2. Wait for AI feedback**

![](https://cdn.videotap.com/CloYoQjFvCrEnY8Rw5d7-74.56.png)

The AI will generate insightful feedback, picking up typos, suggesting formats, and assessing the grammar. This can be incredibly helpful in refining the delivery of your findings.

In our case, we had spelled `'incorrect'` as `'incrrect'`, and this was promptly highlighted by the AI. Additionally, it recommended using code format for function signatures and slight grammatical adjustments for better clarity.

We hence received an edited version of our markdown from our AI-assistant. The final read was much clearer and better organized.

**3. Ensure that the feedback is implemented correctly**

To ensure the AI assistant didn’t make any errors or omissions, it's critical to carry out a sanity check of its work.

After we got the feedback, it was time to delete our previous write-up and paste the improved version from Chat GPT.

**4. Final check of the findings**

We quickly cross-checked the edits made by Chat GPT. All function signatures were in place, the descriptions were in order and impact of the code was correctly determined. Also, typos and grammatical errors had been corrected.

After a thorough assessment, we concluded that the final write-up met our desired specifications.

## Conclusion

Artificial Intelligence, through tools like Chat GPT, can significantly streamline technical write-ups. It adds a layer of quality control, ensuring that your findings read well, look good and most importantly, communicate effectively.

Remember to use these tools to your advantage when drafting complex technical reports. But as we've learnt, always remember to cross-check their work to ensure it is free from errors.

That's all for today, happy coding!
