---
title: Recon - Getting Context
---

_Follow along with this video:_

---

### First Step: Understanding The Codebase

Alright, we're ready to begin our recon, if you haven't already clone the repo our client has provided us.

```bash
git clone https://github.com/Cyfrin/3-passwordstore-audit.git
cd 3-passwordstore-audit
code .
```

If we're following `The Tincho` method, our first step is going to be reading the docs and familiarizing ourselves with the codebase. In VS Code, you can click on the `README.MD` file in your workspace and use the command `CTRL + SHIFT + V` to open the preview mode of this document.

> You can also open the preview pane by opening your command pallet and typing `markdown open preview`.

_Quick tip: Check if an extension must be installed for VS Code if it's not working for you._

![context2](/security-section-3/7-context/context2.png)

Already, we should be thinking about potential attack vectors with the information we've gleaned.

_Is there any way for an unauthorized user to access a stored password?_

Once you've finished reading through the documentation, we can proceed to...

### Scoping Out The Files

Following Tincho's advice our next step will be to organize the files of the protocol in scope and assess their respective complexity. (Spoiler, this first example is pretty simple).

1. Download and install the [**Solidity Metrics**](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-metrics) extension for VS Code.

![context3](/security-section-3/7-context/context3.png)

2. Once installed, you can right-click the appropriate folders to run the tool on and select `Solidity: Metrics` from the context menu.

> _Pro-tip: If your repo has more than one applicable folder, you can CTRL + Click to select multiple simultaneously._

![context4](/security-section-3/7-context/context4.png)

After generating the report, navigate to the command palette and locate 'export this metrics report'. Once exported, you'll have HTML access to the report for future reference.

![context5](/security-section-3/7-context/context5.png)

Applying Tincho's methodology to this process, we can:

1. Scroll down to the section containing the various files and their lengths.
2. Copy this info and paste it onto any platform that allows for easy viewing and comparison— like Google Sheets or Notion.

> Please note that if your codebase contains a solitary file like ours, this step won't be necessary.

Some aspects I'll draw your attention to in this metrics report are the `Inheritance Graph`, `The Call Graph`, and `The Contracts Summary`. It's not super obvious with such a simple protocol, but these are going to provide valuable insight down the line. Familiarize yourself with them now (way at the bottom).

![context6](/security-section-3/7-context/context6.png)

Understanding your codebase and its functionalities is the first step towards securing it.

### Wrap Up

Now that we've got a sense of what lies before us, with the help of our tools like CLOC and Solidity Metrics, we're ready to assess the code.

Let's see what we can find.
