## Building the ZK-Panagram Frontend: Integrating ZK Proofs with React

This lesson focuses on the frontend integration for our ZK-Panagram project. It's important to preface this by stating that the primary emphasis of this tutorial series is on Zero-Knowledge proofs, Solidity, and related backend logic. Frontend development, particularly with frameworks like React, is a distinct specialization. The frontend presented here was developed with significant assistance from AI tools like ChatGPT, particularly for component structure and styling.

Therefore, this walkthrough will not be an exhaustive line-by-line explanation of all frontend code. Instead, we will concentrate on the crucial integration points where the frontend interacts with our ZK circuits and smart contract. For a comprehensive understanding of frontend development using Vite and React, dedicated courses and resources are recommended. Our goal here is to demonstrate how these pieces connect in a ZK application.

The complete frontend code for the ZK-Panagram project is available in the `zk-panagram` GitHub repository.

### Navigating the Frontend Code

The core of our frontend application resides within the `src/` directory. Let's look at the key subdirectories and files involved:

*   `src/components/`: This directory houses our React components.
    *   `Input.tsx`: Manages user input for guesses and orchestrates the proof generation and submission process.
    *   `ConnectWallet.tsx`: Handles the logic for connecting a user's cryptocurrency wallet.
    *   `NFTGallery.tsx` and `NFTGalleryContainer.tsx`: Responsible for displaying the NFTs owned by the user.
    *   `Panagram.tsx`: Serves as the main component, assembling the various parts of the game interface, including the puzzle image, input fields, and NFT gallery.
    *   `PanagramImage.tsx`: Displays the circular letter puzzle, also known as the pangram wheel.
*   `src/utils/`: This directory contains utility functions.
    *   `generateProof.ts`: A critical script for generating ZK proofs directly in the user's browser. This will be discussed in detail.

### `generateProof.ts` Walkthrough

The `generateProof.ts` file is central to the ZK functionality on the client side. It leverages Noir.js to construct a ZK proof in the browser environment. The logic here is quite similar to scripts previously developed for generating proofs in a Node.js environment.

**Key Imports:**

```typescript
import { UltraHonkBackend } from "@aztec/bb.js"; // Backend for proof generation
import circuit from "../../circuits/target/panagram.json"; // Compiled circuit artifact
// @ts-ignore
import { Noir } from "@noir-lang/noir_js"; // Noir.js library
// @ts-ignore
import { CompiledCircuit } from "@noir-lang/types"; // Types for Noir
import { ANSWER_HASH } from "../constant.ts"; // Predefined answer hash
```

A crucial aspect here is the direct import of the compiled circuit:
`import circuit from "../../circuits/target/panagram.json";`
This relative path allows the browser to load the `panagram.json` file. The `@ts-ignore` comments for Noir.js imports suggest potential TypeScript definition nuances or a chosen way to manage these types. The `as CompiledCircuit` assertion helps provide type context.

**`generateProof` Function:**

```typescript
export async function generateProof(guess: string, address: string, showLog:(content: string) => void): Promise<{ proof: Uint8Array, publicInputs: string[]}> {
    try {
        const noir = new Noir(circuit as CompiledCircuit); // Initialize Noir with the compiled circuit
        const honk = new UltraHonkBackend(circuit.bytecode); // Initialize the backend
        const inputs = { guess: guess, address: address, expected_hash: ANSWER_HASH }; // Define inputs for the ZK circuit

        showLog("📜 Generating witness... ✨");
        const witness = await noir.execute(inputs); // Generate the witness
        showLog("✅ Generated witness... 📜");

        showLog("📜 Generating proof... ✨");
        const { proof, publicInputs } = await honk.generateProof(witness, {keccak: true}); // Generate the proof
        showLog("✅ Generated proof... 📜");

        // Off-chain proof verification (for logging/debugging)
        const offChainProof = await honk.generateProof(witness);
        showLog("📜 Verifying proof... ✨");
        const isValid = await honk.verifyProof(offChainProof);
        showLog(`✅ Proof is valid: ${isValid} 🎉`);

        // Note: A previous step to slice the proof (e.g., proof.slice(4)) is no longer needed with current bb.js versions.
        return { proof, publicInputs }; // Return the proof and public inputs
    } catch (error) {
        console.log(error);
        throw error;
    }
}
```

