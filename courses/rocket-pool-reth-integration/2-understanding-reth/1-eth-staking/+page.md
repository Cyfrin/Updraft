## ETH Staking

In this lesson, we will overview how ETH staking works, which will illustrate the constraints that regular users face when running their own validator and staking into the ETH network. This will give us an understanding of what problem Rocket Pool solves.

The purpose of ETH staking is to:

- Run a validator
- Secure the network
- Earn ETH rewards

To run an ETH validator, there are some requirements:

- 32 ETH
- Validator Key
- Withdrawal Key
- Run Validator

Let’s consider a scenario: Alice has 32 ETH and the technical skills to generate a withdrawal key and a validator key, along with the ability to store those keys in a secure manner. With 32 ETH, she can run a validator, secure the ETH network, and earn ETH rewards.

The first step is to stake the 32 ETH. Alice can send a transaction to a deposit contract, sending her 32 ETH, along with the validator public key, which is derived from the validator key, and the withdrawal credentials, which are derived from the withdrawal key. The withdrawal key is later used when Alice wants to unstake her 32 ETH. Next, she will run a validator.

The validator key is used by the validator to sign blocks and attest to transactions. Alice will need to take the validator key and include it inside the server that runs the validator software. This provides an overview of how ETH staking works.

Now we can see that for Alice to become an ETH staker, she first needs 32 ETH. Assuming one ETH is \$3,000, then 32 ETH is \$96,000. Additionally, she needs the technical skills to run a validator and secure the validator keys, along with her withdrawal key.
