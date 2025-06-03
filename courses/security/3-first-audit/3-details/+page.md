---
title: Nailing the Audit Details
---

_Follow along with this video:_

---

### Getting Started

Alright! Starting off, our client has graciously updated the codebase for this security review, featuring an improved framework and enhanced verbosity in their [**Security Review CodeV2**](https://github.com/Cyfrin/3-passwordstore-audit).

Exploring the new codebase, we find it to be comprehensive with an `src` folder and a script detailing deployment procedures. However, as we dig in, we find that the README needs refinement and tailoring to our needs rather than the template Foundry README. There is also a glaring omission — there are no test folders.

In addition to this, we're not really sure what we should be focusing on in our review. It's unlikely the client wants us auditing libraries, or scripts - but these are vital things to confirm with them in the scoping phase before beginning the audit.

### Preparing for the Audit: Onboarding Questions

For your convenience, we've compiled a reference of [**Minimal Onboarding Questions**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/minimal-onboarding-questions.md). This document will help you extract the minimum information necessary for a successful audit or security review.

We've also included a more [**Extensive Onboarding Questions**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/extensive-onboarding-questions.md) document which is more derivative of what we at Cyfrin use for private audits - we'll go over this in more detail later.

Let's go through these questions and understand why each one is important in preparing for our security review.

1. **About the Project:** Knowledge about the project and its business logic is crucial. You need to be aware of what the project is intended to do so as to spot areas where code implementation does not align with the project's purpose. Remember 80% of vulnerabilities are a product of business logic implementation!
2. **Stats:** Information about the size of the codebase, how many lines of code are in scope, and its complexity are incredibly vital. This data will help to estimate the timeline and workload for the audit.
3. **Setup:** We need to ask the protocol how to build and test the project, which frameworks they've used etc.
4. **Review Scope:** Know the exact commit hash that the client plans to deploy and the specific elements of the codebase it covers. You do not want to spend time auditing code that the client has already modified or doesn't plan to use. The protocol should include the appropriate GitHub URL and explicitly detail which contracts are in scope.
5. **Compatibilities:** Information about the solidity version the client is using, the chains they plan on working with, and the tokens they will be integrating is important, we'll go into why later.
6. **Roles:** This entails understanding the different roles and powers within the system and detailing what the different actors should and shouldn't be able to do.
7. **Known Issues:** Understanding existing vulnerabilities and bugs which are already being considered/fixed. This will allow you to focus on the hidden issues.

Asking the questions of your client is an integral part of assuring they're ready for an audit. Should a protocol give push back, this is a red flag that they aren't taking security as seriously as they should.

As security researchers you're, in a way, educators. It's your job to educate protocols on the importance of these security considerations and adequate documentation.

Once our client has provided answers to the above and provided an updated codebase ([**Security Review CodeV3**](https://github.com/Cyfrin/3-passwordstore-audit/tree/onboarded)) they've also filled out the [**questionnaire**](https://github.com/Cyfrin/3-passwordstore-audit/blob/onboarded/minimal-onboarding-filled.md) we provided them.we're finally ready to..

### Dig into the Updated Codebase

Your client should have provided you a commit hash. By navigating to the GitHub Repo's commit history, you can used the first `7 characters` of the commit hash to find the exact version of the repo to focus on. We'll be going over cloning this locally later in the course.

![details2](/security-section-3/3-details/details2.png)

Let's go through the client's submitted details.

### About

We see the client has provided us more information about the protocol and its goals/intents.

```md
A smart contract application for storing a password. Users should be able to store a password and then retrieve it later. Others should not be able to access the password.
```

### Setup

We're also now given clear instructions on how to set up the project locally, with information on how to test the repo and frameworks being used.

---

**Requirements**

- [**Git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run git --version and you see a response like git version x.x.x
- [**Foundry**](https://getfoundry.sh/)
  - You'll know you did it right if you can run forge --version and you see a response like forge 0.2.0 (816e00b 2023-03-16T00:05:26.396218Z)

**Quick Start**

```md
git clone https://github.com/Cyfrin/3-passwordstore-audit
cd 3-passwordstore-audit
forge build
```

**Usage**

**Start a local node**

```md
make anvil
```

**Deploy**

```md
make deploy
```

**Testing**

```md
forge test
```

**Test Coverage**

```md
forge coverage
```

**and for coverage based testing:**

```md
forge coverage --report debug
```

---

### Scope

For this particular example, the client has provided scope:

```
./src/
└── PasswordStore.sol
```

In this case, a single contract - depending on the maturity of the protocol, you may want to request to include their deployment process, or to provide feedback on their tests - but this is largely a private audit consideration. In competitive audits, the outlined scope is the only code that will be valid.

### Compatibilities

Reading further into the client's documentation, we see they've provided compatibilities. Vulnerabilities and exploits may vary from chain to chain, or token to token, so these details are always valuable for us.

```md
Solc Version: 0.8.18
Chain(s) to deploy contract to: Ethereum
```

### Roles

We now also have clearly defined roles! This gives us clear insight into whom is expected to have what powers.

```md
Owner: The user who can set the password and read the password.
Outsides: No one else should be able to set or read the password.
```

### Known Issues

Our client reports that there are **No** known issues with their codebase. I love the confidence.

### Local Setup

Go ahead and follow the `quick start` guide our client as provided.

```md
git clone https://github.com/Cyfrin/3-passwordstore-audit
cd 3-passwordstore-audit
code .
```

This will open a new VS Code window in your cloned directory. Now we want to `checkout` the exact commit hash in our audit scope by running:

```bash
git checkout <commithash>
```

This will switch you to a `detached HEAD` state of the branch we want. Basically this is a state where changes won't be saved, so let's create a branch we want to work on officially:

```bash
git switch -c passwordstore-audit
```

We can confirm the branch we're on now by running:

```bash
git branch
```

### Wrap Up

This may have seemed like a lot, but I promise this becomes second nature as you repeatedly do this. Remember to ask the protocol the questions necessary to assure they are prepared for their audit and step into the role of a security educator to teach them best practices around security and code documentation.

Now we're finally ready to begin looking at the code base and getting our hands dirty!
