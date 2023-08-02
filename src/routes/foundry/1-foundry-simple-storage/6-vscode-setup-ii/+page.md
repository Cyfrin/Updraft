---
title: VSCode Setup II
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/h9_3Ir-8Q0U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Mastering Visual Studio Code and GitHub Copilot

As an ardent coder, mastering your programming environment tools is essential for optimum productivity. Today, our focus lands on Visual Studio Code (Vs code) and a fascinating AI extension – GitHub Copilot. Here's a walkthrough guide on how to optimize these tools effectively.

<img src="/foundry/6-vscode-ii/vscode1.png" style="width: 100%; height: auto;">

## Understanding the Vs code Interface

Firstly, we'll check out some convenient shortcuts and features in Vs code. You might observe me using the `control backtick` command frequently since it quickly toggles terminal visibility. Another shortcut I typically use is `Command J`. This key binding allows a quick toggle for panel visibility — handy when you need to alternate between terminal commands and code writing.

On the Vs code interface, the Explore button opens up a space where you can create a file. This could be a simple text file or more complex files for your programming language of choice from Python, Java, JavaScript, Solidity, and more.

<img src="/foundry/6-vscode-ii/vscode2.png" style="width: 100%; height: auto;">

### Note on Saving Files

Each open and unsaved file is marked with a small white dot on the tab. Not having your file saved could cause unexpected behavior when you run your code. Therefore, always remember to save your edits with `Command s` (Mac) or `Control s` (Windows and Linux). This key shortcut makes the white dot disappear, indicating your file is saved.

Here's a fun fact: you have the unsaved and saved markers to remind you of your file's state. Ensure to establish a routine of hitting `Command s` after each significant edit to your code – it saves you a lot of time, trust me!

Should you need to delete the file, a simple right click on it and selecting `Delete` gets the job done promptly.

## Adding AI Capabilities with GitHub Copilot

On the discussion of Vs code features, it's incredible how AI integration in Vs code can significantly improve your coding efficiency. When you click on the Extensions button (it looks like a box), you'll find a search box to install different extensions.

For AI use, you may want to consider using GitHub Copilot. Although it's a premium service, its intuitive AI-powered code autocomplete feature could be a game-changer for you. Of course, you can choose to go with other AI extensions based on your preferences.

Once you have installed the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot), you will need to sign in to your GitHub account to activate it on Vs code. Having this set will introduce a flyout on the right that auto-generates code suggestions as you type.

<img src="/foundry/6-vscode-ii/vscode3.png" style="width: 100%; height: auto;">

As you code, GitHub Copilot offers code suggestions which you can auto-fill by hitting tab. The AI can alternatively present you multiple code solutions if you hit the up and enter keys. You can then select the most suitable option from the code suggestions list.

On a side note, if you're more conscious about sending data (_telemetry_) to Microsoft through Vs code, you can consider using [VSCodium](https://vscodium.com/). It's an open-sourced version of Vs code that does not send telemetry data to Microsoft.

Also, if you love the GitHub Copilot, you might want to check out [GitHub Copilot Labs](https://copilot.github.com/) as well. It features the AI's experimental features, which might be worth exploring.

## Setting up a Project Folder

To set up a new directory for your coding projects, open the terminal and type `mkdir MyProjectFolderName`, then navigate to it with `cd MyProjectFolderName`. Note that you can use tab completion for the folder name.

The command helps you quickly create and move into a folder where you can store all your repositories.

```bash
    mkdir FoundryF23
    cd FoundryF23
```

Another cool trick is typing the first few characters of your commands or filenames within your terminal and hitting tab to autocomplete. Get better at identifying which commands or filenames can be autocompleted with practice.

So, moving forward:

<img src="/foundry/6-vscode-ii/vscode4.png" style="width: 100%; height: auto;">

## Summing Up

Underutilizing your development environment tools could be costing you precious coding time. It's why I've shared how you can quickly explore files, edit and save files, use shortcuts, and add AI capabilities using GitHub Copilot on Visual Studio Code.Proper utilization of these features is very critical to enhancing your coding experience and productivity.

Remember, in modern-day coding, AI capabilities can be an invaluable resource. Hence, as we move forward, keeping our repositories organized in a single folder will be an enormous boost to efficiently managing our multiple coding projects. Additionally, it makes it easy to reference our projects. Happy coding!
