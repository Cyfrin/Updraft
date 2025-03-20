## EigenLayer Contract Architecture

Here, we'll explain the core contracts in EigenLayer and how stakers and operators interact with them.

First, let's start with the staker. A staker can deposit LSD tokens or other tokens supported by EigenLayer. These tokens are sent to the Strategy Manager contract, which has a separate Strategy contract for each token. Examples of Strategies include managing ETH, STETH, and DAI. The tokens are locked in the strategy contract, and the user interacts with the Strategy Manager contract.

If a user stakes their Ethereum and runs a value layer through EigenLayer, they first create a contract called Eigen Pods. Each user has a dedicated Eigen Pod contract managed by the Eigen Pod Manager. When the staker deploys the Eigen Pod and stakes their ETH, they interact with the Eigen Pod Manager contract.

After depositing the stake assets into the EigenLayer protocol, the next step is to delegate to an operator and delegate these staked assets to an operator. The staker interacts with the Delegation Manager. To undelegate from an operator, you also interact with this contract.

The staker also interacts with the Delegation Manager when withdrawing their stake tokens. There is a waiting period once you queue withdrawal. After this waiting period, the staker can withdraw their tokens.

The staker can claim rewards by interacting with the Rewards Coordinator contract.

Next, let's examine how the operator interacts with these contracts.

The operator must register with the Delegation Manager and register as an operator. Then, they register which AVS's to run, and they may also deregister from AVS.

To claim rewards, the operator interacts with the Rewards Coordinator contract.
