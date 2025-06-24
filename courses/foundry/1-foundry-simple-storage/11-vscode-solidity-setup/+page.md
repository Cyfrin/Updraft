---
title: VSCode Solidity setup
---

_Follow along with this video:_

---

### Improving Code Format in Visual Studio Code

When you first start, your code might just look like a whole bunch of dull, lifeless, white text.

This can be easily fixed by using one of the `Solidity` extensions. Out of all the Solidity extensions available in the Extensions tab (CTRL/CMD + SHIFT + X) the following are worth mentioning:

1. [Solidity by Juan Blanco](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity), the most used Solidity extension out there.
2. [Solidity by Nomic Foundation](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) is Patrick's favorite Solidity extension. The rest of the course will be displaying this extension.
3. [Solidity Visual Developer](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor) is another popular choice.

**NOTE**: If the code remains unhighlighted despite having installed the extension, there's a quick solution to that. Press `Command + Shift + P`, or `Control + Shift + P` on Windows. This opens up the command bar. In the command bar, type in "Settings" and select "Preferences: Open User Settings (JSON)". 

If you have nothing in there, create a new setting by typing in:

```
{
  "editor.defaultFormatter": "NomicFoundation.hardhat"
}
```

Use:

`"editor.defaultFormatter": "tintinweb.solidity-visual-auditor"` for Solidity Visual Developer

or

`"editor.defaultFormatter": "JuanBlanco.solidity"` for Solidity by Juan Blanco

### Other interesting extensions

In the previous lesson, we mentioned a file called `foundry.toml`. This also has an extension that formats it to make it easier to read. Please install [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml).

Another indispensable extension is [Inline Bookmarks](https://marketplace.visualstudio.com/items?itemName=tintinweb.vscode-inline-bookmarks).

The Inline Bookmarks plugin facilitates bookmarking the actual code. The extension can be used for document review, auditing, log analysis, and keeping track of development notes and to-do lists. You may share your notes and bookmarks with others with ease because they are saved with your files.

The following default trigger words/tags are configured by default:
```
@todo - (blue) General ToDo remark.
@note - (blue) General remark.
@remind - (blue) General remark.
@follow-up - (blue) General remark.
@audit - (red) General bookmark for potential issues.
@audit-info - (blue) General bookmark for information to be noted for later use.
@audit-ok - (green) Add a note that a specific line is not an issue even though it might look like.
@audit-issue - (purple) Reference a code location an issue was filed for.
```

You can fully customize the colors!

Remember these! They will be very handy in developing and especially in auditing projects.

More details are available [here](https://github.com/tintinweb/vscode-inline-bookmarks).

Next comes the fun part! Let's compile our contract using Foundry!

