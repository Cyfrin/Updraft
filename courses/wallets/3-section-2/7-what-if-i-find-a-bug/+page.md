---
title: What if I find A bug in the wild?
---

---

### Tone and Introduction

Let’s ease into this. The transcript we're working from is laid-back but authoritative. It's clear we're talking to insiders – security folks, developers, and tech enthusiasts who know their way around a bit of code. The language isn't complex; it’s straightforward and strikingly frank. It’s a casual conversation, but when it comes to the gravity of the content, there's no skirting around the seriousness.

### Don't Press That Button: The Imperative of Ethical Conduct

You've discovered a bug. The excitement is palpable. The temptation? Immense. You consider, just for a split second, exploiting it. **Pause right there. Don't do it.**

Why not, you ask? Here’s the hard truth: even with the best intentions, attempting to exploit a bug can backfire in a myriad of ways. You could unintentionally leave breadcrumbs for malicious actors, making it child’s play for them to take your incomplete exploit and use it against the system. In the worst case, your well-meaning attempt at heroism could result in accidental harm and complicated legal fallout. That would be a nightmare, right?

### Responsible Disclosure: A Cheat Sheet for the Ethical Hacker

Now that we’ve established the _what not to do_, let's focus on the positive steps to take. Your first move should be a thorough read of the responsible vulnerability disclosure cheat sheet. You can find this gem on the OWASP.org website, a treasure trove for anyone in security. The methodology laid out there aligns with what we're about to get into, placing the emphasis on discretion and collaboration.

### Contacting the Right People

When you've verified the vulnerability, it's time to step up and make your move — the right way. Here's a rundown:

1. **Get in Touch with the Team:** Reach out to those responsible for the code – use their bug bounty program, if they have one, as your channel of communication.
2. **Ensure Secure Communication:** Before sharing any details, ensure your communication channel is secure, think end-to-end encryption, like Signal.
3. **Disclose Responsibly:** Provide a detailed audit write-up, just as we've learned previously. Collaborate with the team until the bug is verified.
4. **Devise a Fix Strategy:** Once verified, plan your fix. This could get complicated depending on the code’s nature, governance structures, and the potential financial stakes.

![](https://cdn.videotap.com/618/screenshots/NP9yBaC5P88tlexEBS6L-184.8.png)

### Anticipating and Addressing the What-Ifs

It’s not all smooth sailing; several 'what if' questions need addressing. Let's break down some challenging scenarios you might face:

1. **The Unresponsive or Non-existent Team:** Should the code lack a responsible party, or if they choose to ignore your findings, there are ethical ways to sound the alarm without wreaking havoc.
2. **A Non-paying Team:** If a bounty is not forthcoming for your efforts, it's a moral grey area. Calling them out publicly isn't great form, but quietly stepping back deprives the field of your expertise, and that's a loss for everyone.
3. **Intercepting Exploits:** Engaging with a live exploit in the wild is dangerous territory. Legal questions abound, but the priority is safeguarding the assets in jeopardy – a nuanced decision that demands careful reflection.

#### The Ethical Imperative of Patience and Persistence

It's tough when your breakthrough feels undervalued or neglected, but patience and persistence are vital. If you find yourself holding onto assets you've safeguarded in an exploit gone awry, the ethical and legal road is clear: return it. The negotiation of a bounty post-factum treads dangerously close to extortion — and no white hat ever wants to be on that side of the ethics line.

### The Takeaway

Here's your key takeaway from all this: when you discover a bug in production code, stay calm, don't exploit it, and contact the team immediately. Collaborate with them to relax the bug's hold on the code. If all goes well, the recognition and rewards should follow.

### For Those Hard-to-Reach Scenarios

In the tricky landscape of web 3.0, with its immutable codes and sometimes absent custodians, things won't always follow the plan. What if the team dismisses the bug? What if they don't reward you for your hard-earned find? Here, the waters get murky. Give them a window to respond, but if they remain unresponsive, public disclosure might be the only card left to play — executed with utmost care for the protocol's users.

### Conclusion: The Burden of Responsibility

We've scrutinized several 'what ifs' and established some protocols when handling a vulnerability. If you've stayed with me thus far, you're not just technically adept - you're also keenly aware of the ethical responsibility that rests on your shoulders. Navigating this landscape is about more than just technical know-how; it's about character. It's about making the digital world safer for everyone.

And should the day come when your discovery goes unnoticed or underappreciated, remember: it's not about the reward. It's about guarding the integrity of systems that countless users rely on. After all, web 3.0 is about building a more secure, decentralized future — one responsibly handled bug at a time.

### Looking Ahead

As the digital frontier expands, your role as a guardian of this evolving cyber terrain becomes more crucial. It's a role that demands constant learning, ethical fortitude, and, above all, a commitment to the collective good. So wear your white hat with pride — the realm of code is safer with you in it.

Now, how about you go and watch that optional interview with Michael Lewin from OpenZeppelin? It's packed with real-world scenarios that will not only add to your knowledge of this complex subject but might also enlighten you on handling those 'what if' dilemmas.
