### Finishing the Pool Contract

We now have a rebase token pool created, so let's build it. We can run the following terminal command:

```bash
forge build
```

We can see that we have an error. This is the problem with relying on Copilot too heavily! The first thing to look at is the path in the rebase token. Let's change the path to:

```javascript
import { IRebaseToken } from "./interfaces/IRebaseToken.sol";
```

We can now build again:

```bash
forge build
```

And we see that we have the wrong number of arguments to the function call. Let's modify this function call to pass through the interest rate:

```javascript
vm.expectPartialRevert(bytes4(IRebaseToken.getInterestRate.selector), rebaseToken.burn(user, 100, rebaseToken.getInterestRate())); 
```

Let's build it again:

```bash
forge build
```

We now have another error: `abi.decode` must be implicitly convertible to bytes memory or bytes calldata. We don't need to do any of that! We can literally just pass through the original sender from this struct:

```javascript
uint256 userInterestRate = IRebaseToken(address(this)).token.getUserInterestRate(lockBurnInput.originalSender); 
```

We can build again:

```bash
forge build
```

And we see that we have a warning about an unused local variable. We are ready to go and build some tests! 
