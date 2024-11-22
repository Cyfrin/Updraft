## AI Prompting Introduction

In the age of AI, debugging and getting into software engineering has never been easier. Here are the exact six steps we need to take to unblock ourselves from any software engineering error we'll ever get:

1. **Tinker** - Try to pinpoint your error. We can usually use an AI buddy to help us out here. Pinpointing your error will potentially solve your problem before we even go into an AI and allow us to craft a better question to an AI.
    * **Example:** Try adding a debug print to see where the issue is.
    * **Example:** Comment out sections of code to see if it fixes the issue.

2. **Ask your AI** - We can use ChatGPT, Phind, Bing's AI, or if we want to get wrong answers, Google's Bard. There are six principles to prompt engineering so that we can get the best out of our AI.
    * **Example:** Ask "I'm getting this error [Error message]: [Code].  What's the issue?"
 * **Principle 1: Write clear and specific instructions** - Give as much context as possible. 
 * **Principle 2: Give as much context as possible** - Use delimiters to clearly indicate distinct parts of the input.
 * **Principle 3: Use delimiters to clearly indicate distinct parts of the input** - Especially look out for something called hallucinations. 
 * **Principle 4: Look out for hallucinations** - Hallucinations are when your AI gives you an output that it thinks is right, but it's completely wrong. For example, if we write about writing Solidity invariant tests in Foundry, ChatGPT disgraces us by saying we have to npm install it from OpenZeppelin. These can be tough to spot, but once we try it out we'll see it doesn't work.
 * **Principle 5: Understand limitations** - Finally, we want to understand the limitations of the AI we're working with. 
 * **Principle 6: Iterate constantly** - Large language models are trained on human conversations, so we can interact with them as if we're having a conversation, but it's important to know the limitations of these AIs.  As most AIs have a limit on how many tokens or words they can keep in context at one time. AI is trained off of human language, so if we're good at asking other humans questions, we'll probably be good at asking robots questions too. Asking questions is a skill, so keep practicing. I've got a link in the description to learn.deeplearning.ai, which is a free course to help software engineers be better prompt engineers. 

3. **Read docs** - When the AIs can't help us, we'll have to go back to the old standbys, actually doing work ourselves. And one of the first pieces of work is reading the documentation. We should have done this already. However, we can still use ChatGPT because a strategy that we constantly use is, I'll copy paste sections of the documentation, add to ChatGPT's context and say, "Something like the above are the docs for tool X, based on those docs, how do I do Y?"
   * **Example:** "This is a section of Solidity docs: [Copy and paste relevant docs here] This is my solidity code: [Copy and paste solidity code here] Based on the docs, how do I do [Specific goal in code]?"

4. **Web Search** - Google might be crying because ChatGPT is eating its lunch, but Google still has what AI doesn't have - the entire internet. Previously, anytime I ran into an issue, I prayed someone else had run into it before I made a post on it so I could Google search that exact issue. There's a new tool called Phind that combines web search with AI as it does a web search and it crawls through all the data of the sites, reads them all, and then gives us an answer based off of what it reads.
   * **Example:** "How do I debug Solidity code?"

5. **Ask in a forum** - Sometimes, the information just isn't out there and we need to ask human beings. We always want to ask our questions on a web-indexed forum like Stack Exchange, Stack Overflow, Quora, or Reddit. This way web crawlers and more likely AIs can scrape the data from these sites and learn from us. That way the next time we have this question, we can get our answers quickly. Asking on Discord and Twitter is a shit because your knowledge will get lost to the unsearchable hole conversations that Discord is and web crawlers don't index them. 
   * **Example:** "I'm getting this error in Solidity: [Code]. How do I fix it?"
   * **Example:** "I'm trying to deploy my smart contract, but I'm getting this error: [Code]. How do I fix it?"
   * **Example:** "I'm trying to compile my Solidity code, but I'm getting this error: [Code]. How do I fix it?"

6. **Ask support or GitHub** - The super secret alpha is to ask a question on Stack Exchange, and then post your Stack Exchange link to Discord. We should 100% always ask our questions and format them with markdown. And if we're not sure how to do markdown, we can ask ChatGPT to help us format our questions in markdown.
   * **Example:** "I'm getting this error in Solidity: [Code]. How do I fix it?"

7. **Iterate** - Do all these same steps over again. And, as always, keep hopping through the code and until next time, stay ribbeting, my fellow blockchainers.
                    
