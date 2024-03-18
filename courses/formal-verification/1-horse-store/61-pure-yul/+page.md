---
title: Pure Yul
---

---

## The Optional Adventure in Yul

Let's get one thing straight: coding in Yul is optional, 100%. If I had my way, you'd be mastering Huff, where the abstract meets the concrete. Huff keeps it simple and straightforward, giving you that raw feel of coding without peeling you away from assembly's essential vibe. But when dealing with Yul, sometimes it feels like you're wrestling the Ethereum Virtual Machine itself. Probably not the kind of daily grind you're looking for, but it's exciting nonetheless.

### Yul vs. Huff: The Choice Is Yours

I want you to take from this learning experience as much or as little as you want. We won't be building "crazy assembly things," as they say, but we will push boundaries as far as Yul will let us. Sure, inline assembly gets most of the spotlight in Yul-land, but standalone Yul deserves some love too, despite Foundry not being its biggest fan. Therefore, it's time to break new ground and make our very own Yul file. Ready to dive into the complete rewrite of our Horse Store? Game on!

### Crafting the Horse Store Contract in Yul: Step by Step

Crafting a contract in Yul starts differently than you might be used to. Forget the familiar 'contract' keyword for a minute; Yul calls this structure an 'object'. So, we embark on this journey with `object "HorseStoreYul" { ... }`, setting the stage for our Yul-scripted Horse Store.

Right inside our object, we nest our contract deployment within a class known as `code`. Note: to make our Yul script pretty (and readable), I recommend using the Solidity plus Yul VS Code extension for those sweet syntax highlights. Trust me, it’s a game-changer for readability.

#### From Scratch: Writing the Contract Deployment

Unlike our cozy, comfort zone in Huff, Yul doesn't hand us the contract deployment on a silver platter. We take on the exciting task of writing it ourselves. It boils down to a few special Yul functions—`data_copy`, `data_offset`, and `data_size`. These are the trio of magicians that move and access portions of your Yul object.

![Yul contract deployment](https://cdn.videotap.com/618/screenshots/2ke2SHMrl9xCpgGCvimu-447.21.png)

The magic incantation goes a bit like this:

```
data_copy(0, data_offset("runtime"), data_size("runtime"))
```

Then we wrap it up with:

```
return(0, data_size("runtime"))
```

Easy enough, right? You're essentially commanding Yul to grab the full `runtime` object, shove it into memory spot zero, and serve it up on the blockchain silver platter-style.

#### Compiling Yul: A Techie's Dream (or Nightmare?)

Let's talk about compiling Yul. Warning: it's a tad more complex than your average script. You're going to want the Solidity (solc) compiler for this one, and the ever-so-handy `solc-select` tool can help you switch between Solidity versions with a breeze.

Once you've armored up with `solc`, ready your terminal and type:

```shell
solc --strict-assembly --optimize --optimize-runs=2000 --bin horsestore.yul
```

Hit enter, and bam! You've got a result that's a mixed bag of gibberish and genius. For sanity's sake, a quick `grep '60'` can help you isolate that precious binary output.

#### Playing Dispatcher: The Smart Contract’s Command Centre

Next, we breathe life into our contract with a function dispatcher. Think of it as the HQ where all function calls are directed. Deploy a switch statement sprinkled with cases for each function selector, and for anything else, a default revert. We're setting strict rules for this dispatcher, and it's going to uphold them like a boss.

## Decoding the Magic: Helper Functions Unveiled

Let's not forget our helper functions. They're the unsung heroes working backstage, breaking down the selectors and arguments. It's a bit of Yul quirkiness, but hang in there.

For our `store_number` and `update_horse_number` functions, we’re meticulously pulling data from call data, ensuring every byte is precisely where it needs to be. If all goes to plan, you’ll wield the power to splice in new numbers or simply read the number of horses at your whim.

### Testing and Deploying: The Final Frontier

So you’ve followed the breadcrumbs and coded the perfect Horse Store in Yul. Now what? The litmus test involves compiling and looking out for that pesky invalid opcode (`FE`). Once you nab it, seize all the code that follows and boldly move it to your test environment.

Feel like skipping the deployment phase? Totally fine. But if you have an insatiable curiosity and a thirst for proving your Yul mastery, then I urge you to take this baby for a spin. Deploy it, fuzz it, and marvel at your creation. The bragging rights alone are worth it.

## Wrap Up: Understanding Your Yul Creation

Let’s tie it all up. Every Yul masterpiece kicks off with an `object`, cradling your contract deployment and runtime code in its arms. It's a journey of storing, decoding, and dispatching—with a scenic view of the Yul syntax.

The bottom line? If you roll with Yul, you’re engaging in a unique dialogue with the Ethereum Virtual Machine. If it's not for you, no hard feelings—there's a whole world of Solidity and Huff awaiting your talent. But for the coders who choose to walk the path less traveled, may your Yul contract be robust and your coding sessions less like battles and more like victories.

As we conclude this epic tale of smart contract development, whether you choose Huff or Yul, let your development journey be adventurous and your code impeccable. And with that, we close the chapter on our all-Yul Horse Store contract. We've ascended beyond the layers of abstraction and wrestled with raw EVM bytecode. Is Yul a prodigious friend or a formidable foe? That’s for you to decide.

Happy coding, and may your smart contracts be as solid as your resolve.
