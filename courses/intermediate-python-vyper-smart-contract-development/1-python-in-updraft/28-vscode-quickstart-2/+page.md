## VS Code Quickstart

We are ready to get started with VS Code for this course! Let's open up VS Code. If you are on a Mac or Linux, you should see a shortcut to open a "remote window" in the bottom left of the screen. If you are on a Windows machine, it will likely display WSL or Ubuntu or some combination of the two. 

Let's open up a terminal using the command `Command ~` on Mac and `Control ~` on Windows or Linux. 

In our terminal, we can type the command 
```bash
echo $SHELL
```

This will tell us the shell that we are using. It could be `zsh`, `bash`, or many other types of shells that all work the same way. The shell that we are using doesn't matter because the commands that we will be running work on any shell that you are working with. 

We'll often want to clear the terminal of old commands. We can do that by typing the command `clear`, and then hitting enter. 

We can also clear the terminal by using the keyboard shortcut `Command K` on Mac, or `Control K` on Windows or Linux.

The trashcan icon on the terminal will delete the current terminal entirely.

Let's open a new terminal and type a few lines. The X icon in the terminal is to hide the terminal. We can always pull the terminal back up. 

There is a keyboard shortcut for toggling the terminal, which is `Command `  `~` on Mac or `Control` `~` on Windows or Linux. This will hide and show the terminal window.

We can also toggle the terminal by going to `View` and selecting `Terminal`.

To delete a terminal window, we can click on the trashcan icon. 

Now, we'll create a new folder to store all of the files and folders that we will need for this curriculum. To create a new folder, we'll type the command:
```bash
mkdir mox-cu 
```
This command stands for `make directory`, and we'll use `mox-cu` as our folder name. We can call it anything we want.

Now, we'll go into the folder that we just created by using the command: 
```bash
cd mox-cu
```

The command `cd` stands for `change directory`.

If we use the command `pwd`, which stands for `present working directory`, it will tell us the current location. 

To open the folder that we created, we can type the command `open .` on Mac. The dot (.) in this command refers to the current directory.

There is a similar command on Windows to open a folder. For Windows users, we can type the command:
```bash
explorer .
```
This will open the folder in Windows Explorer.

For Linux, we can type the command:
```bash
xdg-open .
```
This will open the current directory in the Linux file explorer.

If you are a Linux user, you may not have this command installed by default. You may need to install this command. To install this, you can type:
```bash
sudo apt-get install xdg-utils
```

Now, we are going to install an AI extension. 

You can go to the extensions section. You'll find a search box where you can search for extensions. 

The AI that we will be using is GitHub Copilot. Feel free to search for other AI extensions, but GitHub Copilot is the one we will be using. 

After you install it, you'll see a little GitHub Copilot icon in the bottom right corner of your screen. This is a little reminder that you have installed it correctly. 

You might also want to install GitHub Copilot Chat. This will open a chat box for GitHub Copilot. 

Once you have installed it, you will see a little GitHub Copilot icon. You can right-click on the icon and select the chat option. This will open a chat box similar to ChatGPT or Cloud.

We will be working in our `mox-cu` folder, which is the folder that we just created, and can see at the top of our VS Code screen. 

We can also view our file explorer. We'll be able to see all of our files here.

You can toggle back to your terminal using the `Control ~` shortcut. 

We'll be working with files in this folder. We can create files by right-clicking and selecting `new file`. 

Let's create a file named `hi.txt`. 

You can see that `hi.txt` is listed in the left sidebar.

Now, let's go to our terminal and type the command `ls`, which stands for `list`. This will list all of the files in our folder. 

We can see that our `hi.txt` file is in our folder.

If we want to create a new file in VS Code, we can do so by right-clicking and selecting `new file`. Let's create a file named `hi2.txt`. 

We can see that both `hi.txt` and `hi2.txt` are listed. 

To edit a file, we can simply click on it. We can make changes and save the file. 

Let's delete this file. You can do this by right-clicking the file and selecting `delete`. You can also delete the file by using the trash can icon.

You can also see a little dot next to the file name. This dot means the file is unsaved. To save, click `file`, `save`, and the dot will go away.

That's a quick introduction to VS Code. 

Let's go ahead and try out GitHub Copilot. It's a little doodad that appears at the bottom of our screen, and helps us code.

For example, we'll type `SPDX license identifier`, and GitHub Copilot will provide a suggestion. To accept the suggestion, we can hit `tab`. 

You can also click on the little GitHub Copilot icon. You can go to GitHub Copilot Chat to use GitHub Copilot in a chat-like format. 

In this lesson, we have learned the basics of navigating VS Code, creating files, editing files, and using GitHub Copilot. 
