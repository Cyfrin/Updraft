## Setting Up Your NFT Marketplace Project

Welcome! This lesson guides you through the initial setup for our TypeScript-based NFT Marketplace project. We'll create the project directory, clone the necessary starter code, explore the structure, run the essential components, and configure the environment.

First, navigate to your main course directory (e.g., `full-stack-web3-cu`) in your terminal or VS Code's integrated terminal. Create a new directory specifically for this project:

```bash
mkdir ts-nft-marketplace-cu
```

Now, change into that new directory:

```bash
cd ts-nft-marketplace-cu
```

To work effectively, open this folder in your code editor. If you're using VS Code, you can do this directly from the terminal:

```bash
code .
```

Alternatively, use your editor's File -> Open Folder menu option.

## Cloning the Starter Code

Instead of building everything from scratch, we'll start with a pre-configured project template. We'll clone this from a GitHub repository.

The repository URL is: `https://github.com/Cyfrin/ts-nft-marketplace-cu`

Use the `git clone` command, but with an important addition – a `.` at the end. This tells Git to clone the repository's contents directly into the current directory (`ts-nft-marketplace-cu`) rather than creating a new sub-folder.

```bash
git clone https://github.com/Cyfrin/ts-nft-marketplace-cu .
```

After the command completes, you'll see the project files appear in your editor's file explorer.

It's crucial to ensure you're on the correct Git branch for the starter code. This repository defaults to the correct branch, but let's verify. Run:

```bash
git branch
```

You should see `* starting-code`, indicating you are on the correct branch.

## Understanding the Project Structure

Let's take a moment to familiarize ourselves with the key folders and files within the cloned project:

