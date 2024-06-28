---
title: Testnet Demo
---

_**Follow along with this video.**_



---

# Upgradable Smart Contracts: Unveiling The Mystery

Hello, dear blog readers! I can barely contain my excitement as I eagerly wrap up the discussion on upgradable smart contracts that we just zoomed through. As a quick note, I encourage you all to engage in discussions, ask questions—ask away in the comments section, on Twitter or share your thoughts with your buddies. As you learn about the process, there is always something new to discover, question, and understand. So let the curiosity kitty out of the bag!

## Upgrades or no upgrades?

I must stress this, while we just learned about upgrades, I'd strongly discourage you from sticking to this default setting in the world of protocols with upgradable smart contracts as it can create a centralization problem. Why, you ask? If you have an upgradable smart contract, that implies a group can modify the logic of that code at any point or be compelled to alter the logic. Having said that, knowing about delegate call—an incredibly potent primitive—is essential.

With this, we're almost ready to proceed to the next steps.

## Let's Get Practical

These steps aren't to stress you further ─ quite the contrary. Let's push this up to GitHub, add this to your portfolio and reward yourself with a well-earned break. Pat yourself on the back, because you've accomplished some pretty amazing work.


Now, let’s deploy this phenomenal work to a testnet. I am going to go ahead and borrow a make file and then tweak it. To simplify our process, let's delete all the unnecessary stuff from the file and focus on the section of 'Deploy'.

<img src="/upgrades/8-testnet-demo/testnet1.png" style="width: 100%; height: auto;">

With just these few steps, we have our two contracts ready to roll! Next, moving to Sepolia etherscan, I realized that neither of them verified correctly. It’s not an issue though, we can always attend to it and manually verify it later.

To proceed, I checked ‘My broadcast’ section in etherscan to identify which contract is which. Fun fact: ‘My broadcast’ is a great tool that details all your contract deployments and transactions.

### Box v1 and Upgrade Process

The first contract created was named box v1. Now, it's a one-time exercise to copy this and paste it to verify manually later. Though it didn't quite verify initially, fret not, as I knew this was my box v1 with the correct address.

The next contract doesn't have a name, but it's clearly the proxy address. So we're left with two entities: a proxy and a box, with the former being substantially more important. Reason being, the proxy dynamically points to the box's implementation.

At this point, to prompt our upgrade, we execute the `make upgrade` command. Subsequently, a minor bug was detected with the script. I discovered that I needed to update my run latest to ERC 1967 proxy. No sweat, a quick manual addition and bye-bye bug.

On hitting the refresh button, with the bug sorted and having successfully identified the ERC 1967 proxy, our upgrade script could now run to upgrade box v1 to box v2.

<img src="/upgrades/8-testnet-demo/testnet2.png" style="width: 100%; height: auto;">

### The Final Showdown: Box v2

With box v2 being created and verified successfully, we now revisit our proxy to refresh and double-check. Sure enough, an upgrade was called on this contract. Henceforth, whenever we call functions on this, it points to box v2. It is important to keep in mind that we're calling the proxy and not the box v2 address.

By executing some handy commands to set the number to 77, the proxy was updated. We called upon box v2 and successfully saw a return of 77 in decimal representation.

Et voilà! It worked like a charm, we had successfully deployed and worked with a proxy.

## You've Made It!

That was intense and amazing! Designing, deploying and upgrading contracts is no joke and you've done a fantastic job. Post your accomplishments on Twitter; you may need a well-deserved ice cream break before we move on to our next topics.

We're cruising towards the end—Foundry governance and an introduction to security are the last few topics that are separating you from achieving greatness in smart contract development.

Stay tuned, stay smart, and keep yourself ready for absorbing more incredible contract knowledge! I'll see you in the next phase of this fantastic journey!

