## Building a Next.js NFT Marketplace: Setup and Core Concepts

Welcome to the final section of our full-stack AI-powered vibe coding journey! In this part, we'll tackle a challenging and exciting project: building a **Next.js NFT Marketplace**. This project represents a shift in focus. Unlike previous sections where we might have started from scratch, here we'll dive into an **existing codebase**. Your primary goal will be to understand this pre-built application and enhance it by adding crucial features. This mirrors a common real-world scenario where developers frequently work with, modify, and extend codebases they didn't initially create.

Furthermore, this project marks a transition from the static site we built previously to a more complex **dynamic site**. This means we'll be dealing with server interactions, API calls, and managing data that changes frequently, specifically data originating from the blockchain.

### Working with the Codebase

To get started, you'll need access to the project's code. While the main course materials reside in the `https://github.com/Cyfrin/full-stack-web3-cu` repository, this specific NFT Marketplace project has its own dedicated repository:

*   **Project Repository:** `https://github.com/Cyfrin/ts-nft-marketplace-cu`

Inside this repository, you'll find two important branches:

1.  **`starting-code` Branch:** This is the **default branch** and your **starting point**. It contains a partially built version of the NFT marketplace application. Clone the repository and ensure you are on this branch to begin the exercises.
2.  **`main` Branch:** This branch contains the **final, completed version** of the codebase, including the features you'll be adding. If you get stuck or want to see the finished solution for reference, you can switch to this branch.

The technology stack for this project includes Next.js, React, and TypeScript for the frontend. We'll use tools like Wagmi and RainbowKit for seamless wallet connectivity. Although we won't be writing smart contracts in this section, the application interacts with existing Solidity contracts, likely deployed using Foundry. We'll also explore integrating external services like a potential Compliance API (e.g., Circle API) and an Indexer.

### Key Concept: Dynamic Sites and Indexing

A core challenge when building decentralized applications (dApps) is efficiently displaying on-chain data in the user interface. Imagine our marketplace needs to show the most recently listed NFTs on its homepage. Querying the blockchain directly every time a user visits the page to find *all* listed items would be incredibly slow, expensive, and impractical.

This is where **Indexing** comes in. An indexer is a specialized service that works off-chain. It actively listens for specific events emitted by our smart contracts on the blockchain (e.g., an `ItemListed` event). When it detects such an event, it processes the relevant data (like the NFT address, token ID, seller, and price) and stores it in a readily accessible database (like PostgreSQL).

Our frontend application then queries this indexer's API – a standard web API – to get the list of recently listed NFTs. This is significantly faster and more efficient than querying the blockchain directly. Implementing this indexing mechanism will be one of your key tasks, enabling the display of NFTs on the homepage.

### Key Concept: Frontend Compliance

In certain web3 applications, especially those interfacing with regulated financial systems or aiming for broader adoption, implementing compliance checks might be necessary. This often involves preventing addresses associated with illicit activities (e.g., hacks, sanctions) from using the platform's features.

We'll explore integrating a **Compliance Engine** via an external API (like the Circle API mentioned in the project's README). The typical flow works like this:

1.  A user connects their wallet and attempts an action (e.g., buying an NFT).
2.  Before processing the transaction, the frontend sends the user's wallet address to the Compliance API.
3.  The API checks the address against its databases of flagged addresses.
4.  If the API returns a negative result (meaning the address is flagged), the frontend **blocks the action** and displays an appropriate message to the user (e.g., "Transaction blocked for compliance reasons").
5.  If the API returns a positive result, the frontend proceeds with the transaction flow (e.g., prompting for token approval and purchase).

**Crucially, understand the limitation:** This compliance check operates purely on the **frontend**. It prevents flagged users from using *your specific website interface* but does **not** prevent them from interacting *directly* with the smart contracts on the blockchain using other tools. It's a measure primarily for the platform's interface layer and regulatory standing, not an on-chain security feature. Implementing this frontend check will be another of your main tasks.

### Exploring the Application Functionality

Let's look at what the application does, comparing the final version (`main` branch) with your starting point (`starting-code` branch).

**Final Version (`main` branch) Demo:**

*   **Homepage:** Displays a "Recently Listed NFTs" section populated with NFT images (cakes in this example), Token IDs, Contract Addresses, and Prices (denominated in USDC). Wallet connection is handled via Wagmi/RainbowKit, connecting to a local Anvil test network.
*   **Buying:** Clicking an NFT listed by *another* user takes you to a "Buy NFT" page with details. The process involves approving the marketplace contract to spend your USDC, followed by executing the purchase. If you click an NFT *you* listed, it simply shows a message indicating you are the seller.
*   **Listing:** The "List Your NFT" page allows users to input an NFT's Contract Address, Token ID, and desired Price (in USDC). Listing is a two-step process: first, approve the marketplace contract to transfer the specific NFT, and second, call the `listItem` function on the marketplace contract. Successfully listed items appear on the homepage.
*   **Cake NFT Bakery (`/cake-nft`):** A dedicated page for interacting with a specific "Cake NFT" contract. It allows users to "Bake a Cake NFT" (mint a new NFT with pseudo-random colors) and "View an NFT" by its Token ID to see its image.

**Starting Version (`starting-code` branch) Demo:**

*   Most features are present: You can connect your wallet, interact with the Cake NFT Bakery (minting and viewing), and navigate to the List NFT page structure.
*   **Key Difference:** The **"Recently Listed NFTs" section on the homepage is blank** or shows a placeholder. This is because the **indexing** functionality – the mechanism to fetch and display this data from an indexer – has not yet been implemented.

### Your Tasks

Based on the differences between the starting and final code, your main objectives in this section are:

1.  **Implement Indexing:** Integrate the necessary logic to query an indexer service and display the data correctly in the "Recently Listed NFTs" section on the marketplace homepage. This involves understanding the smart contract events and structuring the frontend query.
2.  **Implement Compliance:** Add the frontend compliance check, likely within the "Buy NFT" workflow. This involves calling a compliance API with the buyer's address before initiating the purchase transaction and handling the API's response to either allow or block the action within the UI.

Remember, while AI can assist with boilerplate, integrating these complex features and understanding the nuances of existing code requires careful thought and development effort. Let's begin building!
