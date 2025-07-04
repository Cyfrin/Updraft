---
title: Phase 1 - Scoping
---

_Follow along with this video:_

---

### Puppy Raffle Scoping

Now that you've **definitely** tried reviewing the codebase on your own, let's start scoping things out together.

Take a look at the [**Puppy Raffle Repo**](https://github.com/Cyfrin/4-puppy-raffle-audit)'s README

![phase-1-scoping1](/security-section-4/3-phase-1-scoping/phase-1-scoping1.png)


### README Overview

This README looks pretty good. We've got all the expected sections and necessary details.

Remember the things we're looking for:

- **About**
- **Setup**
- **Scope**
- **Compatibilities**
- **Roles**
- **Known Issues**

We should see clear instructions under [**Getting Started**](https://github.com/Cyfrin/4-puppy-raffle-audit#getting-started) on how to get set up locally.

```bash
git clone https://github.com/Cyfrin/4-puppy-raffle-audit.git
cd 4-puppy-raffle-audit.git
make
```

> Take a brief look at your `Makefile`. It's worthwhile to appreciate what it's actually doing. Our `Makefile` cleans our repo, installs necessary packages (Foundry, OpenZeppelin and base64) and then runs `forge build` to compile everything.

### Testing

Once we've run our `make` command, we should check out the protocol tests. I like to start by running `forge coverage` to see what kind of baseline we're starting with.

![phase-1-scoping2](/security-section-4/3-phase-1-scoping/phase-1-scoping2.png)

Thing's don't look great.

From a competitive audit point of view, this might be exciting, there are lots of opportunities for bugs to be hiding in this codebase.

If we were doing a private audit, we're less optimistic. Poor test coverage is indicative of an immature codebase and we're responsible for securing this protocol!

### README Continued

Further down the README we see the scope details. Invaluable information.

By using the command `git checkout <commitHash>` we can assure our local repo is the correct version to be auditing.

We also see exactly which contracts are under review.

    ./src/
    └── PuppyRaffle.sol

Moving on, we should take notice of the **Compatibilities** section.

![phase-1-scoping3](/security-section-4/3-phase-1-scoping/phase-1-scoping3.png)

That Solc version is strange - definitely make note of it.

Finally, they've also outlined the Roles of the protocol for us. Knowing this intended functionality is important in being able to spot when things go wrong.

- Owner - Deployer of the protocol, has the power to change the wallet address to which fees are sent through the changeFeeAddress function.
- Player - Participant of the raffle, has the power to enter the raffle with the enterRaffle function and refund value through refund function.

There are no _known_ issues. Hehe.

### Wrap Up

Things are looking great so far, the protocol has provided us with lots of documentation to get started with. We've even spotted an oddity already.

In the next lesson we'll begin using our tools to spot vulnerabilities before we even start.
