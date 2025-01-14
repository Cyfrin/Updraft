## Account Abstraction Lesson 30: Via Ir

Ok, let's see if your test is working. Place the following command in your terminal.

```js
forge test --mt testZkOwnerCanExecuteCommands --zksync
```

And.... we get an error. If you read the error message you will see that we need something called `--via-ir`. This is a compiler flag. It instructs the compiler to use the Intermediate Representation (IR). We don't need to worry about the details of this for this course. For now, just place the following in your `foundry.toml` under `is-system = true`

```js
via-ir = true
```

> ❗ **NOTE** This may cause our code to compile a bit slower, but it will work.

Let's run our test again.

```js
forge test --mt testZkOwnerCanExecuteCommands --zksync
```

---

We can see that our test now passes.

Move on to the next lesson when you are ready.
