---
title: Scoping CLOC
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/evYm83lAPpI?si=IGeEdwxMmSjfgGe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In this lesson, we'll be going over a crucial step in scoping a contract: getting the stats of the protocol. As a part of this process, we'll be using a widely recognized tool known as CLOC, or Count Lines of Code.

The beauty of CLOC is about its compatibility; it works with pretty much any codebase you work with, be it Solidity, Python, Rust, and so on. It does exactly what it says –counts your lines of code, allowing you to quickly analyze the size and complexity of your projects.

## Installing and Using CLOC

To use CLOC, the first step is downloading and installing. This can be done from a few different places; a popular method is to simply install via a package manager like NPM, Apt Brew for Mac users, among others. The entire installation process won't be covered here, but it is straightforward enough that anyone proficient in working with such tools should have no trouble.

Once successfully installed, run CLOC using your terminal. You can verify your installation by running CLOC help. This should give you an output showing a list of useful commands.

To get started, simply run CLOC with the directory or files you want to count the lines of code on. Upon hitting enter, you'll see a concise and detailed output. It will give you a few key stats: the number of files, the number of blank lines, the number of comment lines, and most importantly, the number of actual lines of code.

```bash
cloc /directory_name
```

This is what the output might look like:

```shell
Number of files: 1
Number of blank lines: 5
Number of comment lines: 12
Number of code lines: 20
```

## The Importance of Knowing Your Codebase Size

Why is knowing the number of source lines of code (also referred to as Nsloc) crucial? The answer lies in the process of auditing and security research.

As you perform more audits and delve further into security research, you'll start to gauge the pace at which you can audit a code base. Understanding that pace enables you to estimate more accurately the time required for future coding or auditing tasks based on the size of the code base.

This is incredibly useful, as with time, you can use your past audit experience and tell the protocol you're working with how long it will take to audit their codebase. Notably, this pace tends to speed up as you do more security reviews. Nevertheless, it's a good starting point.

> _"When auditing 1000 lines of code for the first time, you now have an estimated timeline for subsequent audits or security reviews of 1000 lines codebases."_

Often, competitive audits might have a quicker timeline depending on the auditing platform. Upon having a good grasp of your auditing speed, it may assist in selecting competitive audits that align with your capabilities, or even ones that push you to accelerate your pace.

In conclusion, stats like the complexity score and Nsloc are crucial for proper auditing. They not only help you estimate the time taken for an audit but also potentially push you to improve your skills in the process. They are, quite literally, a measure of your codebase—and your abilities.
