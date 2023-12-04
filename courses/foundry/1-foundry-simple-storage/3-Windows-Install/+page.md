---
title: Windows Install (WSL)
---

_Follow along the course with this video._



---

We'll be taking a special look at a handy tool known as WSL (Windows Subsystem for Linux). Assisting us in this tutorial is the amazing Basili, a guru in Windows setup who has been tremendously helpful in some of my past training courses.

This tutorial will be beneficial for anyone using Windows 10 or later versions. We'll begin by installing our code editor - in this specific case, Visual Studio Code.

## Getting Started with Visual Studio Code Installation

To install Visual Studio Code (VS Code for short) on your machine, begin by opening up your web browser and typing `VS Code` in the search box. Follow these steps:

- Select the VS Code version suited for Windows
- Choose your desired installation location
- Save the file
- After download, proceed with the installation - the same as with any other program installation process

You'll notice that to install VS Code, you must accept the agreement and then proceed to add the code to your system path, create a desktop icon, and click 'Next' to install. The process won't take much time. After this, you can customize the theme, create shortcuts, and sync VS Code with your other devices.

If you wish to get a more in-depth understanding of VS Code, I recommend you pause this tutorial right here and explore these options one by one.

Although we could proceed to install the rest of our development tools in a Windows environment, you'll find the following section of this tutorial very important. While Microsoft has made significant efforts to further support developers in recent years, the best option to consider still remains WSL, especially when it comes to smart contract development.

## Transitioning to a Better Developer Environment with WSL

The Windows Subsystem for Linux (WSL) proves to be a considerable game-changer in this scenario. As a developer, you'll often find yourself working with tools and utilities primarily found in Unix-based environments. Windows has made significant strides in supporting developers; however, when setting up the right development environment and running certain command-line tools, some challenges persist.

To ensure that your code runs on various machines using Unix-based systems like Mac and Linux, you'll find WSL to be immensely beneficial. How exactly does WSL help? By setting up a Linux distribution using WSL, you gain access to a Unix-like console right on your Windows machine.

Don't worry, you don't need to have master-level tech skills to set this up – all it takes is a few easy steps, which we'll cover next in our tutorial.

## Installing WSL and Setting Up a Linux Distribution

Let's start by installing WSL. Head over to the Windows Terminal, a pre-installed application on Windows 11 and easily accessible on Windows 10 via the Microsoft Store. All you have to do is type `WSL --install` and hit Enter. This will trigger the installation process requiring you to reboot your operating system.

```
# Open the Windows Terminal
$ Windows Terminal
# Key in the command to install WSL
$ wsl --install
```

After your system reboots, the Terminal will open automatically and proceed with the installation. During the setup, you'll need to input a new Unix username - choose one unique to you - and secure it with a password of your choice. And voila, you have an operational Linux terminal on your Windows machine!

## Making Visual Studio Code Compatible with WSL

Now that we have our Linux terminal set up through WSL, we'll need to ensure its compatibility with VS Code.

Open up VS Code and navigate to the Extensions tab. Here, look for the Remote Development extensions and proceed to install each of them. This will enable VS Code to operate with WSL seamlessly.

Once this is done, you'll find that a new icon has appeared - 'Open a Remote Window')) which allows you to connect directly to WSL. However, there's an even simpler way to connect– through our Linux terminal!

Create a new folder in the terminal (for example, a folder named `solidity course`), navigate to this folder, then type `code .` and hit Enter. This command will automatically install the latest server for WSL on VS Code and open a new VS Code instance connected with WSL.

At this point, you should now see the WSL Ubuntu banner at the bottom of your VS Code window. You have two options to choose from when considering your development needs – either use the Windows Terminal or the integrated terminal that comes with VS Code.

**Please Note:** When you conduct your projects from a folder inside Windows, like `Development` inside your documents, it's crucial to know that the WSL console will only access local files inside the WSL instance. Therefore, it's recommended to keep files inside the WSL instance for faster communication and convenience.

## Preparing for Git Installation

The final part of our setup involves installing Git. While we won't directly use Git in this course, it is an essential tool for future use. To check if Git is pre-installed, simply run the command `git version`. If Git is not installed yet, you will have to install it independently.

Remember, for those opting to continue with PowerShell or Windows instead of transitioning to WSL, you will need to download and install Git for Windows from the official Git page.

Congratulations if you've managed to set up your developer environment as explained in this elaborate tutorial! With these tools at your disposal, you can develop smart contracts using Windows while experiencing the ease and flexibility Mac and Linux developers are accustomed to. Always ensure that your VS Code is connected to WSL Ubuntu, and feel free to use either a Windows or WSL environment, depending on your preference. Happy coding!
