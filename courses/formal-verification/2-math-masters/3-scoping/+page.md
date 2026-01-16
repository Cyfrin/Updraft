---
title: Scoping
---

---

---

Welcome back, are you ready to actually get stated for this section? Let's start with Scoping and setting this project out. 

## Cloning and Setting Up

Start by cloning the Math Master audit into your local environment. 

With the repository cloned, opening it in VS Code is your next step. The initial task is to get acquainted with the codebase's purpose by reading the readme, an essential document that sheds light on the codebase's inspiration and the teams involved, including acknowledgments to the karma, runtime verification, and Certora teams for their contributions to formal verification (FV) efforts.

This project was inspired by notable projects like Solady, Obront.eth, and Solmate.  

The prerequisites you need to be able to run this project are:

* [git](https://git-scm.com/)
* [foundry](https://book.getfoundry.sh/)
* [halmos](https://github.com/a16z/halmos)

Don't worry about halmos we are going to install it during the section.

## Navigating the Setup and Initial Tests

Following the quickstart guide and examining the Foundry configuration, you proceed to the makefile to manage dependencies and prepare for testing. Running `make` installs the dependencies, though it might not initiate the tests automatically. Utilizing `forge test` confirms the successful passing of tests, while `forge coverage` reveals areas for improvement.

## Getting Deeper into the Codebase

With basic setup and testing out of the way, the focus shifts to truly understanding what the codebase aims to achieve. Despite a lack of extensive documentation in the readme, examining the source code reveals its purpose as an arithmetic library for fixed-point numbers, with the primary goal being to offer a gas-optimized, fixed-point math library. The library emphasizes operations critical for financial calculations, such as multiplication with rounding and square root calculations, heavily relying on assembly for efficiency.

## Analyzing Functions and Testing Strategy

The library contains key functions like `mulWad`, `mulWadUp`, and a square root calculation, each implemented with a focus on gas optimization and precision. The testing strategy includes unit tests and fuzz tests, aiming to validate the library's accuracy and efficiency against known implementations like Uniswap's and Solmate's square root functions. 

## Running Additional Analysis Tools

Utilizing Slither, provides further insights into potential issues or inefficiencies within the code. Despite identifying common flags such as the use of assembly, the audit recognizes these as integral to the library's design for efficiency. 

Before we jump on to check line by line this code base, let's see a history lesson on MUL, WAD and RAD.
