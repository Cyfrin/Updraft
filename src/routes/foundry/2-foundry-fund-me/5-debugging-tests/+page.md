---
title: Debugging Tests
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/achXgiVg-FA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

#By taking a hands-on approach, we'll write some functional tests to ensure that our code is working as expected and debug potential issues. This blog post is intended for both the seasoned veteran looking to tighten their test suite or a newcomer wanting to know more about the essentials of testing in Solidity.

## Writing the First Test

Let's go ahead and write a new test. This time, we'll examine whether the actual owner of a contract is indeed its message sender. Starting off, we can begin with the following function:

```js
function testOwnerIsMessageSender () public {
    assertEq(FundMe.i_owner(), msg.sender);
}
```

One of the beneficial aspects of writing descriptive test functions is the role it plays in assisting GitHub Copilot with comprehending your coding intentions.

## Debugging the Test

Inevitably, there may be moments where our test fail and present us with an unexpected output. So, how do we determine why this failed or what transpired?

To debug, we could use numerous techniques we've learned, such as console logs. Let's console log out the literal owner and also the message sender for our starting point.

```js
console.log(FundMe.i_owner());
console.log(msg.sender);
```

Then, re-run the test to examine the console output. This will allow us to check whether these two addresses are indeed different.

```bash
forge test -vv
```

## Understanding Test Failures

Now from the console outputs, the result is that indeed these are two different addresses. This disparity arises because technically, in our setup function, the FundMe test contract is what deploys our FundMe address and would therefore be the owner. The message sender is whoever's making the call to the FundMe test.

In essence, the process looks something akin to this:

- 'Us' calls the `FundMe test`, which then deploys `FundMe`.
- The `FundMe test` becomes the owner of `FundMe`, and not 'us'.

With this newfound understanding, it becomes clear that we shouldn't be checking to see if the `message sender` is the owner, rather we ought to check if `FundMe test` is the owner.

<img src="/foundry-fund-me/5-debug-tests/debug1.png" style="width: 100%; height: auto;">

## Correcting the Test

Let's re-write our test function to reflect this information:

```js
function testOwnerIsMessageSender () public {
    assertEq(FundMe.i_owner(), address(this));
}
```

After running the test again, we find that indeed, our assertion was correct. Well done!

## Conclusion on Testing

Console logs have proven to be a very useful debugging tool when writing tests. Of course, as we progress, we'll uncover more helpful ways to construct our tests. But for now, let's take a pause on these, as we'll return to refactor them soon.

If you've written just these tests, great job. To challenge yourself, you might want to pause and try to write some additional tests on your own. After all, practice is the key to mastering any programming language – and this holds particularly true for Solidity!
