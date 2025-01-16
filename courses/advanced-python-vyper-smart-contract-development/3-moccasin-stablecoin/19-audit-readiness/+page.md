## Audit Readiness

We are going to prepare our codebase for an audit, or a competitive audit, or an external security review. We haven't really spoken too much about what these are, what they look like, and the like. So, we're going to go ahead and watch this quick video on what is an audit and what they're for and what to expect. Then, we'll come back and we'll see what we need to do to level up our code base here.

### What is a Smart Contract Audit?

A smart contract audit is a time-boxed, security-based code review on your smart contract system. An auditor's goal is to find as many vulnerabilities as possible and educate the protocol on best security and coding practices.

### Why are Audits Important?

Why is it critical that you get an audit before deploying your code to a live blockchain? Well, for starters, there are entire websites dedicated to how many hacks happen. Last year, we saw the most value ever stolen from smart contracts, with almost $4 billion dollars stolen. Due to the immutability of the blockchain, once a smart contract is deployed, you can't change it. So, you better get it right. A blockchain is a permissionless, adversarial environment, and your protocol needs to be prepared for malicious users. But even more so than that, an audit can improve your developers' team's understanding of code, improving their speed and effectiveness in implementing features moving forward. It can teach your team the latest tooling in the space. Often, just one smart contract audit isn't even enough. Protocols go on a security journey that includes many audits and many different services, like formal verification, competitive audits, and bug bounty programs. 

### What an Audit Looks Like

There are a lot of companies that offer smart contract auditing services, like Trail of Bits, Consensus Diligence, OpenZeppelin, Sigma Prime, Spearbit, MixBytes, WatchPug, Trust, and, of course, CyfrIn. Additionally, there's a lot of independent auditors that do great work as well. A typical audit looks like this:

1. **Price and Timeline**
    * First, a protocol needs to reach out. They can reach out before or after their code is finished. Ideally, they reach out sometime before their code is finished so the auditors can have time to slot them in.
    * Once they reach out, the protocol and auditors will discuss how long the audit will take based off of scope and code complexity. 

2. **Scope**
    * The scope of the audit is going to be the exact files and commit hash that's going to be audited.
    * How long the audit usually depends on how many lines of code slash complexity. 

3. **Duration**
    * You can see a very rough approximation of how long an audit takes on your screen now. 
    * Of course, this depends from firm-to-firm, audit-to-audit, and tool-to-tool. So, take these with a very large grain of salt.

4. **Timeline**
    * Additionally, it's the duration that sets the price. And same thing, at the time we're recording, prices range wildly depending on who's doing the audit, how many people are doing the audit, how complex the code is, and more.
    * These initial conversations are really just to get a ballpark estimate and slot you in to the auditor's schedule.

5. **Commit Hash, Down Payment, Start Date**
    * Once you have a commit hash, you can finalize the start date and final price. The commit hash is the unique ID of the code base you're working with, so the auditors can know exactly what code they're going to be looking at.
    * Some auditors will ask for a down payment in order to schedule you in.

6. **Audit Begins**
    * The audit begins. The auditors will use every tool in their arsenal to find as many vulnerabilities in your code as possible. We'll give you some tricks in a minute to make this a successful step.

7. **Initial Report**
    * After the time period ends, the auditors will give you an initial report, which will list their findings by severity. Usually, categorized into highs, mediums, lows, informational slash non-critical, and gas efficiencies. High, mediums, and low represent the severity of impact and likelihood of each vulnerability. 
    * Informational, gas, and non-critical are findings to improve the efficiency of your code, code structure, readability, and best practice improvements. These are not necessarily vulnerabilities but more ways to improve your code.

### The Next Steps

8. **Mitigation Begins**
    * The protocol's team will then have an agreed-upon time to fix the vulnerabilities found in the initial audit report. 
    * Sometimes, depending on the severity of the findings, you have to start from scratch. But, more times than not, you can just implement the recommendations the auditors give you.

9. **Final Report**
    * After the protocol makes these changes, the audit team will do a final audit report exclusively on the fixes made to address the issues brought up in the initial report.

10. **Post Audit**
    * Hopefully, the protocol and auditors have a great experience together. They can work together in the future to keep Web 3 secure.

### Making Your Audit Successful

Now, there are a few key things you can do to make sure your audit is successful. To get the most out of your audit, you should:

