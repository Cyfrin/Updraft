## Rocket Pool Contracts

It's helpful to understand several Rocket Pool contracts that the rETH contract interacts with. Let's get started!

We'll start with the Rocket Pool storage contract. This is a contract that multiple Rocket Pool contracts have access to. Authorized contracts will be able to write any arbitrary data into the Rocket Pool storage contract, and any contract will be able to read the data from this Rocket Pool storage contract.

As an analogy, this is like a database where only authorized users will be able to write into the database, and any user will be able to query the database.

To be more specific, let's say that we have the Rocket Pool contracts and the Rocket storage contract. Authorized contracts will be able to write arbitrary data into this Rocket Storage.

For example, they might call the function `setAddress` to set some address inside this contract, or `setUint`, and so on. Then they can also get the address that was stored by calling the function `getAddress`, or get a number that is stored in this contract by calling a function `getUint`, and so on.
