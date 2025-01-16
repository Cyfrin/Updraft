## Deploying Tokens

Okay, let's deploy our tokens. Actually, we need to deploy our token, our vault, and our pool on the source chain and then our token and our pool on the destination chain, then enable everything for CCIP.

Let's take a look at the documentation and go to Chainlink Local > CCIP > Guides > Cross-Chain Token Standard and Register from an EOA (Burn & Mint) and then click on Foundry.

The first thing we need to do is to deploy the tokens. So to do that, we need to first store the contract in storage. We can create a:

```javascript
RebaseToken sepoliaToken
RebaseToken arbSepoliaToken
```

Now we're going to want the owner of the protocol to be deploying this token, so we have some kind of owner to be able to have the rights to grant the mint and burn roles, and also be the CCIP admin.

We made the rebase token ownable so let�s create a little owner, which we can store in storage, so we can reuse it. Let�s add

```javascript
address owner = makeAddr("owner")
```

This is a mistake and you can�t have the `constant` keyword because it isn�t a compile time constant value. Let�s remove constant and change it to:

```javascript
address owner = makeAddr("owner");
```

Then we can use the prank to prank the next line or start prank and stop prank to prank a section. We will use:

```javascript
vm.startPrank(owner);
```

Because we want them to call multiple things. Then, we always add:

```javascript
vm.stopPrank();
```

because sometimes we forget.

Let�s add a comment:

```javascript
// 1. Deploy and configure on Sepolia
```

And then a second comment:

```javascript
// 2. Deploy and configure on Arbitrum Sepolia
```

From before we used `vm.createSelectFork("sepolia");` to make sure we are working on the Sepolia fork. Everything will deploy to the Sepolia fork here. But when we are doing it on Arbitrum Sepolia, we need to use:

```javascript
vm.selectFork(arbSepoliaFork);
```

to change the fork.

So, the first thing we need to do is to deploy the tokens, so:

```javascript
sepoliaToken = new RebaseToken();
```

Then:

```javascript
arbSepoliaToken = new RebaseToken();
```

Now we have deployed it on both chains.

Now, the next thing we need to do is deploy the vault. So, we can again store that in storage:

```javascript
Vault vault;
```

and we can just call it the contract vault, to store the contract in storage so we can reuse it. Then, we can add:

```javascript
vault = new Vault();
```

We are only going to have this on Sepolia because we�re going to enable people to be able to deposit and redeem on the source chain. Let�s check inside the Vault contract, it takes an address of the rebase token within the IRebaseToken interface.

```javascript
vault = new Vault(sepoliaToken);
```

Now, this is going to complain because we have not imported the RebaseToken interface properly, and also that we�ve spelled it incorrectly. If we run:

```bash
forge test --match contract CrossChain
```

We can see it failed.

Oh, we imported it from the wrong place it seems. We imported IRebaseToken from the wrong place. It should be from:

```javascript
import { IRebaseToken } from "../interfaces/IRebaseToken.sol";
```

and not:

```javascript
import { IRebaseToken } from "../../interfaces/IRebaseToken.sol";
```

Let's fix that, and change it to:

```javascript
import { IRebaseToken } from "../interfaces/IRebaseToken.sol";
```

We imported the rebase token using Copilot, and this is not correct. This needs to be from:

```javascript
import { IRebaseToken } from "./interfaces/IRebaseToken.sol";
```

Now let�s run `forge test` again.
