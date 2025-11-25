---
title: Pure Yul
---

_Follow along with this video:_

---

### Pure Yul Disclaimer

I'm going to start this lesson by saying, out of the gate, basically nobody codes in raw Yul. This is entirely optional, and I don't recommend using raw Yul in production unless you have some esoteric reason to.

I personally feel you'd be more successful getting really good at Huff than spending a lot of time on raw Yul and Yul's abstraction sometimes feels like you're fighting with the EVM - this is just my opinion.

### Standalone Yul

Let's see how raw Yul would look nonetheless. We'll do this by writing the entire HorseStore contract in standalone Yul!

Foundry doesn't like `Yul` being in the `src` folder, so start by creating a `Yul` folder and a file within named `HorseStoreYul.yul`

We're going to notice differences immediately upon starting this contract. For example, we don't use the keyword `contract`, we use `object`. Whenever this object is deployed, it will deploy whatever is inside of the `code` section it contains.

```js
object "HorseStoreYul" {
    code {}
}
```

> **Note:** If you'd like to take advantage of Yul syntax highlighting you can install the VS Code extension [Solodity + Yul Semantic Syntax](https://marketplace.visualstudio.com/items?itemName=ContractShark.solidity-lang)

Alright, unlike Huff, in Yul we have to set up our contract deployment ourselves. The code for this deployment is going to look like:

```js
object "HorseStoreYul" {
   code {
       datacopy(0, dataoffset("runtime"), datasize("runtime"))
       return(0, datasize("runtime"))
   }
}
```

Datacopy, dataoffset and datasize might seem unfamiliar, but these are function within Yul which assist it to access disparate parts of a Yul Object.

![pure-yul1](/formal-verification-1/61-pure-yul/pure-yul1.png)

We can see that in our circumstances the `datacopy` function is being used as equivalent to the `codecopy` opcode, and what does `codecopy` do? Well, it's taking the size and offset of our `runtime code` (we haven't written the `runtime` yet!) and returning it to be copied to the blockchain!

```js
object "HorseStoreYul" {
    code {
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
}

object "runtime" {
    code {}
}
```

### Compiling Yul

Before we start adding `runtime code`, lets go over compiling `Yul`, since it can be a little tricky. You'll first need to have the Solidity Compiler installed. You can look at how to install `solc` [here](https://docs.soliditylang.org/en/latest/installing-solidity.html)

