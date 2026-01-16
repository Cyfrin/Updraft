---
title: WSL setup
---

_Follow along with the video_

---

### Introduction

Hallo 👋🏻, I'm Vasily and I'll be your instructor for all Windows development. You'll see me frequently as I guide you through installing, running, and configuring various Windows tools.

### WSL setup

Microsoft has significantly improved its development environment support in recent years. However, for _smart contract development_, installing dependencies can sometimes be tricky. To streamline this process, we will use the **Windows Subsystem for Linux (WSL)**: this is a better option because it enables a full-fledged _unix-like console_ on your Windows machine, simplifying the use of tools and utilities commonly found in unix-based environments. This setup ensures compatibility with all the code that runs on unix-based systems like macOS and Linux.

To install WSL, you can begin by opening the Windows terminal. On Windows 11, press the Windows key, type "terminal," and hit `enter`. On Windows 10, you need to install the Windows terminal from the Microsoft Store (select the official app from Microsoft Corporation).

Once installed, open the terminal and type `wsl --install`. This command will initiate the installation process. Afterward, restart your computer. Upon reboot, the terminal will appear again, prompting you to select a Unix username and set a password. WSL will be then successfully installed ✅.

### Visual Studio Code

After installing WSL, we need to install a code editor. We will use Visual Studio Code (VS Code), and there are three different methods to install it:

1. **Using the Terminal**: Utilize `winget`, a package manager pre-installed on Windows 11. Open the terminal and type `winget search VS Code` to find the desired package. Then, execute `winget install Microsoft.VisualStudioCode` to install VS Code.

2. **Via Web Browser**: Search for "Visual Studio Code" in your web browser, select the official Microsoft link and download the installer. Follow the prompts, accept the user agreement and customize all the installation options.

3. **Using VSCodium**: For those who prefer more independence and privacy, there is an open-source alternative called **VSCodium**. It is similar to VS Code but without Microsoft's telemetry. Download the [VSCodium installer](https://github.com/VSCodium/vscodium/releases) from GitHub and follow its similar installation steps.

Choose the method that best suits your needs. For this course, I will use the official Visual Studio Code from Microsoft.
