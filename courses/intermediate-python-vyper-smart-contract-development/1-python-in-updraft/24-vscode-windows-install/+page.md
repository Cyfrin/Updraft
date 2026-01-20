## Windows Users Only: Installing VS Code

We can install VS Code in a few different ways. 

The easiest is to use the **Windows Terminal**, using a package manager pre-installed on Windows 11 called **winget**. If we want to install VS Code using winget, we type the following command:

```bash
winget search vscode
```

Then we copy the package name and use it in the following command:

```bash
winget install Microsoft.VisualStudioCode
```

This will start the installation process. Once complete, we can access it from our Windows Menu.

Another way is to use a web browser. We can go to the official website, **code.visualstudio.com**. We click on the "Download for Windows" button to trigger the download and install.

If you want to ensure no data tracking from Microsoft, we can use a community-driven version of Visual Studio Code called **VsCodium**. It's basically the same code editor but without the Microsoft telemetry, gallery, logo, etc. The license is also changed to the MIT license. The installation process is similar to the previous method: We go to the VsCodium website, which is **vscodium.com**. We click on the "Install" button and download the latest release for Windows. 

We can now use VS Code in three different ways. The one we use for the tutorial, and for the rest of the course, is going to be the official Microsoft Visual Studio Code. 
