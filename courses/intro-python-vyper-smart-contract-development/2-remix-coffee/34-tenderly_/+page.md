## Testing Vyper Smart Contracts with Tenderly and Remix

This lesson walks through the process of performing end-to-end testing on a Vyper smart contract (`buy_me_a_coffee.vy`) using a combination of Remix IDE, MetaMask, and a Tenderly Virtual Testnet. We'll simulate real-world interactions to ensure our contract behaves exactly as intended.

**Preparation: Setting Up for Testing**

Before deploying and interacting, we need to prepare our contract and environment for effective testing.

1.  **Enhance State Visibility:** For easier verification during testing, it's helpful to make key state variables publicly accessible. By adding the `public` keyword, Vyper automatically generates getter functions for these variables, allowing us to read their values directly from the Remix UI after deployment.

    ```vyper
    # Example modifications to buy_me_a_coffee.vy
    # Ensure relevant variables have the 'public' keyword

    minimum_usd: public(uint256) # Allows reading the minimum funding value
    price_feed: public(AggregatorV3Interface) # Allows checking the price feed address

    # Variables likely already public for core functionality access
    owner: public(address)
    funders: public(DynArray[address, 1000])
    funder_to_amount_funded: public(HashMap[address, uint256])
    ```
    This modification is purely for simplifying the testing process within Remix.

2.  **Configure the Testing Environment:**
    *   **Remix & MetaMask:** Ensure Remix IDE is open and connected to your MetaMask wallet. Select the "Injected Provider - Metamask" option in Remix's Environment dropdown (within the Deploy & Run Transactions tab). This links Remix to your chosen network via MetaMask.
    *   **Tenderly Virtual Testnet:** Instead of using a public testnet like Sepolia (where acquiring test ETH can be cumbersome), we'll use a Tenderly Virtual Testnet. Create a new virtual testnet fork on the Tenderly dashboard. This provides a private, realistic simulation of the blockchain.
    *   **Connect MetaMask to Tenderly:** Add the Tenderly Virtual Testnet's RPC URL to MetaMask as a custom network and switch to it.
    *   **Multiple Accounts:** Testing access control requires simulating different users. In MetaMask, ensure you have at least two accounts. We'll designate "Account 1" as the contract owner and "Account 2" as a funder/regular user.
    *   **Fund Test Accounts:** Use the Tenderly dashboard's faucet feature associated with your virtual testnet to easily send ample test ETH to both Account 1 and Account 2. This is a major advantage over public testnets.

**Deployment**

With the environment configured and accounts funded, deploy the contract:

1.  Ensure "Account 1" (the intended owner) is selected in MetaMask.
2.  In Remix, compile the `buy_me_a_coffee.vy` contract.
3.  Navigate to the "Deploy & Run Transactions" tab.
4.  Select your contract from the dropdown.
5.  Provide any necessary constructor arguments (like the `_price_feed_address` and `_minimum_usd`).
6.  Click "Deploy".
7.  Confirm the transaction in MetaMask.

Upon successful deployment, the contract's `owner` state variable will be set to Account 1's address, and other state variables (`minimum_usd`, `price_feed`) will be initialized according to the constructor arguments. You can verify these initial values using the public getter functions in the Remix UI under "Deployed Contracts".

**Testing Core Functionality**

Now, we systematically test the contract's functions using our different accounts.

1.  **Testing the `fund` Function (as Non-Owner):**
    *   Switch to "Account 2" in MetaMask. Remix will now use this account for transactions.
    *   Locate the deployed contract in Remix.
    *   Find the `fund` function. Since it's `@payable`, it requires sending ETH.
    *   Determine the Wei equivalent for a small amount of ETH (e.g., 0.002 ETH). You can use online tools like `eth-converter.com` for this. Enter this Wei value into the "VALUE" field next to the transaction button in Remix, ensuring "Wei" is selected in the unit dropdown.
    *   Click the `fund` button and confirm the transaction in MetaMask.
    *   **Verification:**
        *   Check the `funder_to_amount_funded` mapping by entering Account 2's address into the corresponding getter function field and clicking "call". Verify the returned value matches the Wei amount sent.
        *   Check the `funders` dynamic array. Call its getter function with index `0`. Verify it returns Account 2's address.
        *   (Optional) Send funds again from Account 2. Verify the `funder_to_amount_funded` increases correctly, and calling the `funders` getter with index `1` now shows Account 2's address again (confirming addresses are appended).
        *   This implicitly tests that the sent amount met the `minimum_usd` requirement converted to ETH via the price feed, otherwise the transaction would have failed the `assert usd_value_of_eth >= self.minimum_usd` check within the `fund` function.

2.  **Testing `withdraw` Access Control (as Non-Owner):**
    *   Ensure "Account 2" is still selected in MetaMask.
    *   In Remix, locate the `withdraw` function under the deployed contract.
    *   Click the `withdraw` button.
    *   **Verification:** Observe the transaction failing in the Remix console. Remix might even predict the failure. This confirms the access control mechanism works as expected. The transaction reverts because `msg.sender` (Account 2) does not match `self.owner` (Account 1), failing the check:
        ```vyper
        assert msg.sender == self.owner, "Not the contract owner!"
        ```

3.  **Testing `withdraw` and State Reset (as Owner):**
    *   Switch back to "Account 1" (the owner) in MetaMask.
    *   In Remix, click the `withdraw` button again.
    *   Confirm the transaction in MetaMask.
    *   **Verification:**
        *   Observe the transaction succeeding in the Remix console.
        *   Check the contract's balance displayed in Remix (or check Account 1's balance increase in MetaMask/Tenderly Explorer). The contract balance should now be 0.
        *   Verify the state reset logic:
            ```vyper
            # Resetting logic within withdraw()
            for funder: address in self.funders:
                self.funder_to_amount_funded[funder] = 0
            self.funders = []
            ```
        *   Call the `funder_to_amount_funded` getter again with Account 2's address. Verify the returned value is now `0`.
        *   Attempt to call the `funders` array getter with index `0`. Verify that this call now fails or reverts, confirming the array has been cleared (`self.funders = []`).

**Conclusion**

By following these steps, we have successfully tested the core functionalities of the `buy_me_a_coffee.vy` contract on a Tenderly Virtual Testnet: funding, owner-restricted withdrawal, and state reset upon withdrawal. The tests confirmed that the contract behaves precisely as designed, respecting access controls and correctly managing state updates. Using Tenderly significantly simplified the testing process by providing an isolated environment and easy access to test ETH, making it a highly recommended tool for smart contract development workflows. Remember that testing with multiple accounts is crucial for validating access control mechanisms.