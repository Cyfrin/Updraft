## Manually Creating The Hexdata

We've learned how to use remix to send raw hexadecimal data to our contracts. This hexdata that is sent is also known as the *calldata*. 

Now we can go a step further. Let's check this out. We'll go back in our terminal. 

We can use the *cast* tool to manually create the hex, doing the same thing that we did in *vipper*. We can do 
```bash
% cast calldata --help
```

We can see it takes the function signature and the arguments, and it will encode them to create that hex object. 

Let's clear. We'll do 
```bash
% cast calldata "transfer(address,uint256)"
```

Let's use the address for account four in Metamask: 
```bash
% cast calldata "transfer(address,uint256)" "0xBC989fDe54Ca4d2aB4392Af6dF60f6d04873A033A"
```

And for an amount we'll do 31337. Enter. 

So, this is the raw hex here, and now if we copy this, the amount right now is 100 and some address is this one. We can paste this raw data into the low level interactions, and hit transact. 

Now we can scroll up and see the amount is now 31337 and some address has also been changed. 

This is how we can use low level power to call anything. We now know how this hex data in transactions is being generated. We can make sure we know what's going on here, what the first section is, et cetera. 
