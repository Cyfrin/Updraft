## Installing WSL

This lesson covers how to install WSL (Windows Subsystem for Linux). WSL is a really important tool that helps us run Linux environments and utilities on our Windows machine. This will allow us to run any Linux tools and applications that we might need for our blockchain development.

### What is WSL?

Microsoft has significantly improved their support for developers in recent years, but when it comes to smart contract development, WSL is the better choice. It is the Windows Subsystem for Linux, and it is a game changer! WSL allows us to run a Linux distribution on our Windows machine. 

### Introduction

Let's get started with the installation process! The first thing that we need to do is install WSL, which we can do through the Windows terminal. If we are using Windows 11, we can just hit the Windows key and type **terminal** and hit enter. 

### Installing WSL

This will open the Windows Terminal for us which defaults to Powershell. However, if we are using Windows 10, we will need to install the Windows Terminal from the Microsoft Store.

To install WSL, open the Windows Terminal and run the following command:

```bash
wsl --install
```

This will trigger some admin level operations, as we are about to see on the screen now. We just need to select **yes**, hit **enter** and once the installation process is finished, this will require us to restart our computer.

Once we reboot our computer, this is going to automatically trigger this window to continue the installation.

The first thing we need to do here is to select our UNIX username. I am going to select **"cromewar"** and hit **enter**. Then we will be required to set up a new password.

Something interesting about most Linux operating systems/distros is that when we are using the terminal, if we type anything over here, the password is going to remain hidden. That doesn't mean that we are not typing anything, but the terminal is not going to show anything over here, unless we use another Windows distro, for example, Linux Mint. Otherwise, most of the Linux operating systems are going to keep this always hidden.

I am going to type my password though, and then hit **enter**. As we can see here, the terminal recognizes that password and asks me to type it again for confirmation.

Once we finish this, that's it. We have WSL installed on our machine. As we can see here, the installation finished properly, and we can continue. I am going to actually close this for now. 
