## Installing Python on a Mac

If you're on a Linux or a Windows machine, you can skip this lesson!

To install Python on a macOS system, we'll go to the python.org website and download Python.

On the python.org website, under Downloads, go to macOS and then scroll down to the latest Python 3.11 release.

Click the link for the **Python 3.11.x macOS 64-bit universal2 installer**. The installation file will download to your Downloads folder.

We'll then open the installer file, and then agree to the license agreement.

We'll click **Continue**, and then **Install**. Python will install automatically.

Once the installation is complete, a pop-up message will appear confirming that the installation was successful. We'll then close the installer.

We'll open our VS Code terminal, either by clicking **Terminal > New Terminal** or by pressing **Control, Shift, Tilde**.

In the VS Code terminal, we can confirm that the correct Python version is installed with: 
```bash
python3.11 --version
```

We can also try:
```bash
python --version
```

Although, as of the recording, I don't have the `python` keyword.

If you have multiple versions of Python installed, you can use this command to ensure that you're working with the correct version.

We're going to switch to using tools called UV and Moccasin, which will make it easier to work with different versions of Python.

