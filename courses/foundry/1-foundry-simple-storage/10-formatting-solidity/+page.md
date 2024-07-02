---
title: Formatting Solidity in VS Code
---

_Follow along the course with this video._



---

# **Improving Code Format in Visual Studio Code**

In this blog post, we're going to explore how to greatly improve the readability and maintainability of your smart contracts by cleaning up your Solidity code format within Microsoft's Visual Studio Code (VSCode). Let's get started!

<img src="/foundry/8-formatting/formatting1.png" style="width: 100%; height: auto;">

## **Solidity Code Formatting**

When you first start, your code might just look like a whole bunch of dull, lifeless, white text. While some cool trinkets are embedded in the code such as the oftentimes cute little ETH logo, deciphering your code becomes a real chore without proper formatting.

Lucky for us, there are many wonderful extensions available on VSCode that can format our Solidity code. Simply input "Solidity" in the Extensions bar to reveal a treasure trove of options. Out of these, a few worth mentioning:

1. The general "Solidity" extension
2. [Hardhat Solidity](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity), a personal favorite, despite being another framework, works wonders in Foundry
3. Solidity visual developer, another popular choice
4. And Juan Blanco's [extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity), which is probably the most used Solidity extension worldwide

For this blog, we'll demo the [nomic foundation Solidity Vs code extension](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity). Once this extension is installed, your Solidity files should now appear with syntax highlighting, making it vast easier to read and understand.

### **Activating the Extension**

If the code remains unhighlighted despite having installed the extension, there's a quick solution to that. Press `Command Shift P`, or `Control Shift P` on Windows. This opens up the command bar.

In the command bar, type in "Settings" and select "Preferences: Open User Settings". This will open your user settings in JSON format. If you have nothing in there, create a new setting with these brackets `{'{'}...{'}'}` and type in:

```json
{
  "editor.defaultFormatter": "NomicFoundation.hardhat"
}
```

..and you're all set! This way every time you open your Solidity code, VSCode will automatically use Hardhat extension for formatting.

## **Formatting TOML Files With Better TOML**

The good news doesn’t end with Solidity files alone. Even your Foundry TOML files can be formatted for better readability. Again, head over to Extensions and type in TOML.

Install [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml). This cool extension appropriately highlights your Foundry TOML files, making it much easier to locate and edit keys.

**Pro Tip:** Any time a little dot appears next to the file name on your tab, it means the changes aren’t saved. Make it a habit to frequently save your work with Command S or File -&gt; Save.

## **Automatic Code Formatting**

A great feature of text editors is the ability to format your code automatically. Let's say you have a block of code that's entirely out of whack. You can set your VSCode to automatically format the block once you save it. Here’s how.

Repeating the Command Shift P step brings up the command palette. If you type in 'format document', it will instantly apply the default formatter to the open file. If the auto formatter does nothing, first ensure you've set Hardhat as your default formatter in your settings file.

For those who prefer automatic formatting, navigate to User Settings and check 'Editor: Format On Save'. This way, every time you save your Solidity code, it automatically gets formatted.

For cases where you might not want your document formatted, all you have to do is open the command palette (Command Shift p/View -&gt; Command Palette) and type 'save without formatting'. This will save the file without applying any formatting rules. However, remember to turn back on formatting when done.

<img src="/foundry/8-formatting/formatting2.png" style="width: 100%; height: auto;">

In conclusion, formatting is something we pretty much never want to skip. Even though it might seem inconsequential, a well-formatted code can save a lot of debugging time and make your code way more maintainable and understandable. So start using these principles today and write smarter contracts! Happy hacking!
