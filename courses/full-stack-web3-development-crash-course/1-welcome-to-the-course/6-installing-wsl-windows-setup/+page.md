## How to Install WSL (Windows Subsystem for Linux)

Setting up a development environment directly on Windows can sometimes be tricky, especially when dealing with dependencies and tools commonly used in areas like smart contract development. To create a more consistent and manageable environment, we recommend using the Windows Subsystem for Linux (WSL). This lesson will guide you through installing WSL on your Windows machine.

Please note: This guide focuses solely on the WSL installation process. Future lessons will cover installing specific development tools *within* the WSL environment. For a deeper dive into WSL, including its inner workings and basic commands tailored for smart contract developers, check out the dedicated free crash course linked in the accompanying resources.

### What is WSL and Why Use It?

Microsoft has significantly improved the developer experience on Windows with features like enhanced library support, PowerShell advancements, and the Winget package manager. However, many development workflows, particularly in fields like blockchain and smart contract development, heavily rely on tools, utilities, and command-line interfaces native to Unix-based operating systems like Linux or macOS.

WSL, the Windows Subsystem for Linux, addresses this by allowing you to install and run a genuine Linux distribution (like Ubuntu) directly on your Windows machine. It provides a full-fledged, Unix-like command-line experience seamlessly integrated with Windows, without needing a traditional virtual machine or dual-boot setup.

Using WSL offers several advantages:

1.  **Access to Linux Tooling:** Gain native access to the vast ecosystem of Linux command-line tools essential for many development tasks.
2.  **Environment Consistency:** Develop in an environment closer to typical deployment servers (which often run Linux), reducing compatibility issues.
3.  **Simplified Workflow:** Manage your development tools within a dedicated Linux environment while still using Windows as your primary operating system.

Installing WSL is straightforward and doesn't require deep technical expertise.

### Installing WSL: Step-by-Step Guide

Follow these steps to install WSL:

**1. Open Windows Terminal as Administrator:**

WSL installation requires administrator privileges.

*   **Windows 11:** Windows Terminal usually comes pre-installed. Press the `Windows` key, type `terminal`, right-click on "Windows Terminal" in the search results, and select "Run as administrator".
*   **Windows 10:** If you don't have Windows Terminal, install it first.
    *   Open the **Microsoft Store**.
    *   Search for "Windows Terminal".
    *   Select the app published by **Microsoft Corporation** and install it.
    *   Once installed, press the `Windows` key, type `terminal`, right-click on "Windows Terminal", and select "Run as administrator".

You will likely see a User Account Control (UAC) prompt asking for permission to allow Windows Terminal to make changes. Click "Yes". The terminal will typically open with a PowerShell prompt (e.g., `PS C:\WINDOWS\system32>`).

**2. Run the WSL Installation Command:**

In the administrator Windows Terminal window, type the following command and press `Enter`:

```powershell
wsl --install
```

This command initiates the download and installation of the necessary WSL components and, by default, the latest stable version of the Ubuntu Linux distribution.

**3. Approve UAC Prompt (if it appears again):**

During the installation initiated by the command, another UAC prompt might appear specifically for the "Windows Subsystem for Linux" installer. If it does, click "Yes" to allow it to make changes.

**4. Reboot Your Computer:**

Once the command finishes the initial phase of installation in the terminal, Windows will require a reboot to complete the setup. Close your applications and restart your computer when prompted or when the initial command execution completes.

**5. Complete Linux Distribution Setup (Post-Reboot):**

After your computer restarts, a terminal window (often titled with the name of the installed Linux distribution, e.g., "Ubuntu") should open automatically to continue the setup. If it doesn't open automatically, search for "Ubuntu" (or the specific distribution installed) in the Start menu and run it.

This window will guide you through setting up your user account *within* the Linux environment:

*   **Create UNIX Username:** You will be prompted: `Enter new UNIX username:`. Type a username you want to use for your Linux environment (it doesn't need to match your Windows username) and press `Enter`.
*   **Set UNIX Password:**
    *   You will be prompted: `New password:`. Type a secure password for your new Linux user.
    *   **Important:** As you type the password, you will **not** see any characters, dots, or asterisks appear on the screen. This is a standard security feature in Linux terminals. The system *is* registering your input. Press `Enter` when you've finished typing the password.
    *   You will be prompted: `Retype new password:`. Enter the exact same password again for confirmation and press `Enter`.

**6. Installation Complete:**

If the passwords match, you'll see messages confirming the password update and successful installation (e.g., `passwd: password updated successfully`, `Installation successful!`). You will then be dropped into the Linux command prompt, indicated by something like `your_unix_username@your_computer_name:~$`.

### Conclusion

Congratulations! You have successfully installed WSL and a default Linux distribution (usually Ubuntu) on your Windows machine. Your Linux environment is now set up with your user account and is ready for you to install development tools and start working. You can close the Linux terminal window for now.