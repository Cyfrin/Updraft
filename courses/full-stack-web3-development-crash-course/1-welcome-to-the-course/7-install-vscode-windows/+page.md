## Installing Visual Studio Code on Windows for WSL Development

Welcome to this guide on installing Visual Studio Code (VS Code) on your Windows machine. This lesson is specifically designed for Windows users who plan to use VS Code in conjunction with the Windows Subsystem for Linux (WSL), particularly the Ubuntu distribution. We'll cover several installation methods, allowing you to choose the one that best suits your preferences. Our development workflow will primarily occur within VS Code, connected to your WSL environment.

## Accessing Your Ubuntu Terminal in WSL

Before installing VS Code, it's crucial to understand how to access the correct terminal environment where you'll be running commands. This tutorial assumes you have already set up WSL with Ubuntu. There are two primary ways to open your Ubuntu shell:

**Method 1: Direct Ubuntu App**

1.  Click the Windows Start button or press the Windows key.
2.  Type `Ubuntu`.
3.  Click on the "Ubuntu on Windows" application that appears in the search results.
4.  This will open a terminal window directly into your Ubuntu environment. You should see a prompt similar to `username@hostname:~$`.

**Method 2: Windows Terminal**

1.  Click the Windows Start button or press the Windows key.
2.  Type `Terminal`.
3.  Click on the "Terminal" application.
4.  **Important:** By default, Windows Terminal often opens a PowerShell tab (indicated by a prompt like `PS C:\Users\YourUsername>`). **We will not be using PowerShell for our development work in this course.**
5.  To open an Ubuntu tab within Windows Terminal, click the small downward-pointing arrow next to the `+` (new tab) icon in the tab bar.
6.  Select "Ubuntu" from the dropdown menu. A new tab will open with the correct Ubuntu shell prompt.

**Performance Note:** WSL essentially runs a Linux operating system alongside Windows. The very first time you launch an Ubuntu terminal (using either method) after booting up your computer, it might take a few moments to start. Subsequent launches during the same session should be much faster.

While you can run commands directly in these terminal windows, our primary approach will be to work *inside* VS Code, which seamlessly integrates with your WSL Ubuntu environment.

## VS Code Installation Options for Windows

Now, let's explore three different ways to install VS Code on your Windows system.

### Method 1: Using `winget` (Windows Package Manager)

The Windows Package Manager (`winget`) is a command-line tool built into Windows 11 (and installable on Windows 10) that allows you to discover and install applications directly from the terminal. This is often considered the "programmer's way."

1.  **Open Windows Terminal:** Launch the Windows Terminal application (as described above). You can use either a PowerShell or Command Prompt tab for `winget` commands, as it's a Windows utility.
2.  **Search for VS Code:** To find the official VS Code package, run the following command:
    ```bash
    winget search vscode
    ```
    Look through the output for the package named `Microsoft.VisualStudioCode`. Note its exact `Id`.
3.  **Install VS Code:** Use the `Id` you found to install VS Code:
    ```bash
    winget install Microsoft.VisualStudioCode
    ```
    `winget` will download the necessary installer and run it automatically. You might briefly see a standard Windows installation window appear and disappear.
4.  **Verify:** Once the command completes, VS Code should be installed and available in your Windows Start Menu.

For more information on `winget`, especially if you're on Windows 10 and need to install it, refer to the official documentation: `learn.microsoft.com/en-us/windows/package-manager/winget/`

### Method 2: Official Website Installer (Recommended GUI Method)

This is the most common method, involving downloading an installer file directly from the official VS Code website.

1.  **Navigate to the Website:** Open your web browser and go to `code.visualstudio.com`.
2.  **Download:** Click the prominent blue button labeled "Download for Windows" (Stable Build is recommended). Save the `.exe` installer file (e.g., `VSCodeUserSetup-x64-[version].exe`) to your computer.
3.  **Run the Installer:** Locate the downloaded `.exe` file and double-click it to launch the setup wizard.
4.  **Follow the Setup Wizard:**
    *   **License Agreement:** Read and accept the license terms.
    *   **Destination Location:** The default installation path is usually suitable. Click Next.
    *   **Start Menu Folder:** Accept the default name for the Start Menu shortcut. Click Next.
    *   **Additional Tasks:** This screen contains important options for usability:
        *   `Create a desktop icon`: Check this if you want a desktop shortcut (optional).
        *   `Add 'Open with Code' action to Windows Explorer file context menu`: **Recommended.** Allows you to right-click a file in Explorer and open it directly in VS Code.
        *   `Add 'Open with Code' action to Windows Explorer directory context menu`: **Recommended.** Allows you to right-click a folder in Explorer and open the entire project in VS Code.
        *   `Register Code as an editor for supported file types`: Optional. Check this if you want VS Code to become the default application for opening certain code file types.
        *   `Add to PATH (requires shell restart)`: **Crucial - Ensure this is checked.** This allows you to launch VS Code from any terminal (including your Ubuntu shell) by simply typing the `code` command.
    *   **Ready to Install:** Review your selected options and click "Install".
    *   **Complete:** Once the installation finishes, click "Finish". You can choose to launch VS Code immediately.

### Method 3: VSCodium (Telemetry-Free Open Source Build)

VSCodium is a community-driven project that provides builds of VS Code directly from the source code, but *without* Microsoft's branding, telemetry (data collection), and tracking. It uses the standard MIT open-source license. If you prefer to avoid Microsoft's data collection or want a purely open-source build, VSCodium is an excellent alternative.

1.  **Navigate to the Website:** Open your web browser and go to `vscodium.com`.
2.  **Find Installer:** Look for the "Install" section or a link to download the latest release, which often directs you to the project's GitHub releases page.
3.  **Download:** On the GitHub releases page, scroll down to the "Assets" section for the latest release. Find and download the Windows User Setup `.exe` file (e.g., `VSCodiumUserSetup-x64-[version].exe`).
4.  **Run the Installer:** Locate the downloaded `.exe` file and double-click it.
5.  **Security Warning:** Windows Defender SmartScreen might show a warning because the publisher isn't recognized by Microsoft. If this happens, click "More info" and then choose "Run anyway".
6.  **Follow the Setup Wizard:** The installation steps (License, Destination Path, Start Menu, Additional Tasks) are virtually identical to the official VS Code installer. Ensure you configure the "Additional Tasks" (especially "Add to PATH" and the "Open with Code" context menus) as recommended for VS Code above.
7.  **Complete:** Finish the installation. VSCodium will be installed and ready to use, offering nearly the same functionality as VS Code but without the Microsoft-specific additions.

## Final Steps and Clarification

While all the methods above are valid, downloading the official installer from the `code.visualstudio.com` website (Method 2) is a straightforward and highly recommended approach.

**Important Distinction:** Please note that we are installing **Visual Studio Code**, a lightweight yet powerful source code editor. This is different from **Visual Studio**, which is Microsoft's larger, more comprehensive Integrated Development Environment (IDE). This course specifically uses **Visual Studio Code**.

After successfully running the installer (using your preferred method, ensuring the PATH and context menu options are enabled), you should be able to launch VS Code. Upon opening it for the first time, you'll typically be greeted by the Welcome screen, confirming that the installation was successful. You are now ready to configure VS Code for WSL development in the next steps.
