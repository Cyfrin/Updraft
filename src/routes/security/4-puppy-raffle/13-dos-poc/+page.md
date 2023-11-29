---
title: DoS - PoC (Proof of Code)
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/Tv7RrCcIZo0" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Uncovering a Denial of Service Vulnerability in a Puppy Raffle Smart Contract

In our journey exploring the fascinating world of decentralized applications and smart contracts, we stumbled upon a potential vulnerability in a puppy raffle smart contract. What's exciting today is that we suspect this vulnerability could be a denial of service warning - a significant cybersecurity threat.

Before we dive into the fascinating journey of how we exposed this issue, don't forget how important auditing is in the world of blockchain technology and smart contracts. Only thorough auditing can assure that a contract is bug-free and secure.

## The Suspicion

Let's head back to our `PuppyRaffle.sol` contract. On observing it, we started suspecting a potential 'Denial of Service (DOS)' issue. We wanted to confirm it though and prove its potential effect. Time to put on our programmer hats and delve into some code.

## Writing the Proof of Code

How do we confirm our suspicion? That's right, by writing a 'proof of code'. But first, we need a testing suite. Let's try using Forge Test:

```bash
forge test
```

Thankfully, the test suite works perfectly, meaning we can use it for our audit. We opened up the `puppyRaffle.t.sol` to see what's in there.

Here's a challenge for you, reader, to try writing the proof of code before scrolling further down. Go ahead and pause here, take some time and challenge yourself.

## Time to Prove It!

Alright, now that we have the test suite we can start building our DOS test. For those who carried out the challenge - well-done! For those who haven't, let's carry on together.

The path we'll take is to repurpose the `test_can_enter_raffle` function for our audit. Something like this:

```javascript
test_denial_of_service(){...}
```

We start by commenting out the earlier content to serve as a reference. Let's look into the proof in detail.

### Creating Fake Players

Firstly, we enter 100 players into the raffle using addresses that we generate in a loop, like this:

```javascript
uint256 players_num = 100;
address[] memory players = new address[](players_num);
for(uint256 i = 0; i<players_num; i++) {
    players[i] = address(i);
    }
```

This approach lets us generate 100 unique addresses, because the contract forbids duplicates.

### The Final Test

Lastly, we insert a test condition to compare the gas used for the first and second sets of players. If our suspicion is correct, the gas used for the second set should be substantially higher than the first.

```javascript
assert(gas_used_1st < gas_used_2nd);
```

Running this code reveals, surprise surprise, a substantially higher gas cost for the second batch of players!

## Validating our Suspicion

On running our finalised test, we found that indeed it cost significantly more gas for the second batch of players to enter the raffle. It confirms our suspicion about a denial of service issue. Someone could potentially spam the contract with entries and make it prohibitively expensive for other participants to join the raffle.

This situation is problematic because as more people enter the lottery, participants need more financial resources to participate, giving an enormous advantage to early entrants.

Typically, normal users wouldn't think about such issues, which is why we need thorough auditing – to ensure fair play, security, and performance efficiency. Congratulations! You've gained a new insight into smart contracts, their auditing, and potential vulnerabilities. Keep digging to foster safer and efficient blockchain technologies.

> Remember, the code we write today could be at the core of tomorrow's financial world.

Stay tuned for more behind-the-scenes looks into other smart contracts and their potential mischievousness. Happy coding!
