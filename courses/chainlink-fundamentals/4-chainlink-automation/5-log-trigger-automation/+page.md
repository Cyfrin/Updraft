# Log Trigger Automation

Log triggers in Chainlink Automation allow you to execute smart contract functions in response to on-chain events. When a contract emits a specific event (log), Chainlink Automation can detect it and automatically call a designated function in your target contract.

In this lesson, we'll build a two-contract system to demonstrate log-triggered automation:

- **EventEmitter Contract**: This contract will emit a specific event when a certain function is called. This event will serve as the trigger for our automation.
- **LogTrigger Contract**: This contract will contain a function that tracks how often it has been called through automation. Chainlink Automation will trigger this counter function whenever the `EventEmitter` contract emits our target event.

This architecture demonstrates a powerful pattern in blockchain development - event-driven automation.

## Deploying & verifying an EventEmitter contract

### The EventEmitter contract

In Remix, in your **"Automation"** workspace in the `contracts` folder, create a folder named `log-trigger` and add a file named `EventEmitter.sol`.

In this file, we are going to write a simple contract that emits the event `WantsToCount` when the `emitCountLog` function is called. Copy and paste the code from the [course code repo](https://github.com/ciaranightingale/chainlink-fundamentals-code/blob/main/automation/log-trigger/EventEmitter.sol).

Deploy this contract to Sepolia using the steps in the previous lessons, and remember to pin the deployed contract instance to the workspace.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/event-emitter-deploy.png' style='width: 100%; height: auto;' alt='event-emitter-deploy'}

Once the contract is deployed, we can interact with it. If we click `emitCountLog` and confirm the transaction, it will emit an event `WantsToCount`.

Before we continue, let’s verify our contract on Etherscan using the steps in the previous lessons. 

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/verify-and-publish.png' style='width: 100%; height: auto;' alt='verify-and-publish'}

When you return to the contract on Etherscan, you should see a green checkmark next to the **Contract** tab.

If we go to the **Events** tab, we should see the log from our earlier `emitCountLog` call.

## The LogTrigger contract

Back in Remix, in the `log-trigger` folder, create a file called `LogTrigger.sol`.

This smart contract needs to:
- Inherit the `ILogAutomation` interface so it is compatible with log trigger automation. This requires we implement two functions:
    - `checkLog`: simulated by Automation to see if any work needs to be performed. This function returns `performData`, which is passed to the `performUpkeep` when it is executed. We will return the function caller in the `performData` so that we can emit a log containing who triggered/sent the event. 
    - `performUpkeep`: executed by Automation when performing the upkeep. The `performData` can be used inside the function implementation. In this function, we will increment `counter` and emit a log containing who triggered the event (to demonstrate how the `performData` can be used).

Copy and paste the code from the [course code repo](https://github.com/ciaranightingale/chainlink-fundamentals-code/blob/main/automation/log-trigger/LogTrigger.sol) into the `LogTrigger.sol` file.

Deploy this contract to Sepolia using the steps in the previous lessons, and remember to pin the deployed contract instance to the workspace.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/deploy-log-trigger.png' style='width: 100%; height: auto;' alt='deploy-log-trigger'}

Once the contract is deployed, we can interact with it via Remix. If we check the value of the counted it will show `0`. 

We now need verify the contract on Etherscan. We will first need to flatten the file and use this code to do the verification.

## Creating a Log Trigger Automation

Now that we’ve deployed our smart contract let’s head to the Chainlink Automation app and create the upkeep to increment our counter using Automation when our event is emitted.

Select **Register new Upkeep** and  select the trigger mechanism as **Log trigger**.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/log-trigger-mechanism.png' style='width: 100%; height: auto;' alt='log-trigger-mechanism'}

Enter the address of the `LogTrigger` contract as the **Contract to automate**.

Enter the `EventEmitter` contract address for the **Contract emitting logs**, and select the `WantsToCount` event as the emitted log.

Leave the **Log index topic filters** blank and click **Next**

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/log-trigger-options.png' style='width: 100%; height: auto;' alt='log-trigger-options'}

Fill in the **Upkeep details**: 
    - **Upkeep name**: A name for the upkeep visible on the Automation dashboard, e.g. **"LogTrigger Counter"**
    - **Admin Address**: This will be your connected by default but you can change which address will be the admin for the upkeep here.
    - **Gas limit**: The maximum amount of gas your selected function for upkeep will need to perfrom. This is `500_000` by default.
    - **Starting balance**: A starting balance of LINK balance used to pay for Chainlink Automation. In this example, `5` LINK will surfice.
    - The **Project information** is optional and we are going to leave it blank.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/log-upkeep-details.png' style='width: 100%; height: auto;' alt='log-upkeep-details'}

Click **Register Upkeep** and submit the registration request. Once confirmation has been recived, sign the message to verify ownership. Your automation is now created! 

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/log-upkeep-registration.png' style='width: 100%; height: auto;' alt='log-upkeep-registration'}

You can click **View Upkeep** to see the upkeep details as the previous two lessons. 

Return to Remix, head to the **Deploy & run transactions** tabs, and call the `emitCountLog` function in the `EventEmitter` contract to emit a log and trigger an upkeep.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/emit-count-log.png' style='width: 100%; height: auto;' alt='emit-count-log'}

Once this transaction is complete, you should see the upkeep in the history section of your upkeep.

::image{src='/chainlink-fundamentals/4-chainlink-automation/assets/log-trigger-history.png' style='width: 100%; height: auto;' alt='log-trigger-history'}

If you check the counted value in the `LogTrigger` contract, you’ll find that it has increased by `1`.

Congratulations! You’ve automated a contract’s function execution using a log trigger Automation mechanism.
