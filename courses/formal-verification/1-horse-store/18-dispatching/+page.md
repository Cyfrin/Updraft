---
title: Dispatching
---

---

## Making Sense Of Solidity Function Selectors: A Deep Dive Into Expert Coding

Hey there! Today we're continuing our journey in the nitty-gritty world of coding smart contracts. But, before we march ahead, let’s set the stage—imagine you've got the function selector in hand, like a compass pointing us toward treasure on our Solidity map. Eager to find the X that marks the spot? Hold tight, because we're diving deep into how to make our smart contract march to the beat we drum.

### The Function Selector: Your Smart Contract's Compass

In the realm of Solidity, invoking a function like `updateHorseNumbers` almost feels like magic—call out its name and it jumps into action. Ah, but we're the backstage crew today, not the audience marveling at the magician's sleights. When tinkering with bytecode directly, we're the ones crafting the spells and directing each movement.

Here's the game plan: grab hold of that function selector and coax it into a dance, comparing it to our list of the function moves we know. It’s our own secret code—a couple of party tricks named `updateHorseNumber` and `readNumberOfHorses`. We're about to teach our code some fancy footwork:

Feels like programming a robot to bust out the moonwalk or the floss, doesn't it?

### Routing The Call: Directing The Traffic

Giving our code the right directions is crucial, and here's where the comparison kicks in. You see, it's like setting up traffic signs in our code city. If our function selector car arrives at the `updateHorseNumber` junction, we want it to take a sharp left towards `UpdateVille`. Conversely, if it rolls up to the `readNumberOfHorses` stop, it's a gentle cruise towards `ReadTown`.

We compare, and based on what we find, we jump—no hesitation, no second-guessing. It's a 'choose your own adventure' where the choices are laid out in bytecode:

_“And there we have it—the crossroads of our programming journey, where a single comparison dictates the path of execution.”_

### Crafting The Inner Workings Of Our Smart Contract

So, where does this all lead us? Down the rabbit hole of Solidity’s inner mechanics, that's where! If you've ever wondered how your high-level code translates into the low-level symphony that the Ethereum Virtual Machine (EVM) conducts, this function selector tango is part of that enigma.

Let's explore what happens under the hood when we call `updateHorseNumber` or `readNumberOfHorses`.

#### Update Horse Number: Choreographing the Numbers Dance

We know the steps; we just need to chart them out in bytecode. Combining conditionals, storage interactions, and the necessary Solidity semantics to paint this part of our masterpiece.

Some key things that would happen in the `updateHorseNumber` function:

- Load the current state variable storing the horse count from storage
- Increment or decrement it based on parameters
- Write the new value back to storage
- Return any necessary data back to the caller

All done through low-level EVM opcode commands hidden behind that simple `updateHorseNumber` call in Solidity.

#### Read Number Of Horses: Easing Into The Groove

On the flip side, when we yearn for knowledge—how many horses do we have, to be precise—we smooth-talk our selector into gliding over to the `readNumberOfHorses` routine.

In this function, we'll be accessing the state variables, employing the EVM's reading capabilities, and sashaying back the data to our call site with grace.

The key steps here:

- Load the horse count variable from storage
- Return it to the caller

A simple choreography, but no less important!

### Bridging The Gap Between Bytecode And Behavior

It's time to morph these conceptual lines into concrete actions. Each piece of code, each comparison, each directive—we weave them together to direct our smart contract's every move.

And while the high-level Solidity language often conceals these intricacies, rolling up our sleeves and delving into bytecode unveils a universe of control and precision beneath.

So go ahead, take these breadcrumbs of insights, and begin scripting your grand performance. Whether updating your fleet of horse numbers or tallying up your equestrian assets, may your coding be as fleet and efficient as the steeds themselves.

Remember, we're teaching our contract to interpret and react—a choreography of functionality that calls for meticulous direction. Whether your code grooves or gallops, ensure it follows your baton without missing a beat for that flawless performance on the blockchain stage.

Till our next exploration—keep those digits dancing on the keyboard, and may your logic flow as elegantly as a perfectly penned sonnet in the world of smart contracts.
