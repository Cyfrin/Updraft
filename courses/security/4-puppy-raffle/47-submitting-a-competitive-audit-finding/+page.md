---
title: Submitting a Competitive Audit Finding
---

_Follow along with this video:_

---

### Submitting a Competitive Audit Finding

We've come a long way in this guide, and now it's time to learn how to submit your findings in a CodeHawks competitive audit. As you follow along with me, remember that your write-ups need to demonstrate your skills and abilities as a security researcher. The better quality they are, the more chances you stand to earn additional rewards.

> **Note:** In this lesson we walkthrough submitting a finding in a CodeHawks First Flight. First Flights are held every two weeks generally, so if one isn't currently accepting submissions, be sure to come back!

Navigate to an active CodeHawks First Flight and click the link `Submit a Finding`.

![submitting-competitive-finding1](/security-section-4/46-submitting-competitive-finding/submitting-competitive-finding1.png)

Some of this should seem very familiar. We can enter a title and choose an appropriate severity.

- The title of a competitive audit submission can omit the [S-#] categorization. This will ultimately be prepended by judges if the report is deemed valid.
- Remember: a good title is comprised of Root Cause + Impact!

For `Relevant GitHub Links`, we're meant to provide a link, not just to the code base/contract, but to the specific lines we've identified as problematic. Using our DoS Vulnerability from `PuppyRaffle.sol` as an example, we can link directly to the loop in our `enterRaffle` function by right-clicking the line in GitHub and choosing `copy permalink`.

![submitting-competitive-finding2](/security-section-4/46-submitting-competitive-finding/submitting-competitive-finding2.png)

Take some time to view the README of the First Flight you're looking at. You'll find important information for the contest available such as:

- Start/End dates and times
- Prize Distributions
- Audit Scope
- Compatibilities
- Roles

Now we reach the `Finding` section of the submission. You'll see a basic template provided to you. It's entirely acceptable to overwrite this template and paste the reports formatted as we've learnt so far into this field.

Once our write up looks good, we can even select `Preview` at the top to see what it looks like with formatting applied.

> **Note:** Proof of Concept/Code are nearly _mandatory_ to be considered a good submission.

Once you're satisfied with how things look, click `Submit Finding`. This should route you to `My Report` when you can see a summary of everything you've submitted for the audit so far. You can also make modifications to your submitted findings while the contest is open.

### The Selected Report

Something to always strive for is quality in the write ups you submit. In competitive audits submitting a finding that is a duplicate with other auditors is common. Platforms will reward an attention to submission quality by choosing a `selected report`. This reports represent the best quality write up for a given vulnerability and these reports receive _bonus payouts_.

![submitting-competitive-finding4](/security-section-4/46-submitting-competitive-finding/submitting-competitive-finding4.png)

### Wrap Up

Once a First Flight or Competitive Audit concludes, you'll be able to navigate to `My Findings` in CodeHawks and download your submissions in markdown. It's worthwhile to add these to your portfolio to show your skills and experience to the world!

That's all there is to submitting to a competitive audit! From there a judge will take over. Be sure to sign up to CodeHawks, I promise you that participating in competitive audits and First Flights will supercharge your abilities as a security researcher.

Let's start finally writing things up in the next lesson!