**Explanation:**

1.  **Inputs:** The function accepts the user's `guess` (as a prepared hash), their wallet `address`, and a `showLog` callback function. This callback is used to display progress messages to the user in the UI (e.g., "Generating witness...").
2.  **Initialization:**
    *   `new Noir(circuit as CompiledCircuit)`: An instance of `Noir` is created using the imported compiled circuit JSON.
    *   `new UltraHonkBackend(circuit.bytecode)`: The `UltraHonkBackend` (from `bb.js`) is initialized with the circuit's bytecode. This backend is responsible for the proving and verification algorithms.
3.  **Circuit Inputs:** The `inputs` object is structured to match the inputs expected by our `panagram.nr` ZK circuit. `ANSWER_HASH` is a constant representing the Keccak hash of the secret word for the current game round.
4.  **Witness Generation:** `await noir.execute(inputs)` computes the witness based on the provided inputs and the circuit logic.
5.  **Proof Generation:** `await honk.generateProof(witness, {keccak: true})` generates the actual ZK proof. The option `{keccak: true}` is important here, likely for compatibility with how hashes are handled or expected by the verifier smart contract.
6.  **Off-Chain Verification (Debugging):** An additional proof (`offChainProof`) is generated and immediately verified using `await honk.verifyProof(offChainProof)`. This step occurs entirely in the browser and serves as a sanity check or debugging measure to confirm the proof's validity before it's sent to the blockchain.
7.  **Return Value:** The function returns an object containing the `proof` (as a `Uint8Array`) and the `publicInputs` derived during proof generation. It's noted that a previous requirement to slice the first 4 bytes from the proof buffer is no longer necessary with updates to `bb.js`.

### `Input.tsx` - `handleSubmit` Function Walkthrough

The `Input.tsx` component is responsible for capturing the user's guess and handling the submission. The core logic for this process is encapsulated within its `handleSubmit` asynchronous function.

```typescript
// (Inside the Input component)
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogs([]); // Clear previous logs from the UI
    setResults(""); // Clear previous result messages

    try {
        // Retrieve the guess string from the input field
        const guessInput = (document.getElementById("guess") as HTMLInputElement).value;

        // Step 1: Hash the raw guess string using Keccak256
        const guessHex = keccak256(toUtf8Bytes(guessInput)); // (ethers.js utilities)

        // Step 2: Reduce the hash modulo the field modulus
        // FIELD_MODULUS is the prime defining the finite field used by the Noir circuit
        const reducedGuess = BigInt(guessHex) % FIELD_MODULUS;

        // Step 3: Convert the field element back to a 32-byte hex string
        const guessHash = "0x" + reducedGuess.toString(16).padStart(64, "0");

        // Step 4: Generate the ZK proof using the processed hash
        // 'address' is obtained from a Wagmi hook, e.g., useAccount()
        const { proof } = await generateProof(guessHash, address, showLog);

        // Send the transaction to the smart contract
        await writeContract({ // Wagmi hook for contract interaction
            address: PANAGRAM_CONTRACT_ADDRESS, // Address of the deployed Panagram contract
            abi: abi, // ABI of the Panagram contract
            functionName: "makeGuess",
            args: [hexToUint8Array(proof)], // Pass the proof as bytes
        });
        // Further UI updates based on transaction status (e.g., "Transaction pending...")
        // are handled using Wagmi's useWaitForTransactionReceipt hook.
    } catch (error: unknown) {
        console.error(error);
        // Update UI to show error message
    }
};

// Other parts of the component include useEffect hooks to manage states from
// Wagmi's useWriteContract and useWaitForTransactionReceipt.
// These hooks allow displaying messages like "Transaction is processing...",
// "Oh no! Something went wrong.", or "You got it right!"
```

**Explanation:**

