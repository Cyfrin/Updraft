---
title: AI prompting and Forums
---

_Follow along the course with this video._

The barrier for entry into the world of software and blockchain engineering is smaller than ever. Inevitably we're going to run into problems while coding and knowing where and how to find solutions is an extremely valuable skill.

Here are the exact 6 steps to solve any problem you may face.

1. Tinker
2. Ask Your AI
3. Read Docs
4. Web Search
5. Ask in a Forum
6. Ask on the Support Forum or GitHub
7. Iterate

Lets go through them.

### Tinker

Pinpoint your error, review your code manually making small adjustments you suspect may resolve the issue. Pinpointing the error in your code will help you frame your question/prompt in the next step.

![debug1](/solidity/ai-prompting/debug1.png)

### Ask Your AI

There are several AI models available these days, each with their pros and cons. Here are a few to consider.

- [**ChatGPT**](https://chat.openai.com) - The OG. This model offered by OpenAI is robust, multi-modal, includes code interpretation and can browse the web. The best quality unfortunately comes from the paid version.
- [**Phind**](https://www.phind.com/search?home=true) - This is a programming focused model with intuition allowing it to proactively ask questions to clarify assumptions. Can also browse the web, and has a VS Code extension!
- [**Copilot**](https://www.microsoft.com/en-us/edge/features/copilot?form=MA13FJ) - formerly `Bing Chat`, and not to be confused with the IDE AI assistant, Copilot is rapidly becoming Microsoft's whole ecosystem response to the age of AI
- [**Google Bard**](https://bard.google.com/) - ehhhhh - results may vary.

There are `6 principles` to prompt engineering to get the best out of your AI.

- **Principle 1:** Write clear and specific instructions
- **Principle 2:** Give as much context as possible
- **Principle 3:** Use delimiters to clearly indicate distinct parts of the input
- **Principle 4:** Look out for `hallucinations`
- **Principle 5:** Understand the limitations of the model - many have strict context token limits (though this is rapidly changing)
- **Principle 6:** Iterate constantly

> Hallucinations are when an AI provides a response that it thinks is correct, but is wrong. These can be hard to spot and require a little experience to call out.

Asking questions is a skill, so keep practicing. There's a great free course at [**learn.deeplearning.ai**](https://learn.deeplearning.ai/) that can help software engineers become better prompt engineers.

### Read Docs

If a problem is occurring with a particular implementation, framework, language - whatever - you can almost always read the documentation for further insight and examples of how to accomplish your goals.

> You can even use AI to help you here by copying docs as context into a model like ChatGPT and asking questions to it

### Web Search

Something many AIs are lacking is the ability to retrieve up to date information, or they're limited by not having access to the web. This is where good ol' fashioned web search comes in.

If you're running into an issue, it's highly likely someone else has to, and search engines like Google have already indexed these questions to serve their answers to you.

> Note: AI Models are advancing rapidly and many models as of Dec 2023 also include web search.

### Ask in a Forum

Sometimes the information we need just isn't out there and we're forced to interact with _human beings_

We always want to ask our questions in a web-indexed forum which will allow search engines and future AI models to index this new information. A few examples are:

- [**Ethereum Stack Exchange**](https://ethereum.stackexchange.com/) - a community-driven question-and-answer platform dedicated to Ethereum, and blockchain technology
- [**Stack Overflow**](https://stackoverflow.com/) - online platform that facilitates knowledge exchange and problem-solving within the global programming and software development community
- [**Peeranha**](https://peeranha.io) - Peeranha is a decentralized knowledge sharing platform built on web3 technology, particularly blockchain
- [**Reddit**](https://www.reddit.com/) - Reddit is a widely popular and diverse social media platform that serves as a hub for online communities, discussions, and content sharing

Questions asked on Discord and Twitter are likely to get buried in their conversational chaos and will never be indexed, so use these avenues sparingly.

> The super secret alpha is to post your question on a forum like Stack Exchange, then link to that question in your Discord message!

Always remember to format your questions using markdown when appropriate.

### Ask on the Support GitHub or Forum

If the tool you're using isn't open source - maybe reconsider how necessary it is! Haha

Open source projects on GitHub allow people to submit improvements and raise issues, this is how we improve our code.

### Iterate

Repeat the above steps again and again.

### General Tips

The above are a number of effective steps to overcome issues you'll have while learning. Here are a few additional general tips to keep in mind:

1. **Limit self-triage to 15/20 minutes** - don't force yourself to struggle through solving an issue alone. There are countless tools available to assist in focusing on where the error is and how to solve it
2. **Don't be afraid to ask AI, but don't skip learning** - AI is going to `hallucinate` it's going to get things wrong. It's only by learning and understanding the underlying concepts that someone will be able to spot these errors and inconsistencies
3. **Use the Forums!!!** - Asking questions in the GitHub discussions and on forums is a great way to find support - and helping others with their problems is a great way to reinforce what you've learnt
4. **Google the exact error** - A problem you're having is likely to have been faced by someone else. Leverage search engines to find past solutions
5. **Make Accounts on Stack Exchange and Peeranha** - These communities are invaluable to assist with Web3 software engineering and coding problems. Use them.
6. **Post Issues on GitHub/Git** - Interacting with the community is an integral part of the Web3 and software development communities. Open source projects allow the submission of `Issues` and `Pull Requests` on GitHub. Be respectful, but if you're unable to find answers, or believe you're hitting a bug in a protocol - creating issues is a great way to bring these problems to a project's attention.

> Be sure to search for already open issues before submitting a new one to an open source project

If you don't have any experience with GitHub, don't worry. Our next lesson will be going over the set up of an account to get you started.

And, as ChatGPT would say "Keep hopping through the code, and until next time, stay ribbeting, my fellow blockchaineers!" 🤦‍♂️😬
