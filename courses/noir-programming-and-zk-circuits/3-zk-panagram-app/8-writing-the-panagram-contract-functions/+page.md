Welcome to this lesson on developing the core functionalities for the "Panagram" smart contract in Solidity. The Panagram contract is designed as an engaging on-chain game where users submit proofs to solve a puzzle each round, with NFT rewards for winners and participants. This contract leverages the `ERC1155` standard for Non-Fungible Tokens and `Ownable` for robust access control.

## Panagram Smart Contract: Core Concepts and State Variables

The Panagram game operates through a series of rounds, each with unique challenges and rewards. To manage the game's state and logic, several key state variables are defined within the contract:

1.  **Rounds:** The game's progression is structured in distinct rounds. Each round features a specific, hashed answer and has a defined duration or conditions for conclusion.
2.  **`s_answer` (Hashed Answer):**
    *   Type: `bytes32 public`
    *   Purpose: Stores the Keccak256 hash of the correct answer for the current round. This is crucial for verifying guesses without revealing the answer itself. It's set when a new round is initiated.
3.  **`MIN_DURATION` (Minimum Round Duration):**
    *   Type: `uint256 public constant`
    *   Value: `10800` (equivalent to 3 hours).
    *   Purpose: This constant defines the minimum time that must elapse after a round starts before a new round can be initiated, provided the current round has a winner.
4.  **`s_roundStartTime` (Round Start Time):**
    *   Type: `uint256 public`
    *   Purpose: Records the `block.timestamp` when the current game round began. It's initialized to `0` and updated each time a new round commences.
5.  **`s_currentRoundWinner` (Current Round Winner):**
    *   Type: `address public`
    *   Purpose: Stores the Ethereum address of the first user who successfully submits a correct guess in the current round. It's initialized to the zero address (`address(0)`) and reset at the start of each new round.
6.  **`s_currentRound` (Current Round Counter):**
    *   Type: `uint256 public`
    *   Purpose: Acts as an incrementing counter for the game rounds. It starts at `0` and increases with each successfully started new round.
7.  **`s_verifier` (Verifier Contract Address):**
    *   Type: `IVerifier public`
    *   Purpose: Holds the address of the external verifier contract. This contract is responsible for validating the Zero-Knowledge (ZK) proofs submitted by users. It's set during contract deployment (in the constructor) and can be updated by the contract owner via a dedicated `setVerifier` function. This was revised from an `immutable` variable to allow for future updates.
8.  **`s_lastCorrectGuessRound` (Last Correct Guess Per User):**
    *   Type: `mapping(address => uint256) public`
    *   Purpose: This mapping tracks the round number in which each user last submitted a correct guess. It's essential for preventing users from claiming rewards multiple times within the same round.

## Tracking Game Progress: Events

To provide transparency and allow off-chain applications to monitor game activity, the Panagram contract emits several events:

*   **`Panagram_NewRoundStarted(bytes32 answer)`:** Emitted whenever a new round begins. It includes the hashed answer for the newly started round.
*   **`Panagram_WinnerCrowned(address indexed winner, uint256 round)`:** Emitted when the first user successfully guesses the answer in a round, declaring them the winner. The winner's address and the round number are indexed for easier searching.
*   **`Panagram_RunnerUpCrowned(address indexed runnerUp, uint256 round)`:** Emitted when subsequent users (after the first winner) also correctly guess the answer in the same round. Their address and the round number are indexed.

## Enhancing User Experience: Custom Errors

For better gas efficiency and more descriptive revert messages, the contract defines custom errors:

*   **`Panagram_MinTimeNotPassed(uint256 minDuration, uint256 timePassed)`:** Reverted if an attempt is made to start a new round before `MIN_DURATION` has elapsed since the current round's start.
*   **`Panagram_NoRoundWinner()`:** Reverted if an attempt is made to start a new round, but the previous round does not yet have a declared winner.
*   **`Panagram_FirstPanagramNotSet()`:** Reverted by the `makeGuess` function if no game round has been initialized yet (i.e., `s_currentRound` is `0`).
*   **`Panagram_AlreadyGuessedCorrectly(uint256 round, address user)`:** Reverted if a user attempts to submit another guess in a round where they have already made a correct guess.
*   **`Panagram_InvalidProof()`:** Reverted if the ZK proof submitted by a user fails verification by the `s_verifier` contract.

## Function Deep Dive: `newRound(bytes32 _answer)`

This function is central to managing the game's progression by initiating new rounds.

