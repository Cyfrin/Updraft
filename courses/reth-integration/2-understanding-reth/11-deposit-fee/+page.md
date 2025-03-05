## Function Deposit in RocketDepositPool Contract

We will look at the function `deposit` inside the contract `RocketDepositPool`. This function can be called by the user if they want to mint rETH. We will show you when the function `deposit` is called, and how it checks whether a deposit is enabled or not. Currently, there is a deposit fee. So, if you are writing an integration contract with the Rocket Pool, you might want to be aware that currently there is a deposit fee.

Check Deposit Settings
First, let's see when a user calls the function `deposit`, how does this contract check whether a deposit is enabled or not. The check is done in the first few lines, so let's take a look. First, it gets a contract address from the Rocket Storage. The contract that it's getting is called `RocketDAOProtocolSettingsDeposit` and the way it gets it is by calling an internal function called `getContractAddress`. This function comes from another inherited contract called RocketBase. The `getContractAddress` function will eventually call a function called `getAddress`.

You can see here that it calls the function `getAddress` on the `RocketStorage` contract. This is an example of how contracts in the Rocket Pool protocol call into the RocketStorage contract.

It gets the contract address of `RocketDAOProtocolSettingsDeposit`. Once it gets this contract, it calls a function called `getDepositEnabled`. This is how this function is checking whether a deposit is enabled or not, at the protocol level.

Calculate Deposit Fee
Next, let us show you where the deposit fee is calculated. We can see here that there is a variable called `depositFee`. The way it calculates the deposit fee is by first calling the function `getDepositFee` again on the contract `RocketDAOProtocolSettingsDeposit`. It gets this number, multiplies it by `msg.value`, the amount of ETH that was sent by the user, and then divides it by `calcBase`.

So what's going on here is it's calculating a percentage of the amount of ETH that was sent. This is `depositFee`. And then from the amount of ETH that was sent, it will subtract this amount, this is `depositNet`. The amount of rETH to mint is based on this `depositNet`.

In the future this might change, but if you are writing an integration with the Rocket Pool protocol, currently there is a deposit fee. Depending on the percentage of what the deposit fee is, the actual amount of ETH to calculate the amount of rETH to mint may be less than the amount of ETH that the user sent.