1.  **Prevent Default & Clear State:** `e.preventDefault()` stops the default form submission behavior. `setLogs([])` and `setResults("")` clear any previous messages from the UI.
2.  **Get User Input:** The raw `guessInput` string is retrieved from the HTML input element with the ID "guess".
3.  **Step 1: Hash the Guess:** The `guessInput` string is first converted to UTF-8 bytes using `toUtf8Bytes` (likely from a library like `ethers.js`) and then hashed using `keccak256`.
4.  **Step 2: Field Modulus Operation:** The resulting hexadecimal hash (`guessHex`) is converted to a `BigInt`. This big integer is then reduced modulo `FIELD_MODULUS`. This step is critical because ZK circuits operate over specific finite fields, and inputs must conform to this field arithmetic. `FIELD_MODULUS` would be the prime order of the field used in the Noir circuit.
5.  **Step 3: Format Hash for Circuit:** The `reducedGuess` (which is now a field element) is converted back into a hexadecimal string. It's prefixed with `0x` and padded with leading zeros to ensure it's 64 characters long (representing 32 bytes). This `guessHash` is the format expected by the `generateProof` function.
6.  **Step 4: Generate Proof:** The `generateProof` utility function (discussed earlier) is called. It takes the processed `guessHash`, the connected user's `address` (obtained from a Wagmi hook like `useAccount()`), and the `showLog` callback function.
7.  **Send Transaction:** The `writeContract` function (provided by the Wagmi library) is used to initiate a blockchain transaction.
    *   `address`: Specifies the `PANAGRAM_CONTRACT_ADDRESS` where our Panagram smart contract is deployed.
    *   `abi`: Provides the Application Binary Interface (ABI) of the Panagram contract, which describes its functions and structures.
    *   `functionName`: Set to `"makeGuess"`, the smart contract function we intend to call.
    *   `args`: An array containing the arguments for the `makeGuess` function. In this case, it's the `proof` generated by `generateProof`. The `hexToUint8Array(proof)` suggests a utility function might be used to ensure the proof is in the correct byte format expected by the contract, which typically takes `bytes memory proof`.

The component also utilizes Wagmi hooks such as `useWriteContract` (which provides the `writeContract` function) and `useWaitForTransactionReceipt` in conjunction with React's `useEffect` hook. These are used to monitor the transaction's lifecycle and update the UI with relevant messages like "Transaction is processing...", success confirmations ("You got it right!"), or error notifications.

### Other Frontend Components and AI Usage

Several other React components contribute to the ZK-Panagram application's user interface:

*   **`ConnectWallet.tsx`:** This component leverages Wagmi's `useAccount` hook to determine if a user's wallet is connected. If connected, it typically displays account information; otherwise, it presents wallet connection options.
    ```typescript
    // Simplified logic within ConnectWallet.tsx
    const { isConnected } = useAccount();
    if (isConnected) {
        return <Account />; // Component to display account details
    }
    return <WalletOptions />; // Component to show wallet connection buttons
    ```
*   **`NFTGallery.tsx` and `NFTGalleryContainer.tsx`:** These components are responsible for fetching and displaying the NFTs that a user earns by successfully solving panagrams. Their structure and implementation were significantly guided by querying ChatGPT for displaying NFT collections.
*   **`PanagramImage.tsx`:** This component renders the visual representation of the panagram puzzle (the circular arrangement of letters). Its creation was also assisted by AI, focusing on achieving the desired visual layout.
*   **`Panagram.tsx`:** This component acts as the main orchestrator for the game's UI. It brings together the `PanagramImage`, the `Input` component (for guesses), and the `NFTGallery` into a cohesive user experience.

It's reiterated that for many of these UI-centric components, AI tools like ChatGPT were instrumental in generating the foundational code and achieving specific visual or functional requirements, given the primary focus of this series is not on in-depth frontend development.

### Summary of Frontend Walkthrough

The objective of this frontend walkthrough was not to provide an exhaustive tutorial on React or Vite, but rather to illuminate how a web frontend can interact with a Zero-Knowledge backend system. Key highlights include:

*   The transparent acknowledgment of leveraging AI for frontend development, allowing a focus on ZK-specific integrations.
*   The detailed examination of `generateProof.ts`, which demonstrates client-side ZK proof generation using Noir.js and `bb.js`, mirroring the process one might use in a backend Node.js environment.
*   The step-by-step breakdown of the `handleSubmit` function in `Input.tsx`, showcasing input processing (hashing, field modulus reduction), proof generation, and smart contract interaction via Wagmi.
*   A brief overview of the Vite/React application's structure and the roles of other supporting UI components.

While this frontend is functional and serves the ZK-Panagram demo effectively, individuals aiming for proficiency in modern frontend development should consult dedicated learning resources. The core emphasis of this broader tutorial remains firmly on the principles and practices of Zero-Knowledge proof systems.