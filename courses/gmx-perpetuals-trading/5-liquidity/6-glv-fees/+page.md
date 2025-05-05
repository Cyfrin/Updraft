## Understanding GMX V2 GLV Deposit and Withdrawal Fees

GMX V2 introduces GMX Liquidity Vaults (GLV) as a way for users to provide liquidity across multiple markets simultaneously. These vaults, such as the `GLV (WETH-USDC)` vault, hold shares in various underlying GMX Market (GM) pools. They are designed to automatically rebalance positions and accrue fees generated from swaps and leverage trading within those specific market pools (like BERA/USD, LTC/USD, etc.).

A common question arises regarding the costs associated with interacting with these vaults: What are the fees for depositing liquidity into or withdrawing liquidity from a GLV?

The fee structure for adding liquidity (which corresponds to buying GLV tokens) or removing liquidity (selling GLV tokens) is fundamentally the same as the fees incurred when interacting directly with the underlying GM pools that make up the vault.

This equivalence exists because the GLV mechanism acts as a layer of abstraction. When you deposit assets (like ETH or USDC, either singly or as a pair) into a GLV vault to acquire GLV tokens, the vault protocol ultimately uses those assets to add liquidity to the constituent GM market pools according to its defined strategy. Conversely, when you sell your GLV tokens to withdraw your underlying liquidity, the protocol facilitates this by removing the corresponding liquidity from those same underlying GM pools.

Therefore, the transaction for depositing into or withdrawing from a GLV is subject to the standard deposit or withdrawal fees (and potential price impact) associated with the specific GM pools being interacted with "under the hood" as part of the GLV operation.

In summary, while GLV vaults offer a convenient method for managing diversified liquidity provision and earning fees across multiple GMX V2 markets, they do not introduce a distinct layer of deposit/withdrawal fees. The costs are directly tied to the fees inherent in the underlying GMX V2 GM pools that the vault utilizes.