We need to deploy our contracts and test that sending out tokens cross chain works as intended on a live testnet. 

We are going to deploy our vaults, then a rebased token, and associated token pool on Sepolia, and then we are also going to deploy another token and token pool on zkSync so that we can bridge our tokens from Sepolia to zkSync. By zkSync of course I mean zkSync Sepolia, the zkSync testnet.

However, before we do that, I remember that we actually didn't build our contracts our scripts to check that they work. So, we can just run a little forge build.

Ah, we didn't declare our struct in memory. So, we need to do that. 

```javascript
memory
```

But, other than that, it all compiles correctly which is very nice.

The other thing that I wanted to say was that if you want to make sure on GitHub that everything is passing correctly, and all your tests pass, you might think, ah, in the foundry.toml underneath my RPC endpoints um, obviously, in here, you can see my RPC URLs. Do not use those because after I have recorded this I'm going to be getting rid of those RPC URLs, so don't bother. Um, and I recommend that you don't share out your RPC URLs, because someone else could go and use them and do something malicious with them, which wouldn't be a good idea, because then you'd be blamed. 

Anyway, so, we can write via_ir = true in the foundry.toml. 

However, the problem with this is that there's actually a little bug. If we go to the bug, it is .warp via_ir. And, you can see here on the GitHub issues, there is a, an issue which is closed because they suggested something which actually doesn't work. But, essentially, vm.warp doesn't work as intended, if you set via_ir to true.

So, the problem is, if we push things to GitHub, we'll actually get some failing tests because it messes things up. So, instead of doing this which we could do to make sure that it compiles with via_ir, instead, what we're going to do is something a little bit not great, but, actually I can't find a workaround at the moment, even if I, all of the places where we're doing a warp, set these as state variables, and then pass them in, nothing was working. So, in crosschain.t inside bridgeTokens, instead of checking that the user interest rate works as intended and passes over, I actually just get rid of these local variables and don't test the user interest rate. So, I've just deleted those. When I pushed to GitHub, I mean, this isn't a great thing to do because obviously we did want to check that, but maybe what we could do is do a cross chain transfer, and then check these variables in our actual test, rather than in the function. So, that's what we can do. So, instead, we can get rid of these two lines, and we could also just pass this rather than making it into a fee variable we could pass this directly into this function call. 

And, this function call um, but, instead, we would then, in bridgeAllTokens check the interest rate on the source chain, and then check the interest rate on the destination chain.

So, then, if we run forge build, now, it all runs fine, and we don't need via_ir anymore. If you do still need via_ir for some reason, then you could get rid of that fee variable which is what I've done on the GitHub repo associated with this section. 

So, yeah, if you want to read more about that, then there are some issues linked here which explain it in a little bit more detail. But, this workaround doesn't work. 
