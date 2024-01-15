---
title: Manual Review Aderyn
---

_Follow along with the video:_



---

# Introducing the New Version of Aderyn, an Essential Audit Tool

Hello, code enthusiasts! Today, I'm going to do a quick run through a unique code auditing tool: Aderyn. Since I've started filming, we've been doing incredible stuff with the script, and there's a lot to share with you! The tool has recently undergone some upgrades, and in this post, we'll be checking out what we can do with the updated version of Aderyn. Let's dive in!

## Installing Aderyn and First Run

As the first step, I went on to update Aderyn using `cargo install Adarin`. This installs the new version for us. With this modification, you can perform a quick audit just by executing the command `aderyn a` - simple but powerful. Still, an old method, `Aderyn`, works just fine if you're comfortable with it.

## The Audit Report: Understanding the Issues

On opening the `report.md`, you'll notice a list of issues. Most of these are NC (Non-Crit) issues. These aren't crucial, but addressing them can improve your code's performance and readability.

#### Unused Internals

My Aderyn installation flagged some functions that are not used internally. So, marking them as `external` would be ideal, like the TSWAP pool line 307 issue. The piece of code here isn't used internally, marking it public is a waste of gas.

```bash
@audit info, this should be external
```

#### The Literals vs Constants Debate

Aderyn pointed out another common issue - the use of literals instead of constants on TSWAP pool line 303. Essentially, magic numbers should not be just literals - they should be defined as constants.

```bash
@audit info magic numbers. These should not be defined as constants.
```

### The Index Field Dilemma

We also stumbled onto an 'event missing index fields' on TSWAP pool line 62. Now, this is a tricky one. While many people prefer having events indexed, I belong to the group that believes in fewer indexed fields. Therefore:

```bash
@audit info. Three. Events should be indexed if there are more than three params.
```

Remember, this is more subjective and up to your coding preferences.

But we've done quite well so far with the audit, discovering issues and remedying them with Aderyn.

## Wrap Up: The Power of Automated Code Auditing

The beauty of having an automated script like Aderyn lies in its ability to uncover even the minutest issues which could otherwise be overlooked. Even though some of us might prefer manual code reviews, tools like Aderyn offer a great starting point for clean, optimized code.

This hands-on auditing process can be a fun, engaging way to discover new improvements, ensuring your code performs better and is more maintainable.

> Remember, quality isn't an act, it's a habit.

On those wise words from Aristotle, let's wrap up and get back to more code improvements in our next post. Happy coding until then!
