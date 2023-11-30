---
Formatting a Question
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/LYVXiIFwLTQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Hello awesome coders! Today, we are going deep into a universal quandary every programmer undergoes: asking good questions in a code discussion. Sometimes, we might find ourselves in a situation where the issues we encounter in our code might befuddle us to an extent where we start panicking and spout out poorly crafted questions, which are often met with equally poor responses. Within the scope of this post, we'll explore ways we can craft our queries better using GitHub and reap the benefits of effective communication.

## Creating Discussions in GitHub

Firstly, in order to participate in or initiate a discussion, you will need to navigate to the "discussions" tab. This could be found in any repository of your GitHub account.Create a new discussion and appropriately label it depending on the nature of your query.

For instance, this is how I created mine:

```
Navigate to discussions
    1. Hit 'new discussion'
    2. Select category as "Q&A"
    3. Enter title as "Test Discussion"
```

<img src="/solidity/ai-prompting/question1.png" style="width: 100%; height: auto;">

## The Art of Asking Questions

We often come across questions that are asked in a hasty and incoherent manner. For instance, questions like, "Hey, why my code not be good?" can often confuse the respondent due to its vague representation. This type of practice not only hinders the quality of communal learning but also makes the process chaotic and inefficient.

<img src="/solidity/ai-prompting/question2.png" style="width: 100%; height: auto;">

So how do we fix this?

Quite simply, we can take the following necessary steps while crafting our questions:

1. **Describe the issue clearly and briefly**
2. **Highlight the specific error we're experiencing**
3. **Use markdown for code formatting**
4. **Share the relevant part of the code causing the issue**

Let's delve into applying each step now.

### Illustrating the Problem Clearly

Stating our problem clearly helps respondents to quickly paddle through the sea of questions and understand our issues properly. Try making your description as explicit as possible.

For instance, you could say, "_I am receiving this error while compiling_" specifying what action is causing the error.

### Highlighting the Error

Copy your error verbatim and paste it in your question. This will give an exact gauge of the problem at hand.

### Markdown for Code Formatting

Using markdown to format code sections immensely improves the visibility and readability of the code. You can represent code snippets by wrapping them around three backticks like so:

````markdown
    ```Specify the language here e.g. Solidity
        ---code snippet here---
    ```
````

### Sharing Relevant Code

The last thing we want is to overwhelm our readers with lots of unrelated code that does not contribute to the issue at hand. Hence, always share just the chunk of your code that is directly causing the issue.

Here's an example of how you combine all these steps into a well-crafted question:

````
I am receiving this error while compiling:
    ---Error message here---
Here's my code:
    ```
        Solidity Relevant code snippet here
    ```
````

Can someone help me figure out what the issue is?

This revised format will yield substantial answers both from humans and intelligent AIs like Chat GPT.

Adding Syntax HighlightingAdding syntax highlighting is another useful tip which will help your code snippets look more understandable. While using the markdown three backticks to represent your code, you can also specify the programming language used. This way, the platform will highlight your code as per the syntax of that language, making it even more legible.This is how you add syntax highlighting:

<img src="/solidity/ai-prompting/question3.png" style="width: 100%; height: auto;">

Conclusively, we understand that every question is a valid question. But a well-formulated one makes the difference in getting clear, useful responses from both humans and AI. The art of question-asking is an essential skill that improves with practice, making both the process of asking and answering questions much more efficient and enjoyable.## Active Participation in the Coding CommunityRemember, GitHub isn't just a tool for code storage; it's a vibrant community of developers eager to learn and help each other.

The growth and interactions within this community have enabled me to meet a plethora of brilliant minds in the industry. Participate in these discussions, help out a fellow coder with their questions, and use the platform's facilities to their full extent. Following this "Question and Answer debt" approach not only fosters the spirit of learning together but also enables us to grow faster in our coding journey.

So go ahead, get involved, and start asking your questions right – and don't forget to help out someone else while you're there! Happy coding!
