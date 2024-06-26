---
title: Foundry setup
---

_Follow along with this video:_

---

### Foundry setup

There are various methods for Foundry installation. You can find all of them on [this link](https://book.getfoundry.sh/getting-started/installation)

Open up your VS Code terminal. Make sure that you are using WSL if your setup is Windows-based. Run the following command:

```
curl -L https://foundry.paradigm.xyz | bash
```

This installs `Foundryup`, the Foundry toolchain installer.

Running `foundryup` will install the latest precompiled binaries: `forge`, `cast`, `anvil`, and `chisel`.

If you already have Foundry on your system, running `foundryup` will update it to the latest version. I highly recommend running this before starting each development/security project.

To test that you have successfully installed Foundry type:

```
forge --version
```

### Can't use `foundryup`?

Don't panic if this command doesn't run. You might have an issue with your path, and you might need to add Foundry to your path. In case you run into this issue, check the [GitHub repo](https://github.com/Cyfrin/foundry-full-course-f23/issues) associated with this course for people who had the same issue and find out how they solved it.

Try typing `forge --version` into your terminal. Have you received an unwelcome output saying `Forge command not found`? This implies that you have to rerun the source command that Foundry offered during installation (something to the extent of `source /Users/yourUserNameHere/.bashrc`).

**Note**: Most of the time the `bashrc` file gets loaded automatically. However, if this doesn't apply to your setup, the following lines can add the required command to the end of your Bash profile. This will ensure that your `bashrc` file loads by default.

```
cd ~echo 'source /home/user/.bashrc' >> ~/.bash_profile
```

Installing all the prerequisites is one of the hardest parts of this course, don't get discouraged, ask people in the Cyfrin discord channel in the Updraft section, also, don't hesitate to ask your favorite AI companion, they are usually great at those types of problems.

