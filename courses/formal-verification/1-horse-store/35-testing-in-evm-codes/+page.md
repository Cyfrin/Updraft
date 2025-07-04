---
title: Testing in EVM Codes
---

_Follow along with this video:_

---

Just as before, we should leverage evm.codes to assist in visualizing the steps our execution takes when calling our `GET_NUMBER_OF_HORSES` macro. Keep an eye on the panel detailing memory at the bottom of the page!

The playground is going to need an updated bytecode for the playground. `huffc src/HorseStoreV1/HorseStore.huff --bin-runtime`

Our runtime bytecode should look something like this now (it keeps growing, the more we add!):

```
5f3560e01c8063cdfead2e1461001b578063e026c01714610022575b6004355f55005b5f545f5260205ff3
```

Because we're performing a read-only operation (readNumberOfHorses) all that's required to be passed as `call data` is our function selector `0xe026c017`, remember you can us the command `cast sig "readNumberOfHorses()"` to derive this signature.

Click run and step through the execution of this function call. The first steps are the same as before, our function dispatcher will compare the passed function signature vs our application's _known_ function signatures to determine which logic to perform on the passed `call data`.

> **Note:** Simply loading our new bytecode and calling our `readNumberOfHorses` function may be a little uneventful - remember to first send call data to **_set_** a number of horses!

Your contract state should look something like this if you've stepped through the `updateNumberOfHorses` execution (using 7 as a passed parameter):

![testing-in-evm-codes1](/formal-verification-1/35-testing-in-evm-codes/testing-in-evm-codes1.png)

Let's step through the execution further and see how things perform. Looking at the op codes added to our contract following our `readNumberOfHorses()` jump destination (`JUMPDEST`) we should see:

1. PUSH0 - pushes our desired storage slot to the top of the stack for reference - in our case 0
2. SLOAD - loads data from the storage slot on the top of the stack
3. PUSH0 - the bytes offset that we wish to apply to the data being loaded - in our case 0
4. MSTORE - loads into memory the data from SLOAD with the requested bytes offset
5. PUSH1 - pushes the number of bytes we desire to be accessed from memory to the top of the stack - in our case we're passing '20' or '0x20' - this is the hex value for 32 bytes, the entirety of data in our storage slot
6. PUSH0 - bytes offset of data accessed from memory, or where to begin reading from the data string - again in our case this is zero to capture everything
7. RETURN - returns the data from memory beginning at the offset on the top of the stack, the size of this data string is determined by our second item in the stack (32 bytes)

![testing-in-evm-codes2](/formal-verification-1/35-testing-in-evm-codes/testing-in-evm-codes2.png)

That's really all there is to it! Breaking down the operations of a contract step by step makes each execution clear and easy to understand!