*   **`foundry` Folder (Backend - Smart Contracts):**
    *   This contains our Solidity smart contracts managed using the Foundry framework.
    *   **`src/`**: Holds the core contract code:
        *   `CakeNft.sol`: An ERC721 NFT contract for unique cake collectibles, using OpenZeppelin libraries (`ERC721`, `Ownable`, `Base64`).
        *   `MockUSDC.sol`: A simple ERC20 contract simulating USDC for payments.
        *   `MoodNft.sol`: Another ERC721 example, demonstrating dynamic, on-chain SVG NFTs using Base64 encoding.
        *   `NftMarketplace.sol`: The central marketplace contract handling listing, buying, canceling, updating listings, and withdrawing proceeds. It utilizes OpenZeppelin's `ReentrancyGuard` and `SafeERC20`.
    *   **`script/`**: Contains deployment and interaction scripts (we won't delve deep here as deployment is pre-configured).
    *   **`test/`**: Holds tests for the smart contracts.
    *   **Key `NftMarketplace.sol` Functions:**
        *   `listItem(address nftAddress, uint256 tokenId, uint256 price)`: List an NFT you own.
        *   `cancelListing(address nftAddress, uint256 tokenId)`: Remove your NFT listing.
        *   `buyItem(address nftAddress, uint256 tokenId)`: Purchase a listed NFT using the designated payment token (MockUSDC).
        *   `updateListing(address nftAddress, uint256 tokenId, uint256 newPrice)`: Change the price of your listed NFT.
        *   `withdrawProceeds()`: Collect funds from your sold NFTs.
        *   `getListing(address nftAddress, uint256 tokenId)`: Retrieve details (price, seller) for a *single* specified listing.
        *   `getProceeds(address seller)`: Check withdrawable balance for a seller.
        *   `getPaymentToken()`: Returns the address of the ERC20 token used for payments.
    *   **Identified Limitation:** Notice that while we can get details for *one specific* listing using `getListing`, there's no built-in function to efficiently retrieve *all currently active listings*. Trying to call `getListing` for every possible NFT is impractical for a frontend. This highlights a common challenge we'll address later.

*   **`public` Folder (Frontend Assets):**
    *   Contains static files served by the frontend, like images (`nft-marketplace.png`, `placeholder.png`).

*   **`src` Folder (Frontend - Next.js/React App):**
    *   The heart of our frontend application, built with Next.js (using the App Router), React, and TypeScript.
    *   **`app/`**: Defines page routes and layout structure following Next.js conventions.
    *   **`components/`**: Contains reusable React components like `Header.tsx`, `NFTBox.tsx` (displays individual NFTs), forms (`ListNftForm.tsx`), page-specific components (`CakeNft.tsx`), UI elements (`RecentlyListed.tsx`, `ui/InputField.tsx`).
    *   **`utils/`**: Holds utility functions, such as `formatPrice.ts` for displaying currency values.
    *   **`constants.ts`**: A critical file storing constant values. Most importantly, it maps deployed smart contract addresses to their corresponding chain ID. For our local development, it uses `31337` (Anvil's default). It also includes contract ABIs (like `erc20Abi`).
        ```typescript
        // Example structure within constants.ts
        export const chainsToContracts: ContractsConfig = {
          31337: { // Anvil's default chain ID
            usdc: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            nftMarketplace: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            cakeNft: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
            moodNft: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          },
        };
        export const erc20Abi = [ /* ... ABI content ... */ ];
        ```
    *   **`rainbowKitConfig.tsx`**: Configures RainbowKit for seamless wallet connections. It specifies the chain to connect to (local Anvil), the application name, and the required WalletConnect Project ID (fetched from environment variables).

*   **Configuration Files (Root Directory):**
    *   **`marketplace-anvil.json`**: This crucial file contains a state snapshot for the Anvil local blockchain. When we start Anvil using the `--load-state` flag with this file, it initializes the blockchain with pre-deployed contracts (at the addresses specified in `constants.ts`) and pre-funded accounts. This ensures a consistent and ready-to-use development environment every time.
    *   `package.json`: Standard NodeJS project file defining dependencies, scripts, and metadata.
    *   `pnpm-lock.yaml`: Lockfile generated by the `pnpm` package manager, ensuring consistent dependency installations.
    *   Other standard config files: `.gitignore`, `.gitmodules`, `.prettierrc`, `next.config.ts`, `postcss.config.mjs`, `README.md`, `tsconfig.json`.

## Running the Development Environment

With the code cloned and understood, let's get the application running.

1.  **Install Dependencies:** Open your terminal in the project root (`ts-nft-marketplace-cu`) and install the necessary packages using `pnpm` (the package manager used in this project).
    ```bash
    pnpm install
    ```

2.  **Run the Backend (Anvil Local Blockchain):** We need a local blockchain node. We'll use Anvil, part of the Foundry toolkit. The `package.json` includes a convenient script to start Anvil and load our pre-configured state. Open a *new, separate terminal window* or tab (also navigated to the project root) and run:
    ```bash
    pnpm run anvil
    ```
    This command executes `anvil --load-state marketplace-anvil.json --block-time 2`. Anvil will start, listening on `127.0.0.1:8545`. Thanks to `marketplace-anvil.json`, the smart contracts are already deployed, and accounts are funded (e.g., the first default Anvil account has ETH and MockUSDC). The `--block-time 2` argument simulates blocks being mined every 2 seconds. Keep this terminal running.

3.  **Run the Frontend (Next.js Dev Server):** In your original terminal window (or another new one), start the frontend development server. The `package.json` provides a script for this too:
    ```bash
    pnpm run dev
    ```
    This executes `next dev --turbo`, starting the Next.js development server, typically available at `http://localhost:3000`.

## Configuring Environment Variables

If you open `http://localhost:3000` in your browser now, you'll likely encounter an error related to WalletConnect: "Error: No projectID found...".

This happens because RainbowKit, our wallet connection library, requires a WalletConnect Cloud Project ID to function. This ID should be provided as an environment variable.

1.  **Create `.env.local`:** In the root of your project directory (`ts-nft-marketplace-cu`), create a new file named `.env.local`. This file is used for local environment variables and is typically excluded from Git commits (as specified in `.gitignore`).

2.  **Add Project ID:** Inside `.env.local`, add the following line, replacing the placeholder value with a valid WalletConnect Project ID. You can obtain one for free from the [WalletConnect Cloud website](https://cloud.walletconnect.com/). (The example uses a generic ID, ensure you get your own).
    ```
    # Inside .env.local
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=13c5e85b5dbc826a7731eb2c7bb8303b
    ```
    *Note: The `NEXT_PUBLIC_` prefix is essential for Next.js to expose this variable to the browser.*

3.  **Restart Frontend Server:** Stop the `dev` server in your terminal (usually `Ctrl+C`) and restart it:
    ```bash
    pnpm run dev
    ```

Now, refresh `http://localhost:3000` in your browser. The error should be gone, and you should see the NFT Marketplace interface load successfully.

## Initial Application Verification and Interaction

Let's perform a few basic actions to confirm everything is working together.

1.  **Connect Wallet:** Click the "Connect Wallet" button provided by RainbowKit. Choose MetaMask (ensure it's installed and set up). Connect one of your accounts. MetaMask should automatically detect and suggest connecting to the local Anvil network (Chain ID 31337). The sample Anvil state (`marketplace-anvil.json`) provides the first account (`0xf39...`) with 10000 ETH and 200 MockUSDC.

2.  **Import Tokens/NFTs (Optional but helpful):** To see your assets within MetaMask:
    *   **USDC:** Go to MetaMask -> Tokens -> Import Tokens. Paste the MockUSDC address from `src/constants.ts`. MetaMask should detect the symbol (USDC) and decimals. If you connected the first Anvil account, you'll see a balance of 200 USDC.
    *   **Cake NFT:** Go to MetaMask -> NFTs -> Import NFT. Paste the CakeNFT address from `src/constants.ts`. For the Token ID, you can initially enter `0` (though you might not own this specific one yet). *Note: MetaMask often struggles to display Base64 encoded, on-chain SVG NFTs like these, so you might see a placeholder image.*

3.  **Interact with the dApp:**
    *   Navigate to the "Cake NFT" page using the header link.
    *   Click the "Bake a Cake NFT" button. This initiates a transaction to call the `bakeCake` function on the `CakeNft.sol` contract. Confirm the transaction in MetaMask. The frontend should display a success message with the new Token ID (e.g., "Successfully minted! TokenID: 5").
    *   On the same page, use the "View an NFT" input. Enter the Token ID you just minted (e.g., `5`) and click "View". The frontend should render the SVG image of your unique cake NFT correctly.
    *   Navigate to the "List Your NFT" page.
    *   Fill out the form: Select "Cake NFT", enter the Token ID you just baked (e.g., `5`), and set a price (e.g., `100` USDC).
    *   Click "Preview Listing", then "Approve NFT". This triggers an ERC721 `approve` transaction, allowing the marketplace contract to transfer this specific NFT on your behalf. Confirm in MetaMask.
    *   Once approval is confirmed, click "List NFT for Sale". This triggers the `listItem` transaction on the `NftMarketplace.sol` contract. Confirm in MetaMask.
    *   You should see a success message like "Your NFT has been successfully listed on the marketplace!".

## The Challenge: Displaying Listed NFTs

You've successfully listed your Cake NFT! Now, navigate back to the homepage (`/`). Look at the "Recently Listed NFTs" section.

You'll notice that even though you successfully listed your NFT (Token ID 5), it *doesn't appear* here. The section remains empty or shows placeholder content.

Why? While the `listItem` transaction successfully updated the state *on the blockchain* (specifically, within the `NftMarketplace.sol` contract's storage), our frontend currently has no mechanism to *query* the blockchain or the contract to discover the list of *all* NFTs that are currently for sale. It only knows how to *initiate* transactions, not how to efficiently *read* aggregated data resulting from many transactions.

## Next Steps: Solving the Data Query Problem

How can we make the frontend display the NFTs that have been listed on the marketplace?

One *could* try to devise a complex frontend logic using direct contract calls (like repeatedly calling `getListing` for potential NFTs), perhaps combined with React hooks and state management. However, as noted earlier, querying individual items directly from the smart contract to build an aggregated list is highly inefficient and doesn't scale.

The standard and much more efficient solution to this common problem in web3 development is using an **indexer**. Indexers are services that listen to blockchain events, process them, and store the data in an easily queryable database, optimized for frontend consumption.

Before we dive into indexers in the next lesson, take a moment to think: based *only* on the tools we currently have (React, Next.js, Wagmi/Viem hooks for contract interaction like `readContract`), how *might* you attempt to fetch and display the list of recently listed NFTs? Consider the limitations we've discussed. This thought exercise will help appreciate why indexers are so valuable.