1. Have clear documentation
2. A robust test suite ideally including fuzz tests
3. Code should be commented and readable
4. Modern best practices followed
5. Communication channel between developers and auditors
6. Do an initial video walkthrough of code

    * The most important part of the process is during the audit. You want to think of you and your auditors working together as a team. One of the best ways to do this is to have a dedicated channel where auditors can ask questions to developers.
    * The developers will always have more context over the codebase than the auditors ever will, because they have spent more time working on it. 
    * The more documentation, context, and information you can give to the auditors, the better. This way, it can be easy for anyone to walk through the code and understand what it's supposed to do. 

In fact, 80% of all bugs are actually business logic implementation bugs. This means that these are bugs that have nothing to do with some weird coding error and are just somebody not knowing what the protocol should be doing. It's vitally important that the auditors understand what the code should be doing. Having a modern test suite and tooling can also make auditors spend less time fiddling with your tooling and more time finding issues.

###  Additional Information

1. **Post Audit**
    * We highly encourage you to take the recommendations your auditors give you seriously. Additionally, after an audit, if you make a change to your code base, that new code is now unaudited code. It doesn't matter how small the changes. We've seen a ton of protocols saying, "Oh, I'll just slip in one line of code." And sure enough, that's the line of code that gets exploited.  Depending on the seriousness of your protocol and how many users you want to use it, one audit might not even be enough. Working with multiple auditors and getting more eyes on your code will give you a better chance of finding more vulnerabilities.

2. **What an Audit Isn't**
    * An audit doesn't mean that your code is bug-free. An audit is a security journey between the protocol and the auditor, to find as many bugs as possible and teach the protocol different methodologies to stay more secure in the future. Security is a continuous process that is always evolving.  No matter how much experience someone has, people at all levels have missed vulnerabilities. On the unfortunate day that that happens, be sure that you and your auditor can jump on a call quickly to try to remedy the situation. Consider getting insurance for your protocol as well.

###  How to Prepare for an Audit

Let's jump back to our code. Let's go ahead and prepare this code for an audit.
We need to clean up our README. We need to set up a "How to run" section in our documentation.  
We need to go through our code. We probably need to add some more docstrings because right now, a lot of this is kind of woosy, right? We're not really sure what these functions are doing. We would need to update docstrings. Additionally, we need to write some docs in our README as to like what this protocol even does, right? Oftentimes, auditing and doing security on our protocol is going to be just making sure that the code matches what it's supposed to do. But if security researchers don't know what this code base is supposed to do, then there's nothing for them to check against. So, we want to write some docs saying, "Hey, here's what the codebase is supposed to do. Here's how the stablecoin works. Here's how the collateralization ratio works." et cetera. Then, we would want to create a scope for this as well. A scope of the project. So, we would say, "Hey, for this audit, we would want you to audit these two contracts: DecentralizedStableCoin.vy and DSCEngine.vy." We could optionally also add our library files from Snyk, but most of the time, those are going to be ignored. We go over security way, way more in depth in the Smart Contract Security section of CyfrIn Updraft. We go into security even more and Assembly and Formal Verification. These are both written with Solidity in mind. However, at this point in your career, pretty much all of the knowledge will transfer over. Pretty much all the examples in the Foundry and Solidity curriculum are the exact same examples you just did in Vyper and Python. So, to get deeper into security, you would want to head over here. But one other thing I always point out is the thing called "The Rekt Test." These are a list of 12 questions you want to ask yourself to make sure you're ready to deploy your smart contracts.  Now, there are some more advanced things in here, like "Do you have a team member with security defined in their role?" "Do you require hardware security keys for production systems?" which are things we haven't gone over, but these are some of the things that you really need to consider when you're actually going to deploy your contract. Security is absolutely crucial when it comes to these smart contracts because if you have a bug, there goes all your money, there goes all of your hard work, down the tube. So, this is a good thing to check out before deploying as well. And if you're a little bit confused still on what even is an audit, don't worry. Once you get to a point where you're ready to deploy a smart contract, that's when you're going to want to start thinking about one.  Or, if you decide you want to go down the security route, that's when you start thinking about them, too. And in my opinion, some of the best developers on Earth are also security-focused. So, I highly recommend you checking out CodeHawks, where there are competitive audits that you can participate in to actually get better at security yourself. So, a couple of things we wanted to do to get this a little bit better. We would add some docs how to write this, update our docstring, add docs about what this code base even does, include the scope of what our audit looks like. And, there's a couple other things as well. I highly recommend people who want to become either A: Better developers, or B: Get into security, definitely go check out CodeHawks, sign up, try to compete in some competitive audits because even just doing one or two, your skills and your understanding of how audits work and what they look like will skyrocket just by doing one or two. Additionally, CodeHawks has this thing called "First Flights", which are incredibly easy competitive audits. So, it's easy to get in, start doing some code reviews, and the like. 
