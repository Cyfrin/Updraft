# Custom Logic Automation

Custom logic upkeeps allow you to define specialized conditions directly within your smart contract to determine precisely when the upkeep should be executed. Unlike simpler trigger mechanisms, custom logic gives you complete control over when your functions run.

In this example, we'll create a time-based trigger for a counter function similar to our previous lesson. However, instead of a standard time-based upkeep trigger, like we used for the `TimeBased` contract, we'll implement it using custom logic trigger to demonstrate this approach's flexibility in a contract called `CustomLogic`.

At the heart of custom logic automation is a simple boolean return value. Your contract will include a function called `checkUpkeep` that evaluates conditions and returns either `true` or `false`. When this function returns `true`, Chainlink Automation executes your designated upkeep function called `performUpkeep`. These functions form the required `AutomationCompatibleInterface` custom logic compatible contracts must implement.

While we're using time as our trigger condition in this example for simplicity, custom logic can evaluate any on-chain condition or combination of conditions you can express in Solidity.

## Creating the Custom Trigger contract

Create a new file in the `contracts` folder in Remix (again, in the "Automation" workspace) named `CustomLogic.sol` with the following content from the [course code repo](https://github.com/ciaranightingale/chainlink-fundamentals-code/blob/main/automation/CustomLogic.sol).

### Code walkthrough

Let's quickly walk through this code:

- The `constructor`: This will enable us to set an interval for updates on deployment via the constructor parameter `_updateInterval`. This interval is in seconds. When we deploy this contract, we will set the interval to `300` or five minutes. It also sets the `lastUpdatedTimestamp` to the `block.timestamp`, which is the block time at deployment.

- For the contract to be compatible with custom logic Automation, the `AutomationCompatibleInterface` must be inherited. It requires two functions to be implemented:
    - `checkUpkeep`: This function should contain the logic to determine if the contract is ready for upkeep. If it is, it will return `true`. Otherwise, it will return `false`.
    - `performUpkeep`: This is the function run by Automation to execute the upkeep. It contains the logic that is run when the upkeep is performed.

## Deploying & verifying the CustomLogic contract

To deploy the contract to Sepolia, follow the steps in the previous lessons. There is a difference this time: We need a constructor parameter! Remember to pin the deployed contract instance to the workspace to ensure it persists if Remix is reloaded.

- Set the `_updateInterval` constructor parameter to `300` (this equals 5 minutes), and click the **Deploy** button.

![custom-automation-deploy](../assets/custom-automation-deploy.png)

- Once the contract is deployed, you can **verify it on [Etherscan](https://sepolia.etherscan.io/)** using the process outlined in the time-based automation lesson. 

### Flattening files

We imported contracts, which means you’ll need to flatten the file first (put the code all into a single file) and then paste that code instead of just the `CustomLogic` code into the verification process. You can do this in the File Explorer by right-clicking the `CustomLogic.sol` file and clicking **Flatten**.

![flatten](../assets/flatten.png)

- Now you can copy the flattened code in `CustomLogic_flattened.sol` and use it for verification.

![flattened](../assets/flattened.png)

## checkUpkeep

- Once five minutes have passed, `checkUpkeep` will return `true`. This indicates that the automation system will run `performUpkeep` once we have setup a custom logic upkeep. 

**Note**: To manually call the `checkUpkeep` and `performUpkeep` functions, pass an empty bytes array as the function parameter:

![empty-bytes](../assets/empt-bytes.png)

## Register Custom Logic Upkeep

With the contract deployed, we can head to the [Chainlink Automation app](https://automation.chain.link/) and create the automation job to enable automatic counting.

- This time, we’ll select **Custom Logic** and enter the address of our deployed contract, then click **Next**.

![custom-logic-trigger](../assets/custom-logic-trigger.png)

- Fill in the **Upkeep details**: 
    - **Upkeep name**: A name for the upkeep visible on the Automation dashboard, e.g. **"TimeBased Counter"**
    - **Admin Address**: This will be your connected wallet by default, but you can change which address will be the admin for the upkeep here.
    - **Gas limit**: The maximum amount of gas your selected function for upkeep will need to use. By default, this is `500_000`.
    - **Starting balance**: A starting balance of LINK is used to pay for Chainlink Automation. In this example, `5` LINK will be sufficient.
    - The **Project information** is optional; we will leave it blank.

![custom-logic-options](../assets/custom-logic-options.png)

- Confirm the registration request and sign the message to verify your ownership of the upkeep.

- The **upkeep page** provides a quick overview that shows the upkeep status, such as when it was last run, the current balance of LINK, and how much LINK has been spent.

![custom-logic-overview](../assets/custom-logic-overview.png)

- The **details section** gives you all the information about the upkeep, such as when it will run next and what function it will call.

![custom-logic-details](../assets/custom-logic-details.png)

The **history section** shows the history of the upkeep, including every time it’s run. Once five minutes have passed, you should be able to refresh the page and see that the upkeep has been completed.

![custom-logic-history](../assets/custom-logic-history.png)

If you head back to Remix, you can see the value of `counter` has increased after 5 minutes has passed. The upkeep will continue until it runs out of LINK or is paused.

![counter-increased-custom](../assets/counter-increated-customs.png)