*   **Purpose:** To initialize a new round of the Panagram game with a new hashed answer.
*   **Access Modifier:** `external onlyOwner` - Only the contract owner can call this function.

**Logic Breakdown:**

1.  **First Round Initialization:**
    *   If `s_roundStartTime` is `0` (this condition signifies either the very first round of the game or a state after a contract reset), the function sets:
        *   `s_roundStartTime = block.timestamp;`
        *   `s_answer = _answer;` (the hashed answer for this first round).
2.  **Subsequent Round Initialization:**
    *   If it's not the first round (`s_roundStartTime != 0`):
        *   **Minimum Duration Check:** It first verifies that enough time has passed since the current round started:
            `if (block.timestamp < s_roundStartTime + MIN_DURATION) { revert Panagram_MinTimeNotPassed(MIN_DURATION, block.timestamp - s_roundStartTime); }`
        *   **Previous Winner Check:** It then ensures that the current round has a winner before a new one can begin:
            `if (s_currentRoundWinner == address(0)) { revert Panagram_NoRoundWinner(); }`
        *   **Resetting for New Round:** If both checks pass, the contract state is reset for the new round:
            *   `s_roundStartTime = block.timestamp;`
            *   `s_currentRoundWinner = address(0);` (clears the winner from the previous round)
            *   `s_answer = _answer;` (sets the new hashed answer)
3.  **Common Logic for All New Rounds:**
    *   Regardless of whether it's the first or a subsequent round, after the initial setup or checks, the function:
        *   Increments the round counter: `s_currentRound++;`
        *   Emits an event to signal the new round: `emit Panagram_NewRoundStarted(_answer);`

```solidity
// State variables related to newRound
uint256 public constant MIN_DURATION = 10800; // 3 hours
uint256 public s_roundStartTime;
address public s_currentRoundWinner;
bytes32 public s_answer;
uint256 public s_currentRound;

// Event
event Panagram_NewRoundStarted(bytes32 answer);

// Errors
error Panagram_MinTimeNotPassed(uint256 minDuration, uint256 timePassed);
error Panagram_NoRoundWinner();

function newRound(bytes32 _answer) external onlyOwner {
    if (s_roundStartTime == 0) { // First round
        s_roundStartTime = block.timestamp;
        s_answer = _answer;
    } else { // Subsequent rounds
        if (block.timestamp < s_roundStartTime + MIN_DURATION) {
            revert Panagram_MinTimeNotPassed(MIN_DURATION, block.timestamp - s_roundStartTime);
        }
        if (s_currentRoundWinner == address(0)) { // Previous round must have a winner to start a new one.
            revert Panagram_NoRoundWinner();
        }
        // Reset for the new round
        s_roundStartTime = block.timestamp;
        s_currentRoundWinner = address(0);
        s_answer = _answer;
    }
    s_currentRound++;
    emit Panagram_NewRoundStarted(_answer);
}
```

## Function Deep Dive: `makeGuess(bytes memory _proof)`

This function allows users to participate in the game by submitting their solution proof.

*   **Purpose:** Enables a user to submit a ZK proof for their guess to the current round's puzzle.
*   **Access Modifier:** `external` - Any user can call this function.
*   **Returns:** `bool` - Indicates `true` if the proof was valid (and thus the guess was correct). The function reverts on invalid proof or other failed checks.

**Logic Breakdown:**

1.  **Round Initialization Check:**
    *   Ensures that at least one round has been started:
        `if (s_currentRound == 0) { revert Panagram_FirstPanagramNotSet(); }`
2.  **Prevent Multiple Correct Guesses:**
    *   Checks if the caller (`msg.sender`) has already submitted a correct guess in the current round:
        `if (s_lastCorrectGuessRound[msg.sender] == s_currentRound) { revert Panagram_AlreadyGuessedCorrectly(s_currentRound, msg.sender); }`
3.  **Prepare Public Inputs for Verification:**
    *   The ZK proof verifier (Noir circuit in this case) expects public inputs. For Panagram, this is the hashed answer of the current round.
        *   `bytes32[] memory publicInputs = new bytes32[](1);`
        *   `publicInputs[0] = s_answer;`
4.  **Verify the Proof:**
    *   Calls the `verify` function on the `s_verifier` contract, passing the user's `_proof` and the `publicInputs`:
        `bool proofResult = s_verifier.verify(_proof, publicInputs);`
5.  **Handle Invalid Proof:**
    *   If `proofResult` is `false`, the proof is invalid, and the transaction reverts:
        `if (!proofResult) { revert Panagram_InvalidProof(); }`