> **Pro-tip:** I recommend looking at installing `solc` via `solc-select` (available [here](https://github.com/crytic/solc-select)). This will allow you to easily switch between different versions of the solidity compiler as you need!

You can verify your solc installation with `solc --version`.

From here you should be able to run the command:

```bash
solc --strict-assembly --optimize --optimize-runs 20000 yul/HorseStoreYul.yul --bin | grep 60
```

This is going to return the binary of our contract after compilation!

![pure-yul2](/formal-verification-1/61-pure-yul/pure-yul2.png)

### Runtime Code

Let's get started writing the `runtime` portion of our `Yul` smart contract. Just like we say in Huff (and the Solidity back end), we're going to need to start with a `function dispatcher`!

The function dispatcher here is going to be handled a little differently than we're used to.

```js
object "runtime" {
    code {
        // function dispatcher
        switch selector()
        // updateHorseNumber
        case 0xcdfead2e {

        }
        // readNumberOfHorses
        case 0xe026c017 {

        }
        default {
            revert(0, 0)
        }
    }
}
```

So, what's happening here? We're declaring a `switch` statement for a function `selector()` that we'll define soon. We're defining each case for the switch statement to execute based on the result of our `selector()` function.

The first case, we expect to see the function signature of our `updateHorseNumber`, at which case the logic for that function will execute. Likewise, if the function signature of `readNumberOfHorses` is received, that case will trigger and the associated logic will execute.

If neither cases are found, the `default` will trigger and revert the transaction!

We next need to define our `selector()` function.

```js
object "runtime" {
    code {
        // function dispatcher
        switch selector()
        // updateHorseNumber
        case 0xcdfead2e {

        }
        // readNumberOfHorses
        case 0xe026c017 {

        }
        default {
            revert(0, 0)
        }

        /* -- decoding functions -- */
        function selector() -> s {
            s := div(calldataload(0), 0x10000000000000000000000000000000000000000000000000000000)
        }
    }
}
```

Let's breakdown `selector()` a bit because it is wild.

Basically, when this function is called it returns a variable `s`. Return, in Yul, is denoted by `->`, so `return s` == `-> s`.

Then, within the `selector()` function we're dividing our `calldata` (accessed via `calldataload(0)`), by `0x10000000000000000000000000000000000000000000000000000000` and assigning the value to our `s` variable.

> **Note:** the number `0x10000000000000000000000000000000000000000000000000000000` is effectively removing 28 bytes from our calldata, leaving us with the first 4 bytes - or our `function selector` to compare to our `switch` cases!

### Switch Case Logic

Now that we've isolated our `function selector` from our `calldata`, we should have some logic for it to get routed to base on which `switch case` triggers. Let's start with `updateHorseNumber`

```js
case 0xcdfead2e {
    storeNumber(decodeAsUint(0))
}
```

Both `storeNumber()` and `decodeAsUint()` are functions we'll define ourselves now.

### decodeAsUint

```js
/* -- decoding functions -- */
        function selector() -> s {
            s := div(calldataload(0), 0x10000000000000000000000000000000000000000000000000000000)
        }

        function decodeAsUint(offset) -> v {
            let positionInCalldata := add(4, mul(offset, 0x20))
            if lt(calldatasize(), add(positionInCalldata, 0x20)){
                revert(0, 0)
            }

            v := calldataload(positionInCalldata)
        }
```

Our `decodeAsUint()` function is taking an `offset` as a parameter (we've passed `0` in our `updateHorseNumber` switch case) and returns a value `v`. The function determines a `positionInCalldata` by adding `4` (the size of our `function selector`) to our `offset` multiplied by `0x20` (32 bytes).

Because our `offset` is 0, our positionInCallData is going to be starting at 4 bytes, or immediately following our function selector.

We then assign a value to our return value, v. `calldataload()` will load 32 bytes of `calldata` starting from a passed `offset`, which in our case is immediately following our `function selector` and hopefully this will be the value that we're updating!

### storeNumber

With our `decodeAsUint` function written, let's go back to our switch case for `updateHorseNumber` and start defining the `storeNumber` function. Here's where we're at so far for our `runtime` code:

```js
object "runtime" {
    code {
        // function dispatcher
        switch selector()
        // updateHorseNumber
        case 0xcdfead2e {
            storeNumber(decodeAsUint(0))
        }
        // readNumberOfHorses
        case 0xe026c017 {

        }
        default {
            revert(0, 0)
        }

        /* -- decoding functions -- */
        function selector() -> s {
            s := div(calldataload(0), 0x10000000000000000000000000000000000000000000000000000000)
        }

        function decodeAsUint(offset) -> v {
            let positionInCalldata := add(4, mul(offset, 0x20))
            if lt(calldatasize(), add(positionInCalldata, 0x20)){
                revert(0, 0)
            }

            v := calldataload(positionInCalldata)
        }
    }
}
```

We'll define our `storeNumber` function just below our `default` switch case.

```js
default {
            revert(0, 0)
        }

function storeNumber(newNumber) {
    sstore(0, newNumber)
}

        /* -- decoding functions -- */
```

Because the data being passed to our `storeNumber` function has already been decoded (via our `decodeAsUint` function), we can just call our `sstore` code, passing it the storage slot of our `horseNumber` (`0`) and the function parameter (`newNumber`).

Let's look at our readNumberOfHorses case now!

### readNumberOfHorses

```js
// readNumberOfHorses
case 0xe026c017 {
    returnUint(readNumber())
}
default {
    revert(0, 0)
}

function storeNumber(newNumber) {
    sstore(0, newNumber)
}

function readNumber() -> storedNumber {
    storedNumber := sload(0)
}

 /* -- decoding functions -- */
function selector() -> s {
    s := div(calldataload(0), 0x10000000000000000000000000000000000000000000000000000000)
}

function decodeAsUint(offset) -> v {
    let positionInCalldata := add(4, mul(offset, 0x20))
    if lt(calldatasize(), add(positionInCalldata, 0x20)){
        revert(0, 0)
    }

    v := calldataload(positionInCalldata)
}

function returnUint(v) {
    mstore(0, v)
    return(0, 0x20)
}
```

Alright, under the readNumberOfHorses switch case we've added two functions which will be called. The `readNumber()` function is loading our `horseNumber` from storage slot 0 via `sload(0)`. This value is then being passed to `returnUint(v)` which is storing it in memory, and returning 32 bytes (0x20) of data from where it was stored!

Let's see our whole contract now:

```js
object "HorseStoreYul" {
    code {
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
}

object "runtime" {
    code {
        // function dispatcher
        switch selector()
        // updateHorseNumber
        case 0xcdfead2e {
            storeNumber(decodeAsUint(0))
        }
        // readNumberOfHorses
        case 0xe026c017 {
            returnUint(readNumber())
        }
        default {
            revert(0, 0)
        }

        function storeNumber(newNumber) {
            sstore(0, newNumber)
        }

        function readNumber() -> storedNumber {
            storedNumber := sload(0)
        }

        /* -- decoding functions -- */
        function selector() -> s {
            s := div(calldataload(0), 0x10000000000000000000000000000000000000000000000000000000)
        }

        function decodeAsUint(offset) -> v {
            let positionInCalldata := add(4, mul(offset, 0x20))
            if lt(calldatasize(), add(positionInCalldata, 0x20)){
                revert(0, 0)
            }

            v := calldataload(positionInCalldata)
        }

        function returnUint(v) {
            mstore(0, v)
            return(0, 0x20)
        }
    }
}
```

### Pure Yul Recap

And that's our Pure Yul Smart contract! What did we learn?

We learnt that Yul contracts don't use the contract keyword, they have an `object` which will contain a `code` section. This `code` section will almost always contain your contract deployment logic.

```js
object "HorseStoreYul" {
    code {}

    object "runtime" {
        code {}
    }
}
```

There's also a `runtime` object, which contains our contracts `runtime` logic within _its_ `code` section.

We learnt that the first thing we do, just like in Huff and Solidity is employ a `function dispatcher` and that the Yul `function dispatcher` uses `switch `cases to route logic to the case which matches our `calldata`'s `function selector`.

And finally, we learnt the value of leveraging helper functions like decodeAsUint and returnUint to load the necessary data for our functions in and out of storage and memory.

```js
function decodeAsUint(offset) -> v {
    let positionInCalldata := add(4, mul(offset, 0x20))
    if lt(calldatasize(), add(positionInCalldata, 0x20)){
        revert(0, 0)
    }

    v := calldataload(positionInCalldata)
}

function returnUint(v) {
    mstore(0, v)
    return(0, 0x20)
}
```

Wow. We've learnt a lot. Go take a break, you've earned it.
