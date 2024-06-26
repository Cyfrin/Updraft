---
title: Section recap

_Follow along with this video:_

---

### The recap

You are a superhero! Applying the knowledge you acquired in this section will set you apart from 80% of the existing Solidity developers!

We deployed a provably fair on-chain raffle! Should you ever play a non-provably fair lottery? Only if you want to lose 100% of the time. 

Let's quickly go through everything we learned in this section:

1. We created a raffle contract;
2. We defined a bunch of errors, one of which takes parameters;
3. We learned about enums;
4. Defined suuuuuper cool events and state variables;
5. We also provided view functions for these state variables;
6. We designed a chain-agnostic fully customizable constructor;
7. We created the raffle logic;
8. Then, we use Chainlink Automation services to trigger the draw;
9. We designed the `checkUpkeep` and `performUpkeep` functions to be triggered only when some decent conditions are met;
10. The winner selection logic uses Chainlink VRF to make things truly random;
11. We learned about Checks, Events, Interactions (CEI) pattern;
12. We deployed our contracts using an amazing suite of scripts including a `HelperConfig` that helps you keep track of all the chain-dependent parameters;
13. We create subscriptions, fund them and add our raffle as a Chainlink VRF Consumer;
14. We wrote a metric ton of tests;
15. We implemented a mock LINK token;
16. We learned how to skip a test depending on the chain it runs;
17. We used a plethora of Foundry cheatcodes that helped us test reverting scenarios, emitted events and many more;
18. We deployed everything on Sepolia;
19. We entered the raffle and we won the raffle;


This was a lot, but it was super necessary. You should be proud of yourself! Take a nice break, do a training session, brag about finishing this section on Twitter and don't forget to post everything to GitHub.

See you in the next Section!