6.  **Handle Valid Proof (Correct Guess):**
    *   If the proof is valid, the user's guess is correct.
    *   Update tracking for the user: `s_lastCorrectGuessRound[msg.sender] = s_currentRound;`
    *   **Determine Winner or Runner-Up:**
        *   If `s_currentRoundWinner` is `address(0)` (no winner yet for this round):
            *   The caller is the first winner: `s_currentRoundWinner = msg.sender;`
            *   Mint Winner's NFT (ID 0): `_mint(msg.sender, 0, 1, "");` (Amount is 1, data is empty).
            *   Emit winner event: `emit Panagram_WinnerCrowned(msg.sender, s_currentRound);`
        *   Else (there's already a winner, so this user is a runner-up):
            *   Mint Participant's/Runner-Up NFT (ID 1): `_mint(msg.sender, 1, 1, "");`
            *   Emit runner-up event: `emit Panagram_RunnerUpCrowned(msg.sender, s_currentRound);`
7.  **Return Success:**
    *   If all checks pass and the proof is valid, the function returns `true`.
        `return true;`

```solidity
// State variable related to makeGuess
IVerifier public s_verifier; // Address of the verifier contract
mapping(address => uint256) public s_lastCorrectGuessRound;

// Events related to makeGuess
event Panagram_WinnerCrowned(address indexed winner, uint256 round);
event Panagram_RunnerUpCrowned(address indexed runnerUp, uint256 round);

// Errors related to makeGuess
error Panagram_FirstPanagramNotSet();
error Panagram_AlreadyGuessedCorrectly(uint256 round, address user);
error Panagram_InvalidProof();

function makeGuess(bytes memory _proof) external returns (bool) {
    if (s_currentRound == 0) {
        revert Panagram_FirstPanagramNotSet();
    }

    if (s_lastCorrectGuessRound[msg.sender] == s_currentRound) {
        revert Panagram_AlreadyGuessedCorrectly(s_currentRound, msg.sender);
    }

    bytes32[] memory publicInputs = new bytes32[](1);
    publicInputs[0] = s_answer;

    bool proofResult = s_verifier.verify(_proof, publicInputs);

    if (!proofResult) {
        revert Panagram_InvalidProof();
    }

    // If proof is valid, the guess is correct
    s_lastCorrectGuessRound[msg.sender] = s_currentRound;

    if (s_currentRoundWinner == address(0)) { // First correct guess for this round
        s_currentRoundWinner = msg.sender;
        _mint(msg.sender, 0, 1, ""); // Mint NFT ID 0 (Winner NFT)
        emit Panagram_WinnerCrowned(msg.sender, s_currentRound);
    } else { // Subsequent correct guess (runner-up)
        _mint(msg.sender, 1, 1, ""); // Mint NFT ID 1 (Participant NFT)
        emit Panagram_RunnerUpCrowned(msg.sender, s_currentRound);
    }

    return true;
}
```

## Important Considerations and Refinements

During the development and review of these core functions, several key points and corrections were noted:

*   **Verifier State Variable:** The `verifier` address, initially conceived as `immutable`, was changed to a standard public state variable `s_verifier`. This allows the contract owner to update the verifier contract address post-deployment using a `setVerifier` function, offering greater flexibility.
*   **ERC1155 `_mint` Function:** The `_mint` function from the `ERC1155` standard requires a `bytes memory data` parameter. In this Panagram contract, this parameter is not actively used for the NFTs being minted, so an empty string `""` is passed.
*   **Noir Circuit Public Input:** It was confirmed that the public input required by the Noir ZK circuit for proof verification is solely the `answer_hash` (our `s_answer`).
*   **Custom Errors vs. Require Strings:** Emphasis was placed on using custom errors (e.g., `Panagram_InvalidProof()`) instead of string-based messages in `require` statements (e.g., `require(proofResult, "Invalid proof")`). Custom errors are more gas-efficient and provide better structured error handling.

## What's Next? Testing and Proof Generation

With the core game logic for round management and guess submission in place, the next crucial phase involves writing comprehensive tests for these smart contract functions. This testing process will necessitate the generation of valid ZK proofs, which will be accomplished using a JavaScript-based scripting environment. This script will interact with libraries such as Nargo.js (for Noir circuit compilation and proof generation) and Barretenberg.js (for the underlying cryptographic primitives).

This lesson has detailed the design and implementation of the Panagram game's foundational functions, covering round mechanics, guess verification through ZK proofs, and NFT reward distribution.