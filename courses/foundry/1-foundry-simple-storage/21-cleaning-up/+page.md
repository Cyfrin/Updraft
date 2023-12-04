---
title: Cleaning Up
---

_Follow along the course with this video._



---

## Mastering a Basic Coding Project: Formatting and README files

Hello, we've covered a lot, and are rounding the corner to completion. As we look to wrap things up, let's focus on a couple of aspects that are essential for rounding out any project: Formatting and README files.

## Formatting for Consistency

In this project, we've been using the powerful tool - Vs code auto-formatter to automatically format our code. This saves us tedium and ensures a consistent style throughout our files. But what happens when someone else comes to our codebase? We want them to apply formatting that aligns with our style. For this, we can use the `forge format command`.

When we run `Forge format command`, our code reformats according to predefined rules. This command ensures that all our solidity code adheres to a consistent style.

```bash
forge fmt
```

You'll notice upon running this command that your code moulds itself into a neat and tidy format. Try it out - save without formatting, run the command, and watch your code auto-formatted right before your eyes.

## Crafting a README

Every code repository isn't complete without a readme. If you want to contribute to open source, you'll find this file in almost every single repo. Your next stop, therefore, should be creating a `README.md` file. We create this by clicking on `right click new file` and then typing `README.md`.

In this all-important file, you document critical information about your project: what it's about, how it works, instructions for collaborating, contact details, so on.

```bash
touch README.md
```

<img src="/foundry/21-clean-up/readme1.png" style="width: 100%; height: auto;">

Take a look around. README files also contain notes and other bits of important information. I had jotted down some notes about private key usage in my README. Although it's no longer needed, so we'll just delete that for now.

While this project isn't headed for GitHub, it's crucial to remember that the README is an invaluable addition when you push your code to platforms like GitHub. We'll get into this more in our next project, where I'll guide you through using version control systems and repositories.

## Marvel at Markdown

README files make use of 'Markdown' syntax, a text-to-HTML conversion tool for web writers. Do you remember when we discussed using Markdown syntax to field questions? Guess what, we're back at it again!

A quick run-through: To use markdown in our README, we can use a `#` for headlines, and simple text entry for regular lines. Here's a sneak peek:

```markdown
# HelloSome text here
```

To view what this looks like in HTML form, we can install a handy extension such as 'Markdown all in one' or 'Markdown Preview'.

```bash
Command Shift P > View command palette > Markdown preview > Open preview
```

This combination gives us a preview replicating how the document might look like on GitHub.

<img src="/foundry/21-clean-up/readme2.png" style="width: 100%; height: auto;">

You will notice that the headline "Hello" is big and bold, while "Some text here" retains regular formatting. Moreover, you can add 'backticks' to format a line as code.

```
 `code here`
```

<img src="/foundry/21-clean-up/readme3.png" style="width: 100%; height: auto;">

Pro-tip: A quick `Command Shift V` (or `Control Shift` for Windows and Linux users) opens up Preview mode.

<img src="/foundry/21-clean-up/readme4.png" style="width: 100%; height: auto;">

That's all for now! Remember, formatting and a well-documented README are integral to any project - big or small. Stay tuned for more tips, tricks, and insights into the exciting world of coding. Happy Coding!
