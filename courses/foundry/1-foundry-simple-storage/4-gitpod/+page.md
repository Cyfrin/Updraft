---
title: GitPod Setup
---

_Follow along the course with this video._



---

In the vast, ever-evolving world of coding, more and more tools are being developed to facilitate programmers. One such tool is Gitpod, a cloud development environment that enables you to run your code on a remote server. In this blog post, we will guide you through the processes of setting up your development environment using Gitpod, highlighting its pros, cons and tips for smoother running.

## Something About Gitpod

Gitpod is similar to Remix IDE and allows you to run Visual Studio code either in the browser or connected to another server. The key benefit of using Gitpod is bypassing the setup process. It spares you the need to conduct installations on any device, as you get to execute all your desired tools on the remote server.

Nevertheless, dependent on its status, Gitpod may also limit when you can code. It’s also worth noting that Gitpod is not completely free, which may be discouraging particularly for emerging developers.

Furthermore, for the safety of your cryptocurrency, avoid running any code with a private key containing real money on Gitpod. The reason for this caution is that the remote servers may potentially access your private keys. As long as you don't use a MetaMask or any private key linked to actual funds during this interactive Gitpod setup, everything should work just fine.

## Embarking on Gitpod

To begin, you will observe an "Open in Gitpod" button in all our code repos, starting from lesson five "Simple Storage on Ethersjs".

<img src="/foundry/4-gitpod/gitpod1.png" style="width: 100%; height: auto;">

After clicking the button, a "Welcome to Gitpod" sign appears and you should click on "Continue with GitHub". If Gitpod is linked to your GitHub account, it will automatically create a workspace for you, which mimics Visual Studio code.

<img src="/foundry/4-gitpod/gitpod2.png" style="width: 100%; height: auto;">

To run your Gitpod from your local Visual Studio code :

1. Spot if “Gitpod” is indicated.
2. Tap the prompted pop-up, "do you want to open this workspace in Vs code desktop?"
3. Install Gitpod extension on your Visual Studio code when prompted.
4. Click "Reload Window" then "Open".
5. The workspace then initiates a connection.

Alternatively, you can manually run it by clicking "Open in Vs code" in the bottom left corner of Gitpod.

<img src="/foundry/4-gitpod/gitpod3.png" style="width: 100%; height: auto;">

## Navigating the Workspace

If you opt for this type of development, remember that you are coding on a remote server, not locally. Hence, never save sensitive data, such as your private keys in this workspace.

The workspace resembles your typical local setting. You can create new folders and workstations, and run all commands, just like when using Visual Studio.

To establish a new terminal, simply click on the little bar at the top left part of the screen, go to "Terminal" then hit "new Terminal". As an alternative, you can use the Control tilde shortcut, similar to macOS and Linux keyboard shortcuts.

These commands basically create a directory called "New Folder" then change the current directory into "NewFolder". To verify that you're in the right place, the command "code ." can be used. It transports you to the new folder.

## Conclusion

While Gitpod is not without its shortcomings, its ability to provide a ready-to-code environment that requires no installation, accessible from anywhere and on any device, makes it stand out. It's a fantastic option if you can't get the installation working.

Keeping Gitpod’s conditions and a few precautions in mind, you're now ready for remote coding. Happy programming!

<img src="/foundry/4-gitpod/gitpod4.png" style="width: 100%; height: auto;">

<!-- <img src="/foundry/2-install/install1.png" style="width: 100%; height: auto;"> -->
