---
title: Scoping CLOC
---

_Follow along with this video:_

---

You may have noticed that we skipped over the `Stats` section of the protocol's README. This section of the documentation is comprised of a line count and complexity rating typically and you should be prepared to calculate these details for your client and use them to estimate the duration of your audit. In this lesson we're going to go over how that's done.

One of the components of the `Stats` section is `nSLOC` or `number of source lines of code`. A very simple tool exists to help us derive this count.

[**CLOC**](https://github.com/AlDanial/cloc) - cloc counts blank lines, comment lines, and physical lines of source code in many programming languages. It's compatible with Solidity, Python, Rust and many more.

### Installing and Using CLOC

First step is installation. The step by step won't be covered here, but pick the method you're most comfortable with.

```md
npm install -g cloc # https://www.npmjs.com/package/cloc
sudo apt install cloc # Debian, Ubuntu
sudo yum install cloc # Red Hat, Fedora
sudo dnf install cloc # Fedora 22 or later
sudo pacman -S cloc # Arch
sudo emerge -av dev-util/cloc # Gentoo https://packages.gentoo.org/packages/dev-util/cloc
sudo apk add cloc # Alpine Linux
doas pkg_add cloc # OpenBSD
sudo pkg install cloc # FreeBSD
sudo port install cloc # macOS with MacPorts
brew install cloc # macOS with Homebrew
choco install cloc # Windows with Chocolatey
scoop install cloc # Windows with Scoop
```

Once successfully installed, verify your installation.

```bash
cloc --help
```

Once installed, you can run using the command `cloc <directory>`. Our PasswordStore example should look like this:

```bash
cloc ./src/
```

This is what the output might look like:

![cloc1](/security-section-3/4-cloc/cloc1.png)

### The Importance of Knowing Your Codebase Size

Why is knowing the number of source lines of code (also referred to as nSLOC) crucial? The answer lies in the process of auditing and security research.

As you perform more audits and delve further into security research, you'll start to gauge the pace at which you can audit a code base. Understanding that pace enables you to estimate more accurately the time required for future coding or auditing tasks based on the size of the code base.

This is incredibly useful, as with time, you can use your past audit experience and tell the protocol you're working with how long it will take to audit their codebase. Notably, this pace tends to speed up as you do more security reviews. Nevertheless, it's a good starting point.

> _"When auditing 1000 lines of code for the first time, you now have an estimated timeline for subsequent audits or security reviews of 1000 lines codebases."_

Often, competitive audits might have a quicker timeline depending on the auditing platform. Upon having a good grasp of your auditing speed, it may assist in selecting competitive audits that align with your capabilities, or even ones that push you to accelerate your pace.

### Wrap Up

`Stats` like a protocol's `nSLOC` (number of source lines of code) are very valuable to security reviewers. They afford you the ability to gauge how long an audit will take based on your current skill set and provide more accurate estimates for both the protocol and yourself with respect to timelines and workload.
