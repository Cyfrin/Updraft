---
title: Naive Optimistic Loop With Certora
---

---

**Diving Deep into Code Verification with Certora: A Casual Guide to Formal Verification**

Hey there, code warriors and enthusiasts! If you’ve been tinkering with code verification tools like Certora, you'll find this post super handy. Today, I'm taking you through a fun experiment called "42 naive optimistic loop.mov" where we'll be dissecting and analyzing an intriguing coding scenario revolving around square root verification — and yes, things will get nerdy, so buckle up!

**Unveiling the Candid Tone and Expertise in Code Verification**

After eavesdropping on the dialogue, you'd probably go, "Oh Patrick, what's the big deal? We have Certora, problem solved." I love the optimism, and hey, I'm right there with you! Let's dive hands-on into making a new configuration file and spec — we’ll call them square root comf and square root spec, respectively. It's like embarking on a new adventure in the land of code.

The chat is definitely more on the casual side. It's like sipping coffee with a friend who's brainy about tech stuff. The vocab might throw off a newbie for a loop, but it is meant for those with some skin in the coding game — think hobnobbing with developers or math savants.

**Creating Our Code Base Configuration**

Grab your digital shovel as we dig into creating our configuration file. Keep it comfy because Mathmaster is still our reliable library and houses that internal function we need to scrutinize. Despite the need for a test harness, we won't sweat over it.

Let's get this show on the road by nurturing our config into a fully-fledged spec. The plan's simple: a bit of copy-pasting wizardry never hurt anybody. Question time — what's the method block? What functions will we bring to the party?

![](https://cdn.videotap.com/618/screenshots/Qkf7AXVnaLZO0K3bGOoo-49.95.png)

**Refining the Rules and Bringing the Magic to Life**

Now, we move from the role of a scholar to a rule-maker, transitioning a mere test into a rule that could govern the laws of digital mathematics. We're essentially saying, "Hey, Uni's square root better match up with Mathmaster's or else it's back to the drawing board!"

> "The power of a properly paired function can make the whole world of coding a waltz in the cloud park."

Now, let's set this puppy to run and see if our spells of code hold true. Will the formal verification have us dancing in digital delight, or will it be back to the grimoire?

**The Initial Outcome — A Dash of Skepticism Amidst Success**

After some nail-biting moments and arcane commands, the server connects — a sign our digital incantations are taking effect. A job ID pops up, and we rush to Certora to seek the fruits of our labor. The verdict is in — a pass, but not without nearly running out of time. Suspicious? Absolutely. There's a chance we just got lucky.

**To Loop Optimistically or Not? That Is the Code Question**

Amidst the initial victory, a potential flaw creeps into the limelight — the optimistic loop. In the mystical book of Certora docs, the 'optimistic loop' unrolls loops, fully embracing Yoda's "do or do not, there is no try" approach. For instance, if a loop is meant to triplicate the code thrice, it crafts three identical incantations and concludes with an assertive truth:

```plaintext
assert A > B
```

It turns our standard squabble over assertions into rigid requirements and dismisses any cases where the loop's unwinding might not hold true. But here's the catch — our beloved optimistic loop isn't the hero we thought it was.

**Realization Strikes — A Code of False Comfort**

Confession time: copying comp files is a rookie spell that can backfire. Sometimes the embedded parameters are more suited for a mage's duel than a peaceful coexistence. Our optimistic loop hoodwinked us, convincing us that all is well in the realm of code.

Upon further inspection and a heavy heart, we realize we weren't formally verifying anything at all! We essentially patted the loop's back and said, "Good enough, kiddo," without ensuring it truly was. Oh, the humanity!

Not wanting to admit defeat, we corrected our course, banished the offending 'optimistic loop' line, and reran the code. True formal verification is our quest, and we won’t rest till we conquer it.

**When ‘I’ll Wait’ Turns into ‘I’ll Wait Forever’ — The Timeout Conundrum**

Our amended ritual commences, and the incantation continues longer than anticipated. Low and behold, a timeout issue is cast upon us, similar to what we faced under the alias of Halmos.

A prophetic visit to the CLI grants us the knowledge of various spells (parameters, for the uninitiated) we could weave into our config file:

```plaintext
certora run help
```

There exists a whole tome in the Certora library titled, "Managing Timeouts," detailing the spells to counteract the patience-taxing timeouts. An array of parameters taunts us, but none provide the path away from the looming specter of the timeout.

**The Path Explosion Problem — The Final Nemesis**

Our enemy's identity is finally unraveled in the sacred texts of Certora. It carries a name — the Path Explosion Problem. A beastly issue that multiplies its deceptive paths with every node and edge in the magical control flow graph.

The grim truth dawns upon us. No amount of wishing upon falling servers or conjuring command line enchantments can possibly tame the wild nature of the Path Explosion Problem. The Uniswap square root function and the assembly square root function in `Mathmaster` are similar-looking beasts living in entirely different realms.

**A World of Unpredictable Loops and Infinite Possibilities**

In conclusion, embracing tools like Certora is no walk in the enchanted park. Our excursion into the world of code verification taught us valuable lessons:

- Casual as the journey may seem, it requires the wisdom of a sorcerer and the precision of a master archer.
- The optimistic loop is a tempting path filled with hidden perils and misleading triumphs.
- We learned that a casual, coffee-shop conversation can lead to profound insights into the workings of complex systems.
- And lastly, we ventured through the realm of time where the timeouts are relentless and the paths, infinite.

Let’s take this journey as a reminder that in the world of code verification, we must stay vigilant, ever-learning, and always prepared to venture into the unknown with spellbook in hand and a potent brew of patience simmering in our cup.

Until our next adventure... Keep coding, fellow mages.
