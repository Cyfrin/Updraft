## EigenLayer and the Proof of Stake Problem

EigenLayer is a protocol that allows you to reuse the staked ETH to secure other protocols or services.

Let's discuss the problems Ethereum and other Proof of Stake protocols have, and how EigenLayer can solve them.

**Problem:** Imagine Ethereum without EigenLayer. We have smart contracts that are secured by the Ethereum network. The way the Ethereum network is secured is by the Proof of Stake consensus. Basically, validators lock their ETH, validate transactions, and propose new blocks. If they misbehave in one way or another, the ETH that they locked will be destroyed.

On Ethereum, we also have a tokenized version of the ETH that is staked. For example, Lido STETH and Rocket Pool RETH. Users deposit ETH into their protocol, and then the protocol will mint these tokens.

The protocol uses the ETH deposited by the users and then allocates it to a validator that they assign. Now imagine that there is a new protocol or service that requires decentralization and economic security. In other words, Proof of Stake, and they issue their own coin.

What we mean by service are things like Data Availability Service, Price Oracle, Bridge, or Rollup Sequencer. We have some kind of service or protocol that cannot be done by a smart contract; therefore, these services cannot be secured by Ethereum since they are not smart contracts. They need to issue their own tokens to spin up a Proof of Stake consensus.

Imagine a potential staker with a lot of money. They can either use this money to buy ETH and then stake it into the Ethereum network, or they can use their money to buy this token to secure the service.

The staker doesn’t have infinite capital, so he can only choose one: Stake into ETH or stake into this other service.

Imagine that there are hundreds of these stakers. Each of them will have to decide either to stake into ETH or stake into another service, or they might have enough capital to stake into both. Their capital must be split between the two services.

Proof of Stake is secured by the amount of value that is staked. When stakers have to split their capital to stake some into the off-chain service and some other to Ethereum, it fragments economic security.

Let’s say that this staker had \$100. They can either choose this \$100 to stake ETH or to stake this other service or split this \$100 to participate in Proof of Stake for both Ethereum and this service.

The \$100 of economic security is split between Ethereum and this other service.

This is the problem of Proof of Stake from the staker's perspective, but there’s also a perspective from the protocol. For a new protocol, it’s difficult to get the attention of potential stakers to stake tokens into their protocol over another protocol such as Ethereum.